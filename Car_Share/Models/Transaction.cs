using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public record Transaction
    {
        // ----------------------MODEL---------------------

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TransactionID { get; set; }

        [Required, ForeignKey("Customer"), Display(Name = "Customer Number")]
        public int CustomerID { get; set; }
        public virtual Customer Customer { get; set; }

        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public string AmountString => String.Format("{0:C}", Amount);

        [StringLength(255)]
        public string Comment { get; set; }

        [Required]
        public DateTime ModifyDate { get; set; }
        public DateTime LocalDate => ModifyDate.ToLocalTime();

        public Transaction()
        {
            ModifyDate = DateTime.UtcNow;
        }

        public Transaction(int customerID, decimal amount, string comment = null)
        {
            CustomerID = customerID;
            Amount = amount;
            Comment = comment;
            ModifyDate = DateTime.UtcNow;
        }

        // ----------------------LOGIC---------------------

        public override string ToString()
        {
            return $"{String.Format("{0:C}", Amount)} : #{CustomerID}";
        }
    }
}
