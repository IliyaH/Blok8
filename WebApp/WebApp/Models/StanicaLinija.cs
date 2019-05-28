using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class StanicaLinija
    {
        public int Id { get; set; }

        [ForeignKey("Linija")]
        public int IdLinija {get; set;}
        public Linija Linija { get; set; }

        [ForeignKey("Stanica")]
        public int IdStanica { get; set; }
        public Stanica Stanica { get; set; }

    }
}