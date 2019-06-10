using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class PricelistItem
    {
        public int Id { get; set; }
        public double Price { get; set; }

        [ForeignKey("Pricelist")]
        public int IdPricelist { get; set; }
        public Pricelist Pricelist { get; set; }

        [ForeignKey("Item")]
        public int IdItem { get; set; }
        public Item Item { get; set; }
    }
}