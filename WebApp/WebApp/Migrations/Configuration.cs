namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebApp.Models;
    using static WebApp.Models.Enums;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Controller"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Controller" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
            { 
                var user = new ApplicationUser() { Id = "appu", UserName = "appu@yahoo.com", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            if (!context.Users.Any(u => u.UserName == "nikola.dragas9@gmail.com"))
            {
                var user = new ApplicationUser()
                {
                    UserName = "nikola.dragas9@gmail.com",
                    Email = "nikola.dragas9@gmail.com",
                    PasswordHash = ApplicationUser.HashPassword("Nidza1996"),
                    Name = "Nikola",
                    Surname = "Dragas",
                    Birthday = new DateTime(1996, 8, 15),
                    Image = "",
                    UserType = UserType.Student,
                    Address = "Sase Kovacevica 9",
                    Activated = true
                };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            if (!context.Items.Any(i => i.TicketType == TicketType.TimeTicket))
            {
                var item = new Item()
                {
                    TicketType = TicketType.TimeTicket
                };
                context.Items.Add(item);
            }

            if (!context.Items.Any(i => i.TicketType == TicketType.DayTicket))
            {
                var item = new Item()
                {
                    TicketType = TicketType.DayTicket
                };
                context.Items.Add(item);
            }

            if (!context.Items.Any(i => i.TicketType == TicketType.MounthTicket))
            {
                var item = new Item()
                {
                    TicketType = TicketType.MounthTicket
                };
                context.Items.Add(item);
            }

            if (!context.Items.Any(i => i.TicketType == TicketType.YearTicket))
            {
                var item = new Item()
                {
                    TicketType = TicketType.YearTicket
                };
                context.Items.Add(item);
            }

            if(!context.Pricelists.Any(p => p.Active == true))
            {
                var pricelist = new Pricelist()
                {
                    Start = new DateTime(2019, 1, 1),
                    End = new DateTime(2019, 12, 31),
                    Active = true
                };
                context.Pricelists.Add(pricelist);
            }

            if (!context.Coefficients.Any(c => c.UserType == UserType.RegularUser))
            {
                var coefRegular = new Coefficient()
                {
                    UserType = UserType.RegularUser,
                    Coef = 1
                };
                context.Coefficients.Add(coefRegular);
            }

            if (!context.Coefficients.Any(c => c.UserType == UserType.Student))
            {
                var coefStudent = new Coefficient()
                {
                    UserType = UserType.Student,
                    Coef = 0.8
                };
                context.Coefficients.Add(coefStudent);
            }

            if (!context.Coefficients.Any(c => c.UserType == UserType.Pensioner))
            {
                var coefPensioner = new Coefficient()
                {
                    UserType = UserType.Pensioner,
                    Coef = 0.6
                };
                context.Coefficients.Add(coefPensioner);
            }

            var priceOfTimeTicket = 65;
            var priceOfDayTicket = 100;
            var priceOfMonthTicket = 1000;
            var priceOfYearTicket = 5000;

            foreach (var pricelist in context.Pricelists)
            {
                if(!context.PricelistItems.Any(p => p.IdPricelist == pricelist.Id))
                {
                    foreach (var item in context.Items)
                    {
                        var pricelistItem = new PricelistItem()
                        {
                            IdPricelist = pricelist.Id,
                            IdItem = item.Id,
                            Price = 0
                        };

                        if (item.TicketType == TicketType.TimeTicket)
                        {
                            pricelistItem.Price = priceOfTimeTicket;
                        }
                        else if (item.TicketType == TicketType.DayTicket)
                        {
                            pricelistItem.Price = priceOfDayTicket;
                        }
                        else if (item.TicketType == TicketType.MounthTicket)
                        {
                            pricelistItem.Price = priceOfMonthTicket;
                        }
                        else
                        {
                            pricelistItem.Price = priceOfYearTicket;
                        }

                        context.PricelistItems.Add(pricelistItem);
                    }
                }
                
            }
        }
    }
}
