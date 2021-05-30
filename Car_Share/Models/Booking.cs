using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class Booking
    {
        // ----------------------MODEL---------------------

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingID { get; set; }

        [Required, ForeignKey("Customer")]
        public int CustomerID { get; set; }
        public virtual Customer Customer { get; set; }
        [Required, ForeignKey("Car")]
        public int CarID { get; set; }
        public virtual Car Car { get; set; }

        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public string AmountString => String.Format("{0:C}", Amount);

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public bool Active { get; set; }
    }
}
