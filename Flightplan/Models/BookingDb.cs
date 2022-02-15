using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Flightplan.Models
{
    public class BookingDb : DbContext
    {
        public BookingDb(DbContextOptions<BookingDb> options)
        : base(options) { }
        public DbSet<Plane> Planes => Set<Plane>();
        public DbSet<Passenger> Passengers => Set<Passenger>();
    }
}
