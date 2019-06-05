using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class KorisnikKarta
    {
        public int Id { get; set; }

        [ForeignKey("Korisnik")]
        public int IdKorisnik { get; set; }
        public Korisnik Korisnik { get; set; }

        [ForeignKey("Karta")]
        public int IdKarta { get; set; }
        public Karta Karta { get; set; }

    }
}