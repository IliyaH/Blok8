using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Email { get; set; }
        public string Lozinka { get; set; }
        public string PonovljenaLozinka { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string Adresa { get; set; }

    }
}