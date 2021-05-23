using System.Collections.Generic;
using System.Linq;
using CarShare.Data;
using Microsoft.Extensions.Logging;
using CarShare.Models;

namespace CarShare.Services
{
    public class BookingService : IRepository<Booking, int>
    {
        private readonly DatabaseContext _context;

        public BookingService(DatabaseContext context)
        {
            _context = context;
        }

        public Booking Get(int id)
        {
            return _context.Booking.Find(id);
        }

        public IEnumerable<Booking> GetAll()
        {
            return _context.Booking.ToList();
        }

        public int Add(Booking car)
        {
            _context.Booking.Add(car);
            _context.SaveChanges();

            return car.BookingID;
        }

        public int Delete(int id)
        {
            _context.Booking.Remove(_context.Booking.Find(id));
            _context.SaveChanges();

            return id;
        }

        public int Update(int id, Booking car)
        {
            _context.Booking.Update(car);
            _context.SaveChanges();

            return id;
        }
    }
}
