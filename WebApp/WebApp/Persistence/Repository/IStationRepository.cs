using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IStationRepository : IRepository<Station, int>
    {
        void EditStation(Station station, int id);
        List<string> FindLines(int idStation);
    }
}
