using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public interface ILineRepository : IRepository<Line, int>
    {
        void EditLine(string lineName, LineType lineType, int id, List<int> stations);
        void AddSttionsToLine(List<int> stations, int lineId);
        void DeleteLineStations(int id);
        IQueryable<int> FindAllStations(int id);
    }
}
