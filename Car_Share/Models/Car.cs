using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class Car
    {
        // ----------------------MODEL---------------------

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CarID { get; init; }

        [Required, StringLength(20), Display(Name = "Body Type")]
        public string BodyType { get; init; }
        [Required, StringLength(6), Display(Name = "Registration Number")]
        public string Rego { get; init; }
        [Required, StringLength(20)]
        public string Make { get; init; }
        [Required, StringLength(20)]
        public string Model { get; init; }
        [Required, StringLength(20)]
        public string Colour { get; init; }
        [StringLength(20), Display(Name = "Operating Schedule")]
        // Fuel statistics
        public string Schedule { get; init; }
        [Display(Name = "Fuel Capacity")]
        public int Fcap { get; init; }
        [Display(Name = "Fuel Amount")]
        public int Famo { get; init; }
        [StringLength(20), Display(Name = "Fuel Type")]
        public string Ftyp { get; init; }
        // Reference booking history for quick access
        public virtual List<Booking> Bookings { get; init; }

    }
}
