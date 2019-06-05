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
    }
}