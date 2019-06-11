using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public interface IPricelistRepository : IRepository<Pricelist, int>
    {
        int getPricelistsItem(TicketType ticketType);

        string getIdByEmail(string email);
    }
}
