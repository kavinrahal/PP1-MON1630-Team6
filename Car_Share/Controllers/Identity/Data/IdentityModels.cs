using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CarShare.Models;
using Microsoft.AspNetCore.Identity;

namespace CarShare.Controllers.Identity.Data
{
    [Table("AspNetUsers")]
    public class User : IdentityUser
    {
        public int? CustomerID { get; set; }
        public virtual Customer Customer { get; set; }

        [Key, Column(TypeName = "nvarchar(8)")]
        public string LoginID { get; set; }

        [Required]
        public DateTime ModifyDate { get; set; }
    }

    [Table("AspNetRoles")]
    public class Role : IdentityRole
    {
        public Role() : base() { }
        public Role(string roleName) : base(roleName) { }

        public const string Admin = "Admin";
        public const string Customer = "Customer";
    }
}