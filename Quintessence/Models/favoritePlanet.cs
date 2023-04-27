using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Quintessence.Models
{
    public class FavoritePlanet
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int PlanetId { get; set; }

        public Planet Planet { get; set; }

       




    }
}
