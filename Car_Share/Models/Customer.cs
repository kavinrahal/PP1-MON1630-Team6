using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class Customer
    {
        // ----------------------MODEL---------------------

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerID { get; set; }

        [Required, StringLength(50), Display(Name = "Customer Name")]
        public string CustomerName { get; set; }

        [Required, StringLength(50)]
        public string Email { get; set; }
        [Required, StringLength(64)]
        public string Password { get; set; }

        [StringLength(50)]
        public string Address { get; set; }

        [StringLength(40)]
        public string City { get; set; }

        [StringLength(20), RegularExpression(@"\b(VIC|NSW|SA|QLD|TAS|NT|ACT)\b")]
        public string State { get; set; }

        [StringLength(4), RegularExpression(@"^[0-9]{4}$")]
        public string PostCode { get; set; }

        [Required, StringLength(15), RegularExpression(@"^\+61 [0-9]{4} [0-9]{4}$")]
        public string Phone { get; set; }

        // Reference customer history for bookings & transactions for quick access
        public virtual List<Booking> Bookings { get; set; }
        public virtual List<Transaction> Transactions { get; set; }
    }
}
