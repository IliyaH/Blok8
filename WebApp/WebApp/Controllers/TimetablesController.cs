using Microsoft.AspNet.Identity;
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
    [RoutePrefix("api/Timetables")]
    public class TimetablesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        private readonly IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;

        public TimetablesController(ApplicationUserManager userManager, IUnitOfWork uw)
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

        // GET: api/Timetables
        public IQueryable<Timetable> GetTimetables(DayType dayType, LineType lineType, string lineName)
        {
            return UnitOfWork.TimetableRepository.getTimetableItem(dayType , lineType, lineName).AsQueryable();
        }

        // GET: api/Timetables/Lines
        [Route("Lines")]
        public IQueryable<Line>GetTimetableLineItems(LineType lineType)
        {
            return UnitOfWork.TimetableRepository.getTimetableLineItems(lineType).AsQueryable();
        }

        // GET: api/Timetables/5
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult GetTimetable(int id)
        {
            Timetable timetable = db.Timetables.Find(id);
            if (timetable == null)
            {
                return NotFound();
            }

            return Ok(timetable);
        }

        // PUT: api/Timetables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTimetable(int id, Timetable timetable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != timetable.Id)
            {
                return BadRequest();
            }

            db.Entry(timetable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimetableExists(id))
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

        // POST: api/Timetables
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult PostTimetable(Timetable timetable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Timetables.Add(timetable);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = timetable.Id }, timetable);
        }

        [Route("AddDeparture")]
        public IHttpActionResult AddDeparture(int idLine, DayType dayType, string departures)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string[] dataDepartures = departures.Split(';');
            UnitOfWork.TimetableRepository.addDepartures(idLine, dayType, dataDepartures);
            UnitOfWork.TimetableRepository.SaveChanges();

            return Ok(0);
        }

        [Route("EditDeparture")]
        public IHttpActionResult EditDeparture(int departureId, string selectedDeparture)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.TimetableRepository.editDeparture(departureId, selectedDeparture);
            UnitOfWork.TimetableRepository.SaveChanges();

            return Ok(0);
        }

        // DELETE: api/Timetables/5
        [Route("Delete")]
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult DeleteTimetable(int departureId)
        {
            Timetable timetable = db.Timetables.Find(departureId);
            if (timetable == null)
            {
                return NotFound();
            }

            db.Timetables.Remove(timetable);
            db.SaveChanges();

            return Ok(timetable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TimetableExists(int id)
        {
            return db.Timetables.Count(e => e.Id == id) > 0;
        }
    }
}