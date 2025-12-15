using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;
using StudentApi.Models;

namespace StudentApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;

            if (!_context.Students.Any())
            {
                _context.Students.AddRange(
                    new Student { Name = "Rahul", Class = "10", Section = "A" },
                    new Student { Name = "Anita", Class = "9", Section = "B" }
                );
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            

            return Ok(await _context.Students.ToListAsync());
        }
        [HttpPost]
        public async Task<IActionResult> Post(Student s)
        {
            _context.Students.Add(s);
            await _context.SaveChangesAsync();
            return Ok(s);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Student s)
        {
            var existing = await _context.Students.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = s.Name;
            existing.Class = s.Class;
            existing.Section = s.Section;
            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var s = await _context.Students.FindAsync(id);
            if (s == null) return NotFound();

            _context.Students.Remove(s);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
