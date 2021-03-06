﻿using System;
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

        Tuple<Pricelist, List<double>> getPrices();

        bool editPricelist(int id, long pricelistVersion, double timeTicket, double dayTicket, double monthTicket, double yearTicket);

        void addPricelist(DateTime to, double timeTicket, double dayTicket, double monthTicket, double yearTicket);

        void addPricelistItem(double timeTicket, double dayTicket, double monthTicket, double yearTicket);
    }
}
