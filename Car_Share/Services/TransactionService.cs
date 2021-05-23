using System.Collections.Generic;
using System.Linq;
using CarShare.Data;
using Microsoft.Extensions.Logging;
using CarShare.Models;

namespace CarShare.Services
{
    public class TransactionService : IRepository<Transaction, int>
    {
        private readonly DatabaseContext _context;

        public TransactionService(DatabaseContext context)
        {
            _context = context;
        }

        public Transaction Get(int id)
        {
            return _context.Transaction.Find(id);
        }

        public IEnumerable<Transaction> GetAll()
        {
            return _context.Transaction.ToList();
        }

        public int Add(Transaction transaction)
        {
            _context.Transaction.Add(transaction);
            _context.SaveChanges();

            return transaction.TransactionID;
        }

        public int Delete(int id)
        {
            _context.Transaction.Remove(_context.Transaction.Find(id));
            _context.SaveChanges();

            return id;
        }

        public int Update(int id, Transaction transaction)
        {
            _context.Transaction.Update(transaction);
            _context.SaveChanges();

            return id;
        }
    }
}
