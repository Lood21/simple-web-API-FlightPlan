using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Flightplan.Models
{
    public class PassengerDb : DbContext
    {
        public PassengerDb(DbContextOptions<PassengerDb> options)
        : base(options) { }
        public DbSet<Passenger> Passengers => Set<Passenger>();
    }
}
