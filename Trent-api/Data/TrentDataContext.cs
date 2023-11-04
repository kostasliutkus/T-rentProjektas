using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using T_rent_api.Auth.Model;
using T_rent_api.Models;

namespace T_rent_api.Data;

public class TrentDataContext : IdentityDbContext<TrentRestUser>
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Order>().ToTable("Order");
        modelBuilder.Entity<Renter>().ToTable("Renter");
        modelBuilder.Entity<Accommodation>().ToTable("Accommodation");
        // Other configurations
    }
    public TrentDataContext(DbContextOptions<TrentDataContext> options) : base(options) { }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Accommodation> Accommodations { get; set; }
    public DbSet<Renter> Renters { get; set; }
}