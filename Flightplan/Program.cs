using Flightplan.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddDbContext<BookingDb>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("BookingDb")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();
app.MapGet("/", () => "Hello World!");

app.MapGet("/Planes", async (BookingDb db) =>
    await db.Planes.ToListAsync());
app.MapGet("/Passengers", async (BookingDb db) =>
    await db.Passengers.ToListAsync());
app.MapGet("/Planes/{id}", async (long id, BookingDb db) =>
    await db.Planes.FindAsync(id)
        is Plane plane
            ? Results.Ok(plane)
            : Results.NotFound());
app.MapGet("/Planes/Passengers/{Plane}", async (int Plane, BookingDb db) =>
        await db.Passengers.Where(t => t.PlaneId == Plane).ToListAsync());


app.MapPost("/Planes", async (Plane plane, BookingDb db) =>
{
    db.Planes.Add(plane);
    await db.SaveChangesAsync();

    return Results.Created($"/Planes/{plane.Id}", plane);
});
app.MapPost("/Passengers", async (Passenger passenger, BookingDb db) =>
{
    db.Passengers.Add(passenger);
    await db.SaveChangesAsync();

    return Results.Created($"/Planes/{passenger.Id}", passenger);
});
app.MapPut("/Planes/{id}", async (long id, Plane inputPlane, BookingDb db) =>
{
    var plane = await db.Planes.FindAsync(id);

    if (plane is null) return Results.NotFound();

    plane.PlaneId = inputPlane.PlaneId;
    plane.ToWhere = inputPlane.ToWhere;
    plane.FromWhere = inputPlane.FromWhere;
    plane.Time = inputPlane.Time;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/Planes/{id}", async (long id, BookingDb db) =>
{
    if (await db.Planes.FindAsync(id) is Plane plane)
    {
        var pasangers=db.Passengers.Where(t => t.PlaneId == id).ToList();
        foreach (var item in pasangers)
        {
            db.Remove(item);
        }
        db.Planes.Remove(plane);
        await db.SaveChangesAsync();
        return Results.Ok(plane);
    }

    return Results.NotFound();
});
app.UseDefaultFiles();
app.UseStaticFiles();



app.Run();

