using Quintessence.Models;
using System.Collections.Generic;

namespace Quintessence.Repositories
{
    public interface IPlanetRepository
    {
        List<Planet> GetAllPlanets();
        bool CheckIfExists(string name);
        void AddPlanet(Planet planet);
        Planet GetPlanetById(int id);

         void EditPlanet(Planet planet);

        void DeletePlanet(int id);
      
    }
}