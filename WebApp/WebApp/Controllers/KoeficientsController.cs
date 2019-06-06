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

namespace WebApp.Controllers
{
    public class KoeficientsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        public IUnitOfWork UnitOfWork { get; set; }

        public KoeficientsController(IUnitOfWork unitOfWork)
        {

            UnitOfWork = unitOfWork;
        }

        // GET: api/Koeficients
        public IQueryable<Koeficient> GetKoeficient()
        {
            return UnitOfWork.KoeficijentRepository.GetAll().AsQueryable();
        }

        // GET: api/Koeficients/5
        [ResponseType(typeof(Koeficient))]
        public IHttpActionResult GetKoeficient(int id)
        {
            Koeficient koeficient = UnitOfWork.KoeficijentRepository.Get(id);
            if (koeficient == null)
            {
                return NotFound();
            }

            return Ok(koeficient);
        }

        // PUT: api/Koeficients/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKoeficient(int id, Koeficient koeficient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != koeficient.Id)
            {
                return BadRequest();
            }

            //db.Entry(koeficient).State = EntityState.Modified;
            UnitOfWork.KoeficijentRepository.Entry(koeficient, EntityState.Modified);

            try
            {
                UnitOfWork.KoeficijentRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KoeficientExists(id))
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

        // POST: api/Koeficients
        [ResponseType(typeof(Koeficient))]
        public IHttpActionResult PostKoeficient(Koeficient koeficient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.KoeficijentRepository.Add(koeficient);
            UnitOfWork.KoeficijentRepository.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = koeficient.Id }, koeficient);
        }

        // GET: api/Koeficients
        [ResponseType(typeof(double))]
        public IHttpActionResult GetCena(VrstaKarte vrstaKarte, TipKorisnika tipKorisnika)
        {
            int cenovnikId = db.Cenovnik.Where(c => c.Aktivan == true).Select(c => c.Id).First();
            int stavkaId = db.Stavka.Where(s => s.VrstaKarte == vrstaKarte).Select(s => s.Id).First();
            double cena = db.CenovnikStavka.Where(c => c.IdCenovnik == cenovnikId && c.IdStavka == stavkaId).Select(c => c.Cena).First();
            float koef = db.Koeficient.Where(k => k.TipKorisnika == tipKorisnika).Select(k => k.Koef).First();
            return Ok(Math.Round(cena * koef, 2));

        }

        // DELETE: api/Koeficients/5
        [ResponseType(typeof(Koeficient))]
        public IHttpActionResult DeleteKoeficient(int id)
        {
            Koeficient koeficient = UnitOfWork.KoeficijentRepository.Get(id);
            if (koeficient == null)
            {
                return NotFound();
            }


            UnitOfWork.KoeficijentRepository.Remove(koeficient);
            UnitOfWork.KoeficijentRepository.SaveChanges();

            return Ok(koeficient);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.KoeficijentRepository.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KoeficientExists(int id)
        {
            return UnitOfWork.KorisnikRepository.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}