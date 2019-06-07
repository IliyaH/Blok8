using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class KoeficijentRepository : Repository<Koeficient, int>, IKoeficijentRepository
    {
        public KoeficijentRepository(DbContext context) : base(context)
        {
        }

        public double TipKorisnikaKoef(TipKorisnika tipKorisnika, VrstaKarte vrstaKarte)
        {
            int cenovnikId = ((ApplicationDbContext)this.context).Cenovnik.Where(c => c.Aktivan == true).Select(c => c.Id).First();
            int stavkaId = ((ApplicationDbContext)this.context).Stavka.Where(s => s.VrstaKarte == vrstaKarte).Select(s => s.Id).First();
            double cena = ((ApplicationDbContext)this.context).CenovnikStavka.Where(c => c.IdCenovnik == cenovnikId && c.IdStavka == stavkaId).Select(c => c.Cena).First();
            float koef = ((ApplicationDbContext)this.context).Koeficient.Where(k => k.TipKorisnika == tipKorisnika).Select(k => k.Koef).First();
            return Math.Round(cena * koef, 2);
        }
    }
}