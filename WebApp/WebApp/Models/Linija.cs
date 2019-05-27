using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Linija
    {
        public int Id { get; set; }
        public List<Stanica> Stanice { get; set; }
    }
}