﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Station
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public double XCoordinate { get; set; }

        public double YCoordinate { get; set; }

        public long Version { get; set; }

    }
}