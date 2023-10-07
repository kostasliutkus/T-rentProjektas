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
    public async Task<IEnumerable<Order>> GetOrdersAsync()
    {
        return await _dataContext.Set<Order>().ToListAsync();
    }
    public async Task<Order> GetOrderAsync(int id)
    {
        return await _dataContext.Set<Order>().FindAsync(id);
    }
    public async Task<Order> AddOrderAsync(Order order)
    {
        _dataContext.Set<Order>().Add(order);
        await _dataContext.SaveChangesAsync();
        return order;
    }

    public async Task<bool> UpdateOrderAsync(Order order)
    {
        var orderToUpdate = await _dataContext.Orders.FirstOrDefaultAsync(o => o.Id == order.Id);
        if (orderToUpdate == null)
        {
            return false;
        }
        orderToUpdate.LeaseEndDate = order.LeaseEndDate;
        orderToUpdate.LeaseStartDate = order.LeaseStartDate;
        orderToUpdate.Price = order.Price;

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

    public async Task<bool> DeleteOrderAsync(int id)
    {
        var srchResult = await _dataContext.Orders.FindAsync(id);
        if (srchResult == null)
            return false;
        _dataContext.Orders.Remove(srchResult);
        await _dataContext.SaveChangesAsync();
        return true;
    }
}