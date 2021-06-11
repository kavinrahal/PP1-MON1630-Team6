using System.Collections.Generic;
using System.Linq;
using CarShare.Data;
using Microsoft.Extensions.Logging;
using CarShare.Models;

namespace CarShare.Services
{
    public class LocationService : IRepository<Location, int>
    {
        private readonly DatabaseContext _context;

        public LocationService(DatabaseContext context)
        {
            _context = context;
        }

        public Location Get(int id)
        {
            return _context.Location.Find(id);
        }

        public IEnumerable<Location> GetAll()
        {
            return _context.Location.ToList();
        }

        public int Add(Location location)
        {
            _context.Location.Add(location);
            _context.SaveChanges();

            return location.CarID;
        }

        public int Delete(int id)
        {
            _context.Location.Remove(_context.Location.Find(id));
            _context.SaveChanges();

            return id;
        }

        public int Update(int id, Location location)
        {
            _context.Location.Update(location);
            _context.SaveChanges();

            return id;
        }
    }
}
