using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using Unity;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public class DemoUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
      
        public DemoUnitOfWork(DbContext context)
        {
            _context = context;
        }

        //Staviti ovde repozitorijume za sve modele
        [Unity.Dependency]
        public IKartaRepository KartaRepository {get;set;}
        [Unity.Dependency]
        public IKorisnikRepository KorisnikRepository { get; set; }
        [Unity.Dependency]
        public IKoeficijentRepository KoeficijentRepository { get; set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}