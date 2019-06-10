using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Coefficient
    {
        public int Id { get; set; }
        public UserType UserType { get; set; }
        public double Coef { get; set; }
    }
}