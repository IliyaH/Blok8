using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public class TimetableRepository : Repository<Timetable, int>, ITimetableRepository
    {
        public TimetableRepository(DbContext context) : base(context)
        {
            
        }

        public List<Line> getTimetableLineItems(LineType lineType)
        {
            
            List<Line> Lines = ((ApplicationDbContext)context).Lines.Where(c => c.LineType == lineType).ToList();
            return Lines;
        }

        public List<Timetable> getTimetableItem(DayType dayType , LineType lineType , string lineName)
        {
            //aktivan red voznje
            int timetableActiveIDs = ((ApplicationDbContext)this.context).TimetableActives.Where(c => c.Active == true).Select(c => c.Id).First();

            //izabrani tip dana
            int DaysIDs = ((ApplicationDbContext)this.context).Days.Where(s => s.dayType == dayType).Select(c => c.Id).First();

            //izabrana liniju sa zadatim tipom i imenom
            int LinesIDs = ((ApplicationDbContext)this.context).Lines.Where(s => s.LineType == lineType && s.LineName == lineName).Select(c => c.Id).First();


            return ((ApplicationDbContext)this.context).Timetables.Where(p => p.IdDay == DaysIDs && p.IdLine == LinesIDs && p.IdTimetableActive == timetableActiveIDs).ToList();
        }

        public void addDepartures(int lineId, DayType dayType, string[] departures)
        {
            int idTimetableActive = ((ApplicationDbContext)this.context).TimetableActives.Where(ta => ta.Active == true).Select(i => i.Id).First();
            
            int idDay = ((ApplicationDbContext)this.context).Days.Where(d => d.dayType == dayType).Select(i => i.Id).First();
            foreach (string s in departures)
            {
                if(!((ApplicationDbContext)this.context).Timetables.Where(t => t.IdLine == lineId && t.IdTimetableActive == idTimetableActive).Select(d => d.Departures).Contains(s))
                {
                    ((ApplicationDbContext)this.context).Timetables.Add(new Timetable() { IdLine = lineId, IdDay = idDay, IdTimetableActive = idTimetableActive, Departures = s });
                }
            }
        }

        public void editDeparture(int departureId, string departure)
        {
            ((ApplicationDbContext)this.context).Timetables.Where(t => t.Id == departureId).First().Departures = departure;
        }
    }

    
}