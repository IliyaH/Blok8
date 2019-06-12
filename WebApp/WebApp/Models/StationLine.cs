using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class StationLine
    {
        public int Id { get; set; }

        [ForeignKey("Station")]
        public int IdStation { get; set; }
        public Station Station { get; set; }

        [ForeignKey("Line")]
        public int IdLine { get; set; }
        public Line Line { get; set; }
    }
}