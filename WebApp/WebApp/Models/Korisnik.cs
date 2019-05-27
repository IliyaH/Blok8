using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Korisnik : User
    {
        public TipKorisnika TipKorisnika { get; set; }
        public string Slika { get; set; }

    }
}