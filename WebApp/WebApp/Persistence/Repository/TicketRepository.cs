using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public class TicketRepository : Repository<Ticket, int>, ITicketRepository
    {
        public TicketRepository(DbContext context) : base(context)
        {
        }

        public void AddPayPal(string transactionID, string payerId, string payerEmail, int ticketId)
        {
            ((ApplicationDbContext)this.context).PayPals.Add(new PayPal() { TransactionId = transactionID, PayerId = payerId, PayerEmail = payerEmail, IdTicket = ticketId });
        }

        public double CalculatePrice(Enums.TicketType ticketType, Enums.UserType userType)
        {
            int cenovnikId = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(c => c.Id).First();
            int stavkaId = ((ApplicationDbContext)this.context).Items.Where(s => s.TicketType == ticketType).Select(s => s.Id).First();
            double cena = ((ApplicationDbContext)this.context).PricelistItems.Where(c => c.IdPricelist == cenovnikId && c.IdItem == stavkaId).Select(c => c.Price).First();
            double koef = ((ApplicationDbContext)this.context).Coefficients.Where(k => k.UserType == userType).Select(k => k.Coef).First();
            return Math.Round(cena * koef, 2);
        }

        public bool CheckTicket(int id)
        {
            Ticket ticket = ((ApplicationDbContext)this.context).Tickets.Where(t => t.Id == id).First();
            PricelistItem pricelistItem = ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.Id == ticket.IdPricelistItem).First();
            TicketType ticketType = ((ApplicationDbContext)this.context).Items.Where(i => i.Id == pricelistItem.IdItem).Select(s => s.TicketType).First();
            long ticks = DateTime.Now.Ticks;

            if(ticketType == TicketType.TimeTicket)
            {
                if((ticks - ticket.IssueDate.Value.Ticks) < 36000000000)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }
            else if(ticketType == TicketType.DayTicket)
            {
                if (ticket.IssueDate.Value.Year == DateTime.Now.Year && ticket.IssueDate.Value.Month == DateTime.Now.Month && ticket.IssueDate.Value.Day == DateTime.Now.Day)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }
            else if(ticketType == TicketType.MounthTicket)
            {
                if(ticket.IssueDate.Value.Year == DateTime.Now.Year && ticket.IssueDate.Value.Month == DateTime.Now.Month)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;          
                    return false;
                }
            }
            else if(ticketType == TicketType.YearTicket)
            {
                if (ticket.IssueDate.Value.Year == DateTime.Now.Year)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }

            return false;
        }

        public void DeleteUserID(string id)
        {
            foreach(var v in ((ApplicationDbContext)this.context).Tickets.Where(t => t.IdApplicationUser == id))
            {
                if(v.IdApplicationUser == id)
                {
                    v.IdApplicationUser = null;
                }
            }
        }
    }
}