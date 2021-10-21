using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestWebAPI.Models;

namespace TestWebAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    [EnableCors("Default")]
    public class UsersController : ControllerBase
    {
        private readonly UserDataBaseContext context;

        public UsersController(UserDataBaseContext context)
            => this.context = context;

        [HttpGet("[controller]")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
            => await context.Users.ToListAsync();


        [HttpGet("user/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            User user = await context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return user;
        }

        [HttpPost("user")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpGet("rollingRetention/{days}")]
        public double CalculateRollingRetentionDay(int days)
        {
            int returnedUsersCount = context.Users.ToList().Where(n => (n.LastActivityDate - n.RegestrationDate).Days >= days).Count();
            int registeredUsersCount = context.Users.ToList().Where(n => (DateTime.Now - n.RegestrationDate).Days >= days).Count();

            return returnedUsersCount * 100.0 / registeredUsersCount;
        }

        [HttpPut("user/{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest();

            context.Entry(user).State = EntityState.Modified;
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await UserExists(id)))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        private async Task<bool> UserExists(int id)
            => await context.Users.AnyAsync(n => n.Id == id);
    }
}
