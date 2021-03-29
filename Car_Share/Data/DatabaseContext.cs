using Microsoft.EntityFrameworkCore;
//using CarShare.Models;
namespace CarShare.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        { }

        // Standard Model Tables -- Uncomment once model is implemented
        //public DbSet<Customer> Customer { get; set; }
        //public DbSet<Account> Account { get; set; }
        //public DbSet<Car> Car { get; set; }
    }
}
