using CarShare.Controllers.Identity.Data;
using CarShare.Models;
using CarShare.Services;
using System.Linq;
using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
namespace CarShare.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            // Can't inject parameterised dependencies if EFCore doesn't handle the calling of a method
            // (this method is called manually from Main()), so manually summoning them
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();

            var customerService = serviceProvider.GetRequiredService<CustomerService>();
                

            // Look for any users (just as a litmus for a seeded database). If none, proceed
            if (!userManager.Users.Any())
            {
                // Create Roles
                roleManager.CreateAsync(new Role("Admin")).Wait();
                roleManager.CreateAsync(new Role("Customer")).Wait();

                // ---------------CUSTOMER WITH ACCOUNTS WITH TRANSACTIONS---------------

                var customerID = customerService.Add(
                    new Customer()
                    {
                        CustomerName = "Johnny Testo",
                        Address = "123 Fake St",
                        City = "Springfield",
                        State = "VIC",
                        PostCode = "3000",
                        Phone = "+61 0123 4567"
                    });

                // Create User object for said Customer
                User testCustomer = new User()
                {
                    CustomerID = customerID,
                    LoginID = "12345678",
                    UserName = "12345678",
                    Email = "test@test.com",
                    ModifyDate = DateTime.UtcNow
                };

                var custResult = userManager.CreateAsync(testCustomer, "abc123").GetAwaiter().GetResult();
                // Assign new Customer to "Customer" Role
                if (custResult.Succeeded)
                    userManager.AddToRoleAsync(testCustomer, "Customer").Wait();


                // Create Transactions for each
                //transactionRepository.Add(new Transaction(savingsId, 800, "Initial"));

                // ----------------------------------------------------------------------

                //Create test Admin (no Customer object required, just a User)
                User testAdmin = new User()
                {
                    LoginID = "admin",
                    UserName = "admin",
                    Email = "admin@test.com",
                    ModifyDate = DateTime.UtcNow
                };

                var adminResult = userManager.CreateAsync(testAdmin, "admin").GetAwaiter().GetResult();
                // Assign new Admin to "Admin" Role
                if (adminResult.Succeeded)
                    userManager.AddToRoleAsync(testAdmin, "Admin").Wait();
            }
        }
    }
}
