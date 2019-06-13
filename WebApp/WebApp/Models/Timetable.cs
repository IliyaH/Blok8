using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Timetable
    {
        public int Id { get; set; }

        public string Departures { get; set; }

        [ForeignKey("Line")]
        public int IdLine { get; set; }
        public Line Line { get; set; }

        [ForeignKey("Day")]
        public int IdDay { get; set; }
        public Day Day { get; set; }

        [ForeignKey("TimetableActive")]
        public int IdTimetableActive { get; set; }
        public TimetableActive TimetableActive { get; set; }
    }
}