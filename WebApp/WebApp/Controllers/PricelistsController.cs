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

namespace WebApp.Controllers
{
    [RoutePrefix("api/Pricelist")]
    public class PricelistsController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();

        private readonly IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;
        public PricelistsController(ApplicationUserManager userManager, IUnitOfWork uw)
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

        // GET: api/Pricelists
        public IQueryable<Pricelist> GetPricelists()
        {
            return UnitOfWork.PricelistRepository.GetAll().AsQueryable();
        }

        [Route("GetActivePricelists")]
        //[ResponseType(typeof(Tuple<Pricelist, List<double>>))]
        public IHttpActionResult GetActivePricelists()
        {
            List<object> ret = new List<object>();
            ret.Add(UnitOfWork.PricelistRepository.getPrices().Item1);
            ret.Add(UnitOfWork.PricelistRepository.getPrices().Item2);
            return Ok(ret);
        }

        // GET: api/Pricelists/5
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult GetPricelist(int id)
        {
            Pricelist pricelist = UnitOfWork.PricelistRepository.Get(id);
            if (pricelist == null)
            {
                return NotFound();
            }

            return Ok(pricelist);
        }

        // PUT: api/Pricelists/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPricelist(int id, Pricelist pricelist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pricelist.Id)
            {
                return BadRequest();
            }

            UnitOfWork.PricelistRepository.Entry(pricelist, EntityState.Modified);

            try
            {
                UnitOfWork.PricelistRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PricelistExists(id))
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

        // POST: api/Pricelists
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult PostPricelist(Pricelist pricelist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.PricelistRepository.Add(pricelist);
            UnitOfWork.PricelistRepository.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pricelist.Id }, pricelist);
        }

        // POST: api/Pricelists
        [Route("EditPricelist")]
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult EditPricelist(int id,double timeTicket,double dayTicket,double monthTicket,double yearTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.PricelistRepository.editPricelist(id, timeTicket, dayTicket, monthTicket, yearTicket);
            UnitOfWork.PricelistRepository.SaveChanges();

            return Ok(id);
        }

        // DELETE: api/Pricelists/5
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult DeletePricelist(int id)
        {
            Pricelist pricelist = UnitOfWork.PricelistRepository.Get(id);
            if (pricelist == null)
            {
                return NotFound();
            }

            UnitOfWork.PricelistRepository.Remove(pricelist);
            UnitOfWork.PricelistRepository.SaveChanges();


            return Ok(pricelist);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PricelistExists(int id)
        {
            return UnitOfWork.PricelistRepository.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}