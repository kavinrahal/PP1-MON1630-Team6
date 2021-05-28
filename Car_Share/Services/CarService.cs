using System.Collections.Generic;
using System.Linq;
using CarShare.Data;
using Microsoft.Extensions.Logging;
using CarShare.Models;

namespace CarShare.Services
{
    public class CarService : IRepository<Car, int>
    {
        private readonly DatabaseContext _context;

        public CarService(DatabaseContext context)
        {
            _context = context;
        }

        public Car Get(int id)
        {
            return _context.Car.Find(id);
        }

        public IEnumerable<Car> GetAll()
        {
            return _context.Car.ToList();
        }

        public int Add(Car car)
        {
            _context.Car.Add(car);
            _context.SaveChanges();

            return car.CarID;
        }

        public int Delete(int id)
        {
            _context.Car.Remove(_context.Car.Find(id));
            _context.SaveChanges();

            return id;
        }

        public int Update(int id, Car car)
        {
            _context.Car.Update(car);
            _context.SaveChanges();

            return id;
        }
    }
}
