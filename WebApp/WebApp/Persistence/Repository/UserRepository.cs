using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class UserRepository : Repository<ApplicationUser, int>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }

        public IQueryable<ApplicationUser> getNotActiveUsers()
        {
            var temp = ((ApplicationDbContext)context).Users.Where(u => u.Activated == Enums.RequestType.InProcess).Select(s => s.Roles);
            var temp2 = ((ApplicationDbContext)context).Users.Where(u => u.Activated == Enums.RequestType.InProcess).Select(s => s.Roles);
            return ((ApplicationDbContext)context).Users.Where(u => u.Activated == Enums.RequestType.InProcess);
        }
    }
}