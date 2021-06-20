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
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService customerService;
        public CustomerController(CustomerService customerService)
        {
            this.customerService = customerService;
        }
        // GET api/customer
        [HttpGet]
        public IEnumerable<Customer> GetAll()
        {
            return customerService.GetAll();
        }
        // GET api/customer/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(customerService.Get(id));
        }
        // POST api/customer
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Customer customer)
        {
            return CreatedAtAction("Get", new { id = customer.CustomerID }, customerService.Add(customer));
        }
        // PUT api/customer/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Customer customer)
        {
            customerService.Update(id, customer);
            return NoContent();
        }
        // DELETE api/customer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            customerService.Delete(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
