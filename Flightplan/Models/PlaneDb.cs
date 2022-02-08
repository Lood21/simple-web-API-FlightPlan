using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Flightplan.Models
{
    public class PlaneDb:DbContext
    {
        public PlaneDb(DbContextOptions<PlaneDb> options)
        : base(options) { }

        public DbSet<Plane> Planes => Set<Plane>();
    }
}
