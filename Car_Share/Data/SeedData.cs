﻿using CarShare.Models;
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

            var customerService = serviceProvider.GetRequiredService<CustomerService>();
            var carService = serviceProvider.GetRequiredService<CarService>();
            var bookingService = serviceProvider.GetRequiredService<BookingService>();
            var transactionService = serviceProvider.GetRequiredService<TransactionService>();

            // Look for any logins (just as a litmus for a seeded database). If none, proceed
            if (!customerService.GetAll().Any())
            {
                // -----Customers + Login-----
                var customer1 = customerService.Add(
                    new Customer()
                    {
                        CustomerName = "Johnny Testo",
                        Email = "jtest123@mail.com",
                        Address = "123 Fake St",
                        City = "Springfield",
                        State = "VIC",
                        PostCode = "3000",
                        Phone = "+61 0123 4567",
                        Password = "abc123"
                    });
                var customer2 = customerService.Add(
                    new Customer()
                    {
                        CustomerName = "Jack Smith",
                        Email = "jsmith@mail.com",
                        Address = "4 Small Rd",
                        City = "Maryborough",
                        State = "VIC",
                        PostCode = "3300",
                        Phone = "+61 0000 4568",
                        Password = "abc123"
                    });
                var customer3 = customerService.Add(
                    new Customer()
                    {
                        CustomerName = "Mary Rutherford",
                        Email = "mrutherford@mail.com",
                        Address = "20 Creek Lane",
                        City = "Epping",
                        State = "VIC",
                        PostCode = "3214",
                        Phone = "+61 0000 7001",
                        Password = "abc123"
                    });

                // -----Cars-----
                var car1 = carService.Add(
                    new Car()
                    {
                        BodyType = "Sedan",
                        Rego = "ABC123",
                        Make = "Ford",
                        Model = "Falcon",
                        Colour = "Dark Blue",
                        Location = new Location(-37.806753727670696, 144.96647411498648)
                    });
                var car2 = carService.Add(
                    new Car()
                    {
                        BodyType = "SUV",
                        Rego = "DYT243",
                        Make = "Mazda",
                        Model = "CX-9",
                        Colour = "Red",
                        Location = new Location(-37.806232410726125,144.9640279403357)
                    });
                var car3 = carService.Add(
                    new Car()
                    {
                        BodyType = "Utility Vehicle",
                        Rego = "EFG602",
                        Make = "Toyota",
                        Model = "Hilux",
                        Colour = "White",
                        Location = new Location(-37.807631057639924, 144.96642315300124)
                    });
                var car4 = carService.Add(
                    new Car()
                    {
                        BodyType = "Van",
                        Rego = "GEH906",
                        Make = "Renault",
                        Model = "Master",
                        Colour = "Black",
                        Location = new Location(-37.80811633954623, 144.9680190673663)
                    });
                var car5 = carService.Add(
                    new Car()
                    {
                        BodyType = "Coupe",
                        Rego = "ZMF829",
                        Make = "Toyota",
                        Model = "Corolla",
                        Colour = "White",
                        Location = new Location(-37.80811633954623, 144.9680190673663)
                    });

                // -----Bookings + transactions (payments for booking)-----

                // Customer 1 + Car 1
                bookingService.Add(
                    new Booking()
                    {
                        CustomerID = customer1,
                        CarID = car1,
                        Amount = 100,
                        StartTime = new DateTime(2021,05,27,0,0,0),
                        EndTime = new DateTime(2021,05,27,12,0,0),
                        Active = false
                    });
                
                transactionService.Add(new Transaction(customer1, 100, "Rental Payment"));
            }
        }
    }
}
