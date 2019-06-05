using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Karta
    {
        public int Id { get; set; }
        public DateTime VremeIzdavanja { get; set; }

        [ForeignKey("CenovnikStavka")]
        public int IdCenovnikStavka { get; set; }
        public CenovnikStavka CenovnikStavka { get; set; }

        public bool Validna { get; set; }

    }
}