using System.Collections.Immutable;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using T_rent_api.Auth;
using T_rent_api.Auth.Model;
using T_rent_api.Data;
using T_rent_api.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();



//Add authentication
builder.Services.AddIdentity<TrentRestUser, IdentityRole>()
    .AddEntityFrameworkStores<TrentDataContext>()
    .AddDefaultTokenProviders();



builder.Services.AddAuthentication(opt =>
    {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"];
        opt.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"];
        opt.TokenValidationParameters.IssuerSigningKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]));
    });
//Add database connection
builder.Services.AddDbContext<TrentDataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("LocalConnection")));
builder.Services.AddScoped<OrderRepository>();
builder.Services.AddScoped<RenterRepository>();
builder.Services.AddScoped<AccommodationRepository>();

builder.Services.AddTransient<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<AuthDbSeeder>();

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
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();
app.Services.CreateScope().ServiceProvider.GetRequiredService<AuthDbSeeder>();

app.Run();