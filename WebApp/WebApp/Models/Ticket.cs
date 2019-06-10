using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public DateTime? IssueDate { get; set; }

        [ForeignKey("PricelistItem")]
        public int IdPricelistItem { get; set; }
        public PricelistItem PricelistItem { get; set; }

        [ForeignKey("ApplicationUser")]
        public string IdApplicationUser { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public bool Valid { get; set; }
        public double Price { get; set; }

    }
}