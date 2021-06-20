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
    public class CarController : ControllerBase
    {
        private readonly CarService carService;
        public CarController(CarService carService)
        {
            this.carService = carService;
        }
        // GET api/car
        [HttpGet]
        public IEnumerable<Car> GetAll()
        {
            return carService.GetAll();
        }
        // GET api/car/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(carService.Get(id));
        }
        // POST api/car
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Car car)
        {
            return CreatedAtAction("Get", new { id = car.CarID }, carService.Add(car));
        }
        // PUT api/car/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Car car)
        {
            carService.Update(id, car);
            return NoContent();
        }
        // DELETE api/car/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            carService.Delete(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
