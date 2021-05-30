using CarShare.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CarShare.Models;
namespace CarShare.Data
{
    public class DatabaseContext : DbContext
    {
        // Unused
        private readonly DbContextOptions _options;
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            _options = options;
        }
        // Build DB context for each model
        public DbSet<Login> Login { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Car> Car { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        public DbSet<Booking> Booking { get; set; }

        // Add in relationship rules
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Setup the Transaction/Customer relationship complexity
            builder.Entity<Transaction>()
                .HasOne(x => x.Customer).WithMany(x => x.Transactions).HasForeignKey(x => x.CustomerID);
            // Money datatype has no built-in minimum attribute
            builder.Entity<Transaction>()
                .HasCheckConstraint("CH_Transaction_Amount", "Amount > 0");
        }
    }
}
