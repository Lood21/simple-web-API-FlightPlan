using Microsoft.EntityFrameworkCore;
using Flightplan.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<PlaneDb>(opt => opt.UseInMemoryDatabase("PlaneList"));
builder.Services.AddDbContext<PassengerDb>(opt => opt.UseInMemoryDatabase("PassengerList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/Planes", async (PlaneDb db) =>
    await db.Planes.ToListAsync());
app.MapGet("/Passengers", async (PassengerDb db) =>
    await db.Passengers.ToListAsync());

app.MapGet("/Planes/complete", async (PlaneDb db) =>
    await db.Planes.Where(t => t.IsComplete).ToListAsync());

app.MapGet("/Planes/{id}", async (int id, PlaneDb db) =>
    await db.Planes.FindAsync(id)
        is Plane plane
            ? Results.Ok(plane)
            : Results.NotFound());
app.MapGet("/Planes/Passengers/{Plane}", async (int Plane, PassengerDb db) =>
        await db.Passengers.Where(t=>t.PlaneId==Plane).ToListAsync());


app.MapPost("/Planes", async (Plane plane, PlaneDb db) =>
{
    db.Planes.Add(plane);
    await db.SaveChangesAsync();

    return Results.Created($"/Planes/{plane.Id}", plane);
});
app.MapPost("/Passengers", async (Passenger passenger, PassengerDb db) =>
{
    db.Passengers.Add(passenger);
    await db.SaveChangesAsync();

    return Results.Created($"/Planes/{passenger.Id}", passenger);
});


app.MapPut("/Planems/{id}", async (int id, Plane inputPlane, PlaneDb db) =>
{
    var plane = await db.Planes.FindAsync(id);

    if (plane is null) return Results.NotFound();

    plane.PlaneId = inputPlane.PlaneId;
    plane.IsComplete = inputPlane.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/Planes/{id}", async (long id, PlaneDb db) =>
{
    if (await db.Planes.FindAsync(id) is Plane plane)
    {
        db.Planes.Remove(plane);
        await db.SaveChangesAsync();
        return Results.Ok(plane);
    }

    return Results.NotFound();
});
app.UseDefaultFiles();
app.UseStaticFiles();



app.Run();
