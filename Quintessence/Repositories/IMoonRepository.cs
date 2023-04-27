using Quintessence.Models;
using System.Collections.Generic;

namespace Quintessence.Repositories
{
    public interface IMoonRepository
    {
        void AddMoon(Moon moon);
        bool CheckIfExists(string name);
        void DeleteMoon(int id);
        void EditMoon(Moon moon);
        List<Moon> GetAllMoons();
        Moon GetMoonById(int id);
    }
}