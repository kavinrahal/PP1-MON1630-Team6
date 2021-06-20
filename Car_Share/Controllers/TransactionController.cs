using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using CarShare.Models;
using CarShare.Services;
using CarShare.Attributes;

namespace CarShare.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    [ApiKey]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService transactionService;
        public TransactionController(TransactionService transactionService)
        {
            this.transactionService = transactionService;
        }
        // GET api/transaction
        [HttpGet]
        public IEnumerable<Transaction> GetAll()
        {
            return transactionService.GetAll();
        }
        // GET api/transaction/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(transactionService.Get(id));
        }
        // POST api/transaction
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Transaction transaction)
        {
            return CreatedAtAction("Get", new { id = transaction.TransactionID }, transactionService.Add(transaction));
        }
        // PUT api/transaction/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Transaction transaction)
        {
            transactionService.Update(id, transaction);
            return NoContent();
        }
        // DELETE api/transaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            transactionService.Delete(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
