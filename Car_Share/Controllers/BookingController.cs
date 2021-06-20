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
    public class BookingController : ControllerBase
    {
        private readonly BookingService bookingService;
        public BookingController(BookingService bookingService)
        {
            this.bookingService = bookingService;
        }
        // GET api/booking
        [HttpGet]
        public IEnumerable<Booking> GetAll()
        {
            return bookingService.GetAll();
        }
        // GET api/booking/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(bookingService.Get(id));
        }
        // POST api/booking
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Booking booking)
        {
            return CreatedAtAction("Get", new { id = booking.BookingID }, bookingService.Add(booking));
        }
        // PUT api/booking/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Booking booking)
        {
            bookingService.Update(id, booking);
            return NoContent();
        }
        // DELETE api/booking/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bookingService.Delete(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
