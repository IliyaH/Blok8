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
        public DbSet<Pricelist> Pricelists { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Coefficient> Coefficients { get; set; }
        public DbSet<PricelistItem> PricelistItems { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Line> Lines { get; set; }

        public DbSet<Day> Days { get; set; }

        public DbSet<Station> Stations { get; set; }

        public DbSet<TimetableActive> TimetableActives { get; set; }

        public DbSet<StationLine> StationLines { get; set; }

        public DbSet<Timetable> Timetables { get; set; }

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