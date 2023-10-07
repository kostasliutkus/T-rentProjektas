using Microsoft.EntityFrameworkCore;
using T_rent_api.Models;

namespace T_rent_api.Data;

public class TrentDataContext : DbContext
{
    public TrentDataContext(DbContextOptions<TrentDataContext> options) : base(options)
    {
        
    }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Accomodation> Accomodations { get; set; }
    public DbSet<Renter> Renters { get; set; }
}