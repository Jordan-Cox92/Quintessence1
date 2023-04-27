using Quintessence.Models;
using Quintessence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Quintessence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanetController : ControllerBase
    {
        private readonly IPlanetRepository _planetRepository;
        public PlanetController(IPlanetRepository planetRepository)
        {
            _planetRepository = planetRepository;
        }

        [HttpGet]
        public IActionResult GetAllPlanets()
        {
            var planets = _planetRepository.GetAllPlanets();
            { return Ok(planets); }
        }


        [HttpPost]
        public IActionResult Create(Planet planet)
        {
            try
            {
                if (!_planetRepository.CheckIfExists(planet.Name))
                {
                    _planetRepository.AddPlanet(planet);
                    return Ok(planet);

                }
                return Conflict("This planet already exists");

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet("planet/{id}")]
        public IActionResult GetPlanet(int id)
        {
            var planet = _planetRepository.GetPlanetById(id);
            if (planet == null)
            {
                return NotFound();
            }
            return Ok(planet);

        }

        [HttpDelete("planet/delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _planetRepository.DeletePlanet(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict("This did not work");
            }
        }

        [HttpPut("planet/Edit/{id}")]
        public IActionResult Edit(Planet planet)
        {
            
                _planetRepository.EditPlanet(planet);

                return Ok(planet);
            
          
        }

    }
}
