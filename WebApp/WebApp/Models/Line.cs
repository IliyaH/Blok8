using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Line
    {
        public int Id { get; set; }

        public string LineName { get; set; }

        public LineType LineType { get; set; }

        public long Version { get; set; }

    }
}