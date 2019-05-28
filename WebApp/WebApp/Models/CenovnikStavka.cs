using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class CenovnikStavka
    {
        public int Id { get; set; }
        public double Cena { get; set; }

        [ForeignKey("Cenovnik")]
        public int IdCenovnik { get; set; }
        public Cenovnik Cenovnik { get; set; }

        [ForeignKey("Stavka")]
        public int IdStavka { get; set; }
        public Stavka Stavka { get; set; }
    }
}