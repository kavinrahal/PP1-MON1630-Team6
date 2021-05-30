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
    public class LoginController : ControllerBase
    {
        private readonly LoginService userService;
        public LoginController(LoginService userService)
        {
            this.userService = userService;
        }
        // GET api/login
        [HttpGet]
        public IEnumerable<Login> GetAll()
        {
            return userService.GetAll();
        }
        // GET api/login/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string username)
        {
            return Ok(userService.Get(username));
        }
        // POST api/login
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Login user)
        {
            return CreatedAtAction("Get", new { id = user.Email }, userService.Add(user));
        }
        // PUT api/login/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string username, [FromBody] Login user)
        {
            userService.Update(username, user);
            return NoContent();
        }
        // DELETE api/login/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string username)
        {
            userService.Delete(username);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
