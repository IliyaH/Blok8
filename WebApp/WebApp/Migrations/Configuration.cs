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
                    PasswordHash = ApplicationUser.HashPassword("Nidza1996!"),
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

            if (!context.Days.Any(i => i.dayType == DayType.Weekday))
            {
                var day = new Day()
                {
                    dayType = DayType.Weekday
                };
                context.Days.Add(day);
            }

            if (!context.Days.Any(i => i.dayType == DayType.Weekend))
            {
                var day = new Day()
                {
                    dayType = DayType.Weekend
                };
                context.Days.Add(day);
            }


            if (!context.TimetableActives.Any(p => p.Active == true))
            {
                var timetableActive = new TimetableActive()
                {
                    Start = new DateTime(2019, 1, 1),
                    End = new DateTime(2019, 12, 31),
                    Active = true
                };
                context.TimetableActives.Add(timetableActive);
            }

            if (!context.Lines.Any(i => i.LineName == "1"))
            {
                var line = new Line()
                {
                    LineName = "1",
                    LineType = LineType.City
                    
                };
                context.Lines.Add(line);
            }

            if (!context.Lines.Any(i => i.LineName == "4"))
            {
                var line = new Line()
                {
                    LineName = "4",
                    LineType = LineType.City
                };
                context.Lines.Add(line);
            }

            if (!context.Lines.Any(i => i.LineName == "33"))
            {
                var line = new Line()
                {
                    LineName = "33",
                    LineType = LineType.Suburban
                };
                context.Lines.Add(line);
            }

            if (!context.Lines.Any(i => i.LineName == "21"))
            {
                var line = new Line()
                {
                    LineName = "21",
                    LineType = LineType.Suburban
                };
                context.Lines.Add(line);
            }

            #region Timetable data

            string[] polasci1Radni = new string[] { "6:50", "7:50", "9:50", "11:50", "13:50", "14:50", "16:50" };
            string[] polasci1Vikend = new string[] { "6:45", "7:45", "9:45", "11:45", "13:45", "14:45", "16:45" };
            string[] polasci2Radni = new string[] { "6:30", "7:30", "9:30", "11:30", "13:30", "14:30", "16:30" };
            string[] polasci2Vikend = new string[] { "6:25", "7:25", "9:25", "11:25", "13:25", "14:25", "16:25" };

            foreach (var timetableActive in context.TimetableActives)
            {
                if (!context.Timetables.Any(p => p.IdTimetableActive == timetableActive.Id))
                {
                    foreach (var day in context.Days)
                    {
                        if (!context.Timetables.Any(p => p.IdDay == day.Id))
                        {
                            foreach (var line in context.Lines)
                            {

                                //polasci za prvu liniju - gradski
                                if (line.LineName == "1" && day.dayType == DayType.Weekday)
                                {
                                    foreach (var polasci in polasci1Radni)
                                    {
                                        var timetable = new Timetable()
                                        {
                                            IdTimetableActive = timetableActive.Id,
                                            IdDay = day.Id,
                                            IdLine = line.Id,
                                            Departures = polasci
                                        };
                                        context.Timetables.Add(timetable);
                                    }

                                }
                                if (line.LineName == "1" && day.dayType == DayType.Weekend)
                                {
                                    foreach (var polasci in polasci1Vikend)
                                    {
                                        var timetable = new Timetable()
                                        {
                                            IdTimetableActive = timetableActive.Id,
                                            IdDay = day.Id,
                                            IdLine = line.Id,
                                            Departures = polasci
                                        };
                                        context.Timetables.Add(timetable);
                                    }

                                }

                                //polasci za drugu liniju - gradski
                                if (line.LineName == "4" && day.dayType == DayType.Weekday)
                                {
                                    foreach (var polasci in polasci2Radni)
                                    {
                                        var timetable = new Timetable()
                                        {
                                            IdTimetableActive = timetableActive.Id,
                                            IdDay = day.Id,
                                            IdLine = line.Id,
                                            Departures = polasci
                                        };
                                        context.Timetables.Add(timetable);
                                    }

                                }

                                if (line.LineName == "4" && day.dayType == DayType.Weekend)
                                {
                                    foreach (var polasci in polasci2Vikend)
                                    {
                                        var timetable = new Timetable()
                                        {
                                            IdTimetableActive = timetableActive.Id,
                                            IdDay = day.Id,
                                            IdLine = line.Id,
                                            Departures = polasci
                                        };
                                        context.Timetables.Add(timetable);
                                    }

                                }

                                //Polasci za 3. liniju - prigradski
                                if (line.LineName == "33" && day.dayType == DayType.Weekday)
                                {
                                    foreach (var polasci in polasci1Radni)
                                    {
                                        var timetable = new Timetable()
                                        {
                                            IdTimetableActive = timetableActive.Id,
                                            IdDay = day.Id,
                                            IdLine = line.Id,
                                            Departures = polasci
                                        };
                                        context.Timetables.Add(timetable);
                                    }

                                }

                                if (line.LineName == "33" && day.dayType == DayType.Weekend)
                                {
                                    foreach (var polasci in polasci1Vikend)
                                    {
                                        var timetable = new Timetable()
                                        {
                                            IdTimetableActive = timetableActive.Id,
                                            IdDay = day.Id,
                                            IdLine = line.Id,
                                            Departures = polasci
                                        };
                                        context.Timetables.Add(timetable);
                                    }

                                }


                                //Polasci za 4. liniju - prigradski
                                if (line.LineName == "21" && day.dayType == DayType.Weekday)
                                {
                                    foreach (var polasci in polasci2Radni)
                                    {
                                        var timetable = new Timetable()
                                        {
                                            IdTimetableActive = timetableActive.Id,
                                            IdDay = day.Id,
                                            IdLine = line.Id,
                                            Departures = polasci
                                        };
                                        context.Timetables.Add(timetable);
                                    }

                                }
                                if (line.LineName == "21" && day.dayType == DayType.Weekend)
                                {
                                    foreach (var polasci in polasci2Vikend)
                                    {
                                        var timetable = new Timetable()
                                        {
                                            IdTimetableActive = timetableActive.Id,
                                            IdDay = day.Id,
                                            IdLine = line.Id,
                                            Departures = polasci

                                        };
                                        context.Timetables.Add(timetable);
                                    }

                                }



                            }
                        }
                    }
                }
            }

            #endregion
        }
    }
}
