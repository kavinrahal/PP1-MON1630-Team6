using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public record Booking
    {
        // ----------------------MODEL---------------------

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingID { get; init; }

        [Required, ForeignKey("Account"), Display(Name = "Account Number")]
        public int CustomerID { get; init; }
        public virtual Customer Customer { get; init; }
        [Required, ForeignKey("Account"), Display(Name = "Account Number")]
        public int CarID { get; init; }
        public virtual Car Car { get; init; }

        [Column(TypeName = "money")]
        public decimal Amount { get; init; }
        public string AmountString => String.Format("{0:C}", Amount);

        public DateTime StartTime { get; init; }
        public DateTime EndTime { get; init; }


        public Booking(int customerID, int carID, decimal amount, DateTime startTime, DateTime endTime)
        {
            CustomerID = customerID;
            CarID = carID;
            Amount = amount;
            StartTime = startTime;
            EndTime = endTime;
        }
    }
}
