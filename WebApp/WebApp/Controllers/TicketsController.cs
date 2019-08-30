using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
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
    [RoutePrefix("api/Tickets")]
    public class TicketsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        private readonly IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;
        public TicketsController(ApplicationUserManager userManager, IUnitOfWork uw)
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

        [Route("GetTicket")]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult GetTicket(int id)
        {
            if(UnitOfWork.TicketRepository.CheckTicket(id))
            {
                UnitOfWork.TicketRepository.SaveChanges();
                return Ok(200);
            }
            else
            {
                UnitOfWork.TicketRepository.SaveChanges();
                return Ok(204);
            }
        }

        // GET: api/Tikets/CalculatePrice
        [Route("CalculatePrice")]
        [ResponseType(typeof(double))]
        public IHttpActionResult GetCena(TicketType ticketType, UserType userType)
        {
            return Ok(UnitOfWork.TicketRepository.CalculatePrice(ticketType, userType));

        }

        [Route("Add")]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(string[] p)
        {
            var temp = Enum.Parse(typeof(TicketType), p[1]);
            int IdPricelistItem = UnitOfWork.PricelistRepository.getPricelistsItem((TicketType)temp);

            Ticket ticket = new Ticket()
            {
                Valid = true,
                IssueDate = DateTime.Now,
                Price = double.Parse(p[0]),
                IdPricelistItem = IdPricelistItem,
                IdApplicationUser = null
            };

            if (p[2] != null)
            {
                ticket.IdApplicationUser =UnitOfWork.PricelistRepository.getIdByEmail(p[2]);
            }
            UnitOfWork.TicketRepository.Add(ticket);
            UnitOfWork.Complete();
            if(p[2] == null)
            {
                //Poslati jos i tip karte i cenu
                EmailHelper.SendEmail(p[3], "Buying Ticket", "You have successfully bought a ticket with ID: " + ticket.Id);
            }

            return Ok(ticket.Id);

        }


        /*[Route("GetTicketTypes")]
        //GET: api/Tickets
        public IEnumerable<TicketType> GetTicketTypes()
        {
            return unitOfWork.TicketTypes.GetAll().ToList();
        }*/

        // GET: api/Tickets
        //public IQueryable<Ticket> GetTickets()
        //{
        //    return db.Tickets;
        //}

        //// GET: api/Tickets/5
        //[ResponseType(typeof(Ticket))]
        //public IHttpActionResult GetTicket(int id)
        //{
        //    Ticket ticket = db.Tickets.Find(id);
        //    if (ticket == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(ticket);
        //}

        //// PUT: api/Tickets/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutTicket(int id, Ticket ticket)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != ticket.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(ticket).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TicketExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST: api/Tickets
        /*[ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Ticket t = new Ticket();
                t.PurchaseTime = ticket.PurchaseTime;
                t.TicketPricesId = unitOfWork.TicketPrices.Get(ticket.TicketPricesId).Id;
                t.TicketTypeId = unitOfWork.TicketTypes.Get((int)ticket.TicketTypeId).Id;
                t.Name = "Karta";
                t.ApplicationUserId = UserManager.FindById(ticket.ApplicationUserId).Id;

                unitOfWork.Tickets.Add(ticket);
                unitOfWork.Complete();
                return Ok(t.Id);
            }
            catch (Exception ex)
            {
                return NotFound();
            }


        }*/

        //// DELETE: api/Tickets/5
        //[ResponseType(typeof(Ticket))]
        //public IHttpActionResult DeleteTicket(int id)
        //{
        //    Ticket ticket = db.Tickets.Find(id);
        //    if (ticket == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Tickets.Remove(ticket);
        //    db.SaveChanges();

        //    return Ok(ticket);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.Count(e => e.Id == id) > 0;
        }
    }
}
