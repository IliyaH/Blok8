using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Stanica
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Adresa { get; set; }
        public double XKoordinata { get; set; }
        public double YKoordinata { get; set; }
        public List<Linija> Linije { get; set; }
    }
}