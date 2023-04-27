using Quintessence.Models;
using Quintessence.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Quintessence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritePlanetController : ControllerBase
    {
        private readonly IFavoritePlanetRepository _favoritePlanetRepository;
        public FavoritePlanetController(IFavoritePlanetRepository favoritePlanetRepository)
        {
            _favoritePlanetRepository = favoritePlanetRepository;
        }

        [HttpGet]
        public IActionResult GetAllFavoritePlanets()
        {
            var favoritePlanets = _favoritePlanetRepository.GetAllFavoritePlanets();
            { return Ok(favoritePlanets); }
        }


        [HttpPost]
        public IActionResult Create(FavoritePlanet favoritePlanet)
        {
            try
            {
                if (!_favoritePlanetRepository.CheckIfExists(favoritePlanet.PlanetId, favoritePlanet.UserId))
                {
                    _favoritePlanetRepository.AddFavoritePlanet(favoritePlanet);
                    return Ok(favoritePlanet);

                }
                return Conflict("This planet already exists in your favorite planets");

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet("favoritePlanet/{id}")]
        public IActionResult GetFavoritePlanet(int id)
        {
            var favoritePlanet = _favoritePlanetRepository.GetFavoritePlanetById(id);
            if (favoritePlanet == null)
            {
                return NotFound();
            }
            return Ok(favoritePlanet);

        }

        [HttpDelete("favoritePlanet/delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _favoritePlanetRepository.DeleteFavoritePlanet(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict("This did not work");
            }
        }
    }
}
