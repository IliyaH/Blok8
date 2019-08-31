using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class PayPal
    {
        public int Id { get; set; }
        public string TransactionId { get; set; }
        public string PayerId { get; set; }
        public string PayerEmail { get; set; }

        [ForeignKey("Ticket")]
        public int IdTicket { get; set; }
        public Ticket Ticket { get; set; }
    }
}