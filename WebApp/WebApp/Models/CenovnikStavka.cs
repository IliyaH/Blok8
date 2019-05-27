using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class CenovnikStavka
    {
        public int Id { get; set; }
        public double Cena { get; set; }
        public int IdCenovnik { get; set; }
        public int IdStavka { get; set; }
    }
}