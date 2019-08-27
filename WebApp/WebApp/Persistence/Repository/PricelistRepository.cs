using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public class PricelistRepository : Repository<Pricelist, int>, IPricelistRepository
    {
        public PricelistRepository(DbContext context) : base(context)
        {

        }

        public int getPricelistsItem(TicketType ticketType)
        {
            int pricelistId = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(c => c.Id).First();
            int itemId = ((ApplicationDbContext)this.context).Items.Where(s => s.TicketType == ticketType).Select(s => s.Id).First();
            return ((ApplicationDbContext)this.context).PricelistItems.Where(p => p.IdPricelist == pricelistId && p.IdItem == itemId).Select(s => s.Id).First();
        }

        public string getIdByEmail(string email)
        {
            return ((ApplicationDbContext)this.context).Users.Where(u => u.Email == email).Select(u => u.Id).First();
        }

        public Tuple<Pricelist, List<double>> getPrices()
        {
            Pricelist pricelist = (Pricelist)((ApplicationDbContext)this.context).Pricelists.Where(p => p.Active == true).FirstOrDefault();
            List<double> prices = new List<double>(((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == pricelist.Id).Select(p => p.Price).ToList());
            Tuple<Pricelist, List<double>> tuple = new Tuple<Pricelist, List<double>>(pricelist, prices);
            return tuple;
        }

        public void editPricelist(int id, double timeTicket, double dayTicket, double monthTicket, double yearTicket)
        {
            foreach(var v in ((ApplicationDbContext)this.context).Items)
            {
                if(v.TicketType == TicketType.TimeTicket)
                {
                    ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == id && pi.IdItem == v.Id).FirstOrDefault().Price = timeTicket;
                }
                else if (v.TicketType == TicketType.DayTicket)
                {
                    ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == id && pi.IdItem == v.Id).FirstOrDefault().Price = dayTicket;
                }
                else if (v.TicketType == TicketType.MounthTicket)
                {
                    ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == id && pi.IdItem == v.Id).FirstOrDefault().Price = monthTicket;
                }
                else if (v.TicketType == TicketType.YearTicket)
                {
                    ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == id && pi.IdItem == v.Id).FirstOrDefault().Price = yearTicket;
                }
            }
        }
    }
}