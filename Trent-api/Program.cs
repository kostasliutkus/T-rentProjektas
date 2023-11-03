using System.Collections.Immutable;
using Microsoft.EntityFrameworkCore;
using T_rent_api.Data;
using T_rent_api.Repositories;

var builder = WebApplication.CreateBuilder(args);

//Add database connection
builder.Services.AddDbContext<TrentDataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<OrderRepository>();
builder.Services.AddScoped<RenterRepository>();
builder.Services.AddScoped<AccommodationRepository>();
// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//add cors policy
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: "CorsPolicy", Builder =>
    {
        Builder.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

//add database context
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<TrentDataContext>();
    dataContext.Database.Migrate();
}
// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.
//     app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();