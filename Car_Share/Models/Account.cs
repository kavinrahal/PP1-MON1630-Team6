using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class Account
    {
        // ----------------------MODEL---------------------

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountID { get; set; }

        [Required, StringLength(50), Display(Name = "Username")]
        public string Username { get; set; }

        [Required, StringLength(50), Display(Name = "Password")]
        public string Password { get; set; }
        public virtual Customer Customer { get; init; }
    }
}
