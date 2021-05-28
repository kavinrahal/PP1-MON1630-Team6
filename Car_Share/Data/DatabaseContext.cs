using CarShare.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CarShare.Models;
namespace CarShare.Data
{
    public class DatabaseContext : IdentityDbContext<User, Role, string>
    {
        private readonly DbContextOptions _options;
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            _options = options;
        }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Car> Car { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        public DbSet<Booking> Booking { get; set; }


        // Identity (Login) Tables        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Customising IdentityUser Properties
            // This will leave Id, UserName (+NormalizedName), Email (+NormalizedEmail)
            builder.Entity<User>()
                .Ignore(c => c.AccessFailedCount)
                .Ignore(c => c.TwoFactorEnabled)
                .Ignore(c => c.EmailConfirmed)
                .Ignore(c => c.PhoneNumber)
                .Ignore(c => c.PhoneNumberConfirmed);

            // Setup the Transaction/Account/DestinationAccount relationship complexity
            builder.Entity<Transaction>()
                .HasOne(x => x.Customer).WithMany(x => x.Transactions).HasForeignKey(x => x.CustomerID);

            // Money datatype has no built-in minimum attribute
            builder.Entity<Transaction>()
                .HasCheckConstraint("CH_Transaction_Amount", "Amount > 0");
        }
    }
}
