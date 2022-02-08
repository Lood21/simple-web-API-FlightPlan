#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Flightplan.Models;

namespace Flightplan.Controllers
{
    public class FlightplanController : Controller
    {
        private readonly PlaneDb _context;


        public FlightplanController(PlaneDb context)
        {
            _context = context;
        }
    }
}
