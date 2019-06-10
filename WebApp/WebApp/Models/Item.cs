using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Item
    {
        public int Id { get; set; }
        public TicketType TicketType { get; set; }
    }
}