namespace Flightplan.Models
{
    public class Plane
    {
        public long Id { get; set; }
        public string? PlaneId { get; set; }
        public string? FromWhere { get; set; }
        public string? ToWhere { get; set; }
        public string? Time { get; set; }
        public bool IsComplete { get; set; }
    }
}
