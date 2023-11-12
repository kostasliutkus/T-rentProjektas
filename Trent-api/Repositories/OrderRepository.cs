using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using T_rent_api.Data;
using T_rent_api.Models;

namespace T_rent_api.Repositories;

public class OrderRepository
{
    private readonly TrentDataContext _dataContext;

    public OrderRepository(TrentDataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public async Task<IEnumerable<Order>> GetOrdersAsync(int rId,int aId)
    {
        return await _dataContext.Set<Order>()
            .Where(o=>o.AccommodationID == aId)
            .Where(o => o.RenterID == rId)
            .ToListAsync();
    }
    public async Task<Order> GetOrderAsync(int idR,int idA, int id)
    {
        var order =  await _dataContext.Set<Order>()
            .FirstOrDefaultAsync(o => o.AccommodationID == idA && o.RenterID == idR && o.Id == id);
        return order;
    }
    public async Task<Order> AddOrderAsync(Order order,int idR, int idA)
    {
        var toAdd = order;
        toAdd.AccommodationID = idA;
        toAdd.RenterID = idR;
        _dataContext.Set<Order>().Add(toAdd);
        await _dataContext.SaveChangesAsync();
        return toAdd;
    }

    public async Task UpdateOrderAsync(Order order,int idR, int idA)
    {
        //var orderToUpdate = await _dataContext.Orders.FirstOrDefaultAsync(o => o.Id == order.Id && o.AccommodationID ==idA && o.RenterID ==idR);
        _dataContext.Orders.Update(order);
        await _dataContext.SaveChangesAsync();
        // var orderToUpdate = await _dataContext.Orders.FirstOrDefaultAsync(o => o.Id == order.Id && o.AccommodationID ==idA && o.RenterID ==idR);
        // if (orderToUpdate == null)
        // {
        //     return false;
        // }
        // orderToUpdate.LeaseEndDate = order.LeaseEndDate;
        // orderToUpdate.LeaseStartDate = order.LeaseStartDate;
        // orderToUpdate.Price = order.Price;
        //
        // try
        // {
        //     await _dataContext.SaveChangesAsync();
        //     return true;
        // }
        // catch (Exception ex)
        // {
        //     throw;
        //     return false;
        // }
        
    }

    public async Task<bool> DeleteOrderAsync(int id,int idR,int idA)
    {
        var srchResult = await _dataContext.Orders.FirstOrDefaultAsync(o=>o.Id ==id && o.AccommodationID == idA && o.RenterID == idR);
        if (srchResult == null)
            return false;
        _dataContext.Orders.Remove(srchResult);
        await _dataContext.SaveChangesAsync();
        return true;
    }
}