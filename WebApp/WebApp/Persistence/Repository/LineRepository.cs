using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

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

        public void EditLine(Line line, int id)
        {
            ((ApplicationDbContext)this.context).Lines.Where(l => l.Id == id).First().LineName = line.LineName;
            ((ApplicationDbContext)this.context).Lines.Where(l => l.Id == id).First().LineType = line.LineType;
        }
    }
}