using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public interface ITicketRepository : IRepository<Ticket, int>
    {
        double CalculatePrice(TicketType ticketType, UserType userType);
    }
}
