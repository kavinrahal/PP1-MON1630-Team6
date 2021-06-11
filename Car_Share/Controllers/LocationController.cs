using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using CarShare.Models;
using CarShare.Services;

namespace CarShare.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class LocationController : ControllerBase
    {
        private readonly LocationService locationService;
        public LocationController(LocationService locationService)
        {
            this.locationService = locationService;
        }
        // GET api/location
        [HttpGet]
        public IEnumerable<Location> GetAll()
        {
            return locationService.GetAll();
        }
        // GET api/location/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(locationService.Get(id));
        }
        // POST api/location
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Location location)
        {
            return CreatedAtAction("Get", new { id = location.CarID }, locationService.Add(location));
        }
        // PUT api/location/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Location location)
        {
            locationService.Update(id, location);
            return NoContent();
        }
        // DELETE api/location/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            locationService.Delete(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
