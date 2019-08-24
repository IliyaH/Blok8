using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface ILineRepository : IRepository<Line, int>
    {
        void EditLine(Line line, int id);
        void AddSttionsToLine(List<int> stations, int lineId);
    }
}
