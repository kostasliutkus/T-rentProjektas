using Microsoft.EntityFrameworkCore;
using T_rent_api.Data;
using T_rent_api.Models;

namespace T_rent_api.Repositories;

public class RenterRepository
{
    private readonly TrentDataContext _dataContext;

    public RenterRepository(TrentDataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public async Task<IEnumerable<Renter>> GetRentersAsync()
    {
        return await _dataContext.Set<Renter>().ToListAsync();
    }
    public async Task<Renter> GetRenterAsync(int id)
    {
        return await _dataContext.Set<Renter>().FindAsync(id);
    }
    public async Task<Renter> AddRenterAsync(Renter renter)
    {
        _dataContext.Set<Renter>().Add(renter);
        await _dataContext.SaveChangesAsync();
        return renter;
    }

    public async Task UpdateRenterAsync(Renter renter)
    {
        _dataContext.Renters.Update(renter);
        await _dataContext.SaveChangesAsync();
    }
    public async Task<bool> DeleteRenterAsync(int id)
    {
        var srchResult = await _dataContext.Renters.FindAsync(id);
        if (srchResult == null)
            return false;
        _dataContext.Renters.Remove(srchResult);
        await _dataContext.SaveChangesAsync();
        return true;
    }
}