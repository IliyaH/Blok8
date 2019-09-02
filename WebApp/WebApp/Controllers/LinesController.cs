using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;
using static WebApp.Models.Enums;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Lines")]
    public class LinesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();


        private readonly IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;
        public LinesController(ApplicationUserManager userManager, IUnitOfWork uw)
        {
            UserManager = userManager;
            UnitOfWork = uw;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: api/Lines
        public IQueryable<Line> GetLines()
        {
            return UnitOfWork.LineRepository.GetAll().AsQueryable();
        }

        [Route("GetLineStations")]
        public IQueryable<int> GetLineStations(int id)
        {
            return UnitOfWork.LineRepository.FindAllStations(id);
        }

        // GET: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult GetLine(int id)
        {
            Line line = UnitOfWork.LineRepository.Get(id);
            if (line == null)
            {
                return NotFound();
            }

            return Ok(line);
        }

        // PUT: api/Lines/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLine(int id, Line line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != line.Id)
            {
                return BadRequest();
            }

            UnitOfWork.LineRepository.Entry(line, EntityState.Modified);

            try
            {
                UnitOfWork.LineRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Lines/5
        [Route("Edit")]
        [ResponseType(typeof(Line))]
        public IHttpActionResult EditLine(string lineName, long lineVersion, string lineType, int id, string stationsIds)
        {
            Line line = UnitOfWork.LineRepository.Get(id);
            if(line == null)
            {
                return Ok(202);
            }

            List<int> intStations = new List<int>();
            string[] data = stationsIds.Split(',');
            foreach (string s in data)
            {
                intStations.Add(Int32.Parse(s));
            }

            if(UnitOfWork.LineRepository.EditLine(lineName, lineVersion, (LineType)Enum.Parse(typeof(LineType), lineType), id, intStations) == 0)
            {
                UnitOfWork.LineRepository.SaveChanges();
                return Ok(200);
            }
            else if(UnitOfWork.LineRepository.EditLine(lineName, lineVersion, (LineType)Enum.Parse(typeof(LineType), lineType), id, intStations) == 1)
            {
                return Ok(204);
            }
            else
            {
                return Ok(203);
            }
        }

        // POST: api/Lines
        [ResponseType(typeof(Line))]
        public IHttpActionResult PostLine(string stations, string lineName, string lineType)
        {
            
            Line line = new Line();
            line.LineName = lineName;
            line.LineType = (LineType)Enum.Parse(typeof(LineType), lineType);
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.LineRepository.Add(line);
            UnitOfWork.LineRepository.SaveChanges();

            List<int> intStations = new List<int>();
            string[] data = stations.Split(',');
            foreach(string s in data)
            {
                intStations.Add(Int32.Parse(s));
            }

            UnitOfWork.LineRepository.AddSttionsToLine(intStations, line.Id);
            UnitOfWork.LineRepository.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
        }

        // DELETE: api/Lines/5
        [Route("Delete")]
        [ResponseType(typeof(Line))]
        public IHttpActionResult DeleteLine(int id)
        {
            Line line = UnitOfWork.LineRepository.Get(id);
            if (line == null)
            {
                return Ok(204);
            }

            UnitOfWork.LineRepository.Remove(line);
            UnitOfWork.LineRepository.SaveChanges();
            UnitOfWork.LineRepository.DeleteLineStations(id);
            UnitOfWork.LineRepository.SaveChanges();


            return Ok(200);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.LineRepository.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LineExists(int id)
        {
            //return db.Lines.Count(e => e.Id == id) > 0;
            return UnitOfWork.LineRepository.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}