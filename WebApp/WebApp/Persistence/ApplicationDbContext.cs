using System;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using WebApp.Models;

namespace WebApp.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Karta> Karta { get; set; }
        public DbSet<Administrator> Administrator { get; set; }
        public DbSet<Kontrolor> Kontrolor { get; set; }
        public DbSet<Korisnik> Korisnik { get; set; }
        public DbSet<Cenovnik> Cenovnik { get; set; }
        public DbSet<Stavka> Stavka { get; set; }
        public DbSet<CenovnikStavka> CenovnikStavka { get; set; }
        public DbSet<Linija> Linija { get; set; }
        public DbSet<Stanica> Stanica { get; set; }
        public DbSet<StanicaLinija> StanicaLinija { get; set; }

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}