using System.Collections.Immutable;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using T_rent_api.Auth;
using T_rent_api.Auth.Model;
using T_rent_api.Data;
using T_rent_api.Repositories;


var builder = WebApplication.CreateBuilder(args);

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
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
builder.Services.AddScoped<AccommodationRepository>();
builder.Services.AddScoped<RenterRepository>();

builder.Services.AddTransient<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<AuthDbSeeder>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(PolicyNames.ResourceOwner, policy => policy.Requirements.Add(new ResourceOwnerRequirement()));
});
builder.Services.AddSingleton<IAuthorizationHandler, ResourceOwnerAuthorizationHandler>();

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//add cors policy
// builder.Services.AddCors(opt =>
// {
//     opt.AddPolicy(name: "CorsPolicy", Builder =>
//     {
//         Builder.WithOrigins("http://localhost:4200")
//             .AllowAnyHeader()
//             .AllowAnyMethod()
//             .AllowCredentials();
//     });
// });

var app = builder.Build();



//app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();
//add database context
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<TrentDataContext>();
    dataContext.Database.Migrate();
    var dbSeeder = scope.ServiceProvider.GetRequiredService<AuthDbSeeder>();
    await dbSeeder.SeedAsync();
}

app.Run();
