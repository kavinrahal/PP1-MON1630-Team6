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

        [Required, StringLength(1), Display(Name = "Car Type")]
        public char CarType { get; init; }

        [ForeignKey("Account"), Display(Name = "Account Number")]
        public int CustomerID { get; init; }
        public virtual Customer Customer { get; init; }

        [StringLength(255)]
        public string Note { get; init; }

        [Required]
        public DateTime ModifyDate { get; init; }
        public DateTime LocalDate => ModifyDate.ToLocalTime();

        public Car()
        {
            ModifyDate = DateTime.UtcNow;
        }

        public Car(char carType, string note = null)
        {
            CarType = carType;
            Note = note;
            ModifyDate = DateTime.UtcNow;
        }

        // rego number
        // make & model
        // fuel cap & amount
        // fuel type

    }
}
