using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class Location
    {
        [Key]
        [Required]
        [ForeignKey(nameof(Car))]
        public int CarID { get; init; }

        [Required, Display(Name = "Latitude")]
        public double Lat { get; init; }
        [Required, Display(Name = "Longitude")]
        public double Lng { get; init; }
    }
}
