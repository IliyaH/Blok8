using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : Repository<Line, int>, ILineRepository
    {
        public LineRepository(DbContext context) : base(context)
        {
        }

        public void AddSttionsToLine(List<int> stations, int lineId)
        {
            foreach(int station in stations)
            {
                ((ApplicationDbContext)this.context).StationLines.Add(new StationLine { IdLine = lineId, IdStation = station });
            }
        }

        public void DeleteLineStations(int id)
        {
            foreach(var v in ((ApplicationDbContext)this.context).StationLines.Where(sl => sl.IdLine == id))
            {
                ((ApplicationDbContext)this.context).StationLines.Remove(v);
            }
        }

        public int EditLine(string lineName, long lineVersion, LineType lineType, int id, List<int> stations)
        {
            if(((ApplicationDbContext)this.context).Lines.Where(l => l.Id == id).First().Version == lineVersion)
            {
                ((ApplicationDbContext)this.context).Lines.Where(l => l.Id == id).First().LineName = lineName;
                ((ApplicationDbContext)this.context).Lines.Where(l => l.Id == id).First().LineType = lineType;
                bool allStationsThere = true;
                foreach(int s in stations)
                {
                    if (!((ApplicationDbContext)this.context).Stations.Select(station => station.Id).Contains(s))
                    {
                        allStationsThere = false;
                        return 2;
                    }
                }

                if (allStationsThere)
                {
                    foreach (int station in stations)
                    {
                        if ((((ApplicationDbContext)this.context).StationLines.Where(sl => sl.IdLine == id).Select(i => i.IdStation).Contains(station)) == false)
                        {
                            ((ApplicationDbContext)this.context).StationLines.Add(new StationLine { IdLine = id, IdStation = station });
                        }

                    }


                    foreach (var v in ((ApplicationDbContext)this.context).StationLines.Where(sl => sl.IdLine == id))
                    {
                        if (!stations.Contains(v.IdStation))
                        {
                            ((ApplicationDbContext)this.context).StationLines.Remove(v);
                        }
                    }
                    ((ApplicationDbContext)this.context).Lines.Where(l => l.Id == id).First().Version = ((ApplicationDbContext)this.context).Lines.Where(l => l.Id == id).First().Version + 1;
                    return 0;
                }

                return -1;
            }
            else
            {
                return 1;
            }
        }

        public IQueryable<int> FindAllStations(int id)
        {
            return ((ApplicationDbContext)this.context).StationLines.Where(sl => sl.IdLine == id).Select(i => i.IdStation);
        }
    }
}