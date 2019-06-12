using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Day
    {
        public int Id { get; set; }

        public DayType dayType { get; set; }
    }
}