using Quintessence.Models;
using System.Collections.Generic;

namespace Quintessence.Repositories
{
    public interface IFavoritePlanetRepository
    {
        void AddFavoritePlanet(FavoritePlanet favoritePlanet);
        bool CheckIfExists(int id, int userId);
        void DeleteFavoritePlanet(int id);
        List<FavoritePlanet> GetAllFavoritePlanets();
        FavoritePlanet GetFavoritePlanetById(int id);
    }
}