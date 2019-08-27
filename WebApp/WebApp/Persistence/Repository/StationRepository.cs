using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class StationRepository : Repository<Station, int>, IStationRepository
    {
        public StationRepository(DbContext context) : base(context)
        {
            
        }

        public void DeleteStationLines(int id)
        {
            foreach(var v in ((ApplicationDbContext)this.context).StationLines.Where(sl => sl.IdStation == id))
            {
                ((ApplicationDbContext)this.context).StationLines.Remove(v);
            }
        }

        public void EditStation(Station station, int id)
        {
            ((ApplicationDbContext)this.context).Stations.Where(s => s.Id == id).First().Name = station.Name;
            ((ApplicationDbContext)this.context).Stations.Where(s => s.Id == id).First().Address = station.Address;
            ((ApplicationDbContext)this.context).Stations.Where(s => s.Id == id).First().XCoordinate = station.XCoordinate;
            ((ApplicationDbContext)this.context).Stations.Where(s => s.Id == id).First().YCoordinate = station.YCoordinate;
        }

        public List<string> FindLines(int idStation)
        {
            List<int> lines = ((ApplicationDbContext)this.context).StationLines.Where(s => s.IdStation == idStation).Select(l => l.IdLine).ToList();
            List<string> linesName = new List<string>();
            foreach(int li in lines)
            {
                linesName.Add(((ApplicationDbContext)this.context).Lines.Where(l => l.Id == li).First().LineName);
            }

            return linesName;
        }
    }
}