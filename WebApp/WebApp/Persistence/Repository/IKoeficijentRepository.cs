﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IKoeficijentRepository : IRepository<Koeficient , int>
    {
        double TipKorisnikaKoef(TipKorisnika tipKorisnika, VrstaKarte vrstaKarte);
    }

}
