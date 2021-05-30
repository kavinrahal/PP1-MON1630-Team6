using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class Login
    {
        // ----------------------MODEL---------------------

        [Key, Required, StringLength(32), Display(Name = "Email Address")]
        public string Email { get; set; }

        [Required, StringLength(64), Display(Name = "Password")]
        public string PasswordHash { get; set; }
        [Required, ForeignKey("Customer")]
        public int CustomerID { get; set; }
        //public virtual Customer Customer { get; init; }
    }
}
