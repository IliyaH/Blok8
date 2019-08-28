using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public interface ITimetableRepository : IRepository<Timetable, int>
    {
        List<Line> getTimetableLineItems(LineType lineType);
        List<Timetable> getTimetableItem(DayType dayType, LineType lineType, string lineName);
        void addDepartures(int lineId, DayType dayType, string [] departures);
        void editDeparture(int departureId, string departure);
    }
}
