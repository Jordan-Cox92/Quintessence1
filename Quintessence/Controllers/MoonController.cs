using Quintessence.Models;
using Quintessence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Quintessence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoonController : ControllerBase
    {
        private readonly IMoonRepository _moonRepository;
        public MoonController(IMoonRepository moonRepository)
        {
            _moonRepository = moonRepository;
        }

        [HttpGet]
        public IActionResult GetAllMoons()
        {
            var moons = _moonRepository.GetAllMoons();
            { return Ok(moons); }
        }


        [HttpPost]
        public IActionResult Create(Moon moon)
        {
            try
            {
                if (!_moonRepository.CheckIfExists(moon.Name))
                {
                    _moonRepository.AddMoon(moon);
                    return Ok(moon);

                }
                return Conflict("This moon already exists");

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet("moon/{id}")]
        public IActionResult GetMoon(int id)
        {
            var moon = _moonRepository.GetMoonById(id);
            if (moon == null)
            {
                return NotFound();
            }
            return Ok(moon);

        }

        [HttpDelete("moon/delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _moonRepository.DeleteMoon(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict("This did not work");
            }
        }

        [HttpPut("moon/Edit/{id}")]
        public IActionResult Edit(Moon moon)
        {

            _moonRepository.EditMoon(moon);

            return Ok(moon);


        }

    }
}

