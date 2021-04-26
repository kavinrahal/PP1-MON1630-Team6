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
        public int TransactionID { get; init; }

        [Required, ForeignKey("Account"), Display(Name = "Account Number")]
        public int CustomerID { get; init; }
        public virtual Customer Customer { get; init; }

        [Column(TypeName = "money")]
        public decimal Amount { get; init; }
        public string AmountString => String.Format("{0:C}", Amount);

        [StringLength(255)]
        public string Comment { get; init; }

        [Required]
        public DateTime ModifyDate { get; init; }
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
