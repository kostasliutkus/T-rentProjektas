using Microsoft.EntityFrameworkCore;
using T_rent_api.Data;
using T_rent_api.Models;

namespace T_rent_api.Repositories;

public class AccommodationRepository
{
    private readonly TrentDataContext _dataContext;

    public AccommodationRepository(TrentDataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public async Task<IEnumerable<Accommodation>> GetAccommodationsAsync(int idR)
    {
        return await _dataContext.Set<Accommodation>()
            .Where(a=> a.RenterID == idR)
            .ToListAsync();
    }
    public async Task<Accommodation> GetAccommodationAsync(int id,int idR)
    {
        var accommodation = await _dataContext.Set<Accommodation>()
            .FirstOrDefaultAsync(a => a.RenterID == idR && a.Id == id);
        return accommodation;
    }
    public async Task<Accommodation> AddAccommodationAsync(Accommodation accommodation,int idR)
    {
        var toAdd = accommodation;
        accommodation.RenterID = idR;
        _dataContext.Set<Accommodation>().Add(toAdd);
        await _dataContext.SaveChangesAsync();
        return toAdd;
    }

    public async Task<bool> UpdateAccommodationAsync(Accommodation accommodation)
    {
        var AccommodationToUpdate = await _dataContext.Accommodations.FirstOrDefaultAsync(o => o.Id == accommodation.Id);
        if (AccommodationToUpdate == null)
        {
            return false;
        }   
        //here assign changes
        AccommodationToUpdate.Location = accommodation.Location;
        AccommodationToUpdate.Instructions = accommodation.Instructions;
        try
        {
            await _dataContext.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            throw;
            return false;
        }
        
    }
    public async Task<bool> DeleteAccommodationAsync(int id)
    {
        var srchResult = await _dataContext.Accommodations.FindAsync(id);
        if (srchResult == null)
            return false;
        _dataContext.Accommodations.Remove(srchResult);
        await _dataContext.SaveChangesAsync();
        return true;
    }
}