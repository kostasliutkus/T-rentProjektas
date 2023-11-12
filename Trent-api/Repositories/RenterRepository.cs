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

    public async Task<bool> UpdateRenterAsync(Renter renter)
    {
        var renterToUpdate = await _dataContext.Renters.FirstOrDefaultAsync(o => o.Id == renter.Id);
        if (renterToUpdate == null)
        {
            return false;
        }   
        //here assign changes
        renterToUpdate.FirstName = renter.FirstName;
        renterToUpdate.LastName = renter.LastName;
        renterToUpdate.Organization = renter.Organization;
        renterToUpdate.age = renter.age;
        renterToUpdate.Email = renter.Email;
        renterToUpdate.Phone = renter.Phone;
        
        try
        {
            await _dataContext.SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            throw;
        }
        
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