﻿using System;
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
    public class KartasController : ApiController
    {
        public IUnitOfWork UnitOfWork { get; set; }

        public KartasController(IUnitOfWork unitOfWork)
        {

            UnitOfWork = unitOfWork;
        }

        // GET: api/Kartas
        public IQueryable<Karta> GetKarta()
        {
            return UnitOfWork.KartaRepository.GetAll().AsQueryable();
        }

        // GET: api/Kartas/5
        [ResponseType(typeof(Karta))]
        public IHttpActionResult GetKarta(int id)
        {
            Karta karta = UnitOfWork.KartaRepository.Get(id);
            if (karta == null)
            {
                return NotFound();
            }

            return Ok(karta);
        }

        // PUT: api/Kartas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKarta(int id, Karta karta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != karta.Id)
            {
                return BadRequest();
            }

            UnitOfWork.KartaRepository.Entry(karta, EntityState.Modified);

            try
            {
                UnitOfWork.KartaRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KartaExists(id))
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

        // POST: api/Kartas
        [ResponseType(typeof(Karta))]
        public IHttpActionResult PostKarta(Karta karta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.KartaRepository.Add(karta);
            UnitOfWork.KartaRepository.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = karta.Id }, karta);
        }

        // DELETE: api/Kartas/5
        [ResponseType(typeof(Karta))]
        public IHttpActionResult DeleteKarta(int id)
        {
            Karta karta = UnitOfWork.KartaRepository.Get(id);
            if (karta == null)
            {
                return NotFound();
            }

            UnitOfWork.KartaRepository.Remove(karta);
            UnitOfWork.KartaRepository.SaveChanges();
            
            return Ok(karta);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.KartaRepository.Dispose();
            }
            base.Dispose(disposing);

        }

        private bool KartaExists(int id)
        {
            return UnitOfWork.KartaRepository.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}