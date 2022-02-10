namespace Flightplan.Models
{
    public class Passenger
    {
        public long Id { get; set; }
        public int PlaneId { get; set; }
        public int Place { get; set; }
        public string? PasportId { get; set; }
    }
}
