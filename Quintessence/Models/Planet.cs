using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Quintessence.Models
{
    public class Planet
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Distance { get; set; }

        public string ImageUrl { get; set; }

        public string Gravity { get; set; }

        public string Composition { get; set; }

        public string Orbit { get; set; }

        public string Atmosphere { get; set; }

        public string Size { get; set; }
    }
}
