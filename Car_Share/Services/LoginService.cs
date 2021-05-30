using System.Collections.Generic;
using System.Linq;
using CarShare.Data;
using Microsoft.Extensions.Logging;
using CarShare.Models;

namespace CarShare.Services
{
    public class LoginService : IRepository<Login, string>
    {
        private readonly DatabaseContext _context;

        public LoginService(DatabaseContext context)
        {
            _context = context;
        }

        public Login Get(string username)
        {
            return _context.Login.Find(username);
        }

        public IEnumerable<Login> GetAll()
        {
            return _context.Login.ToList();
        }

        public string Add(Login user)
        {
            _context.Login.Add(user);
            _context.SaveChanges();

            return user.Email;
        }

        public string Delete(string username)
        {
            _context.Login.Remove(_context.Login.Find(username));
            _context.SaveChanges();

            return username;
        }

        public string Update(string username, Login user)
        {
            _context.Login.Update(user);
            _context.SaveChanges();

            return username;
        }
    }
}
