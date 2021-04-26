using CarShare.Controllers.Identity.Data;
//using CarShare.Areas.Identity.Pages.Account;
using CarShare.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(CarShare.Areas.Identity.IdentityHostingStartup))]
namespace CarShare.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {

                services.AddIdentity<User, Role>(options =>
                {
                    options.SignIn.RequireConfirmedAccount = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 5;
                })
                    .AddEntityFrameworkStores<DatabaseContext>()
                    .AddErrorDescriber<AccountErrorDescriber>();

                services.ConfigureApplicationCookie(options =>
                {
                    options.LoginPath = "/Login";
                });
            });
        }
    }
    public class AccountErrorDescriber : IdentityErrorDescriber
    {
        public override IdentityError DuplicateUserName(string userName)
        {
            var error = base.DuplicateUserName(userName);
            error.Description = "LoginID already exists. Please choose a different number.";
            return error;
        }
    }
}