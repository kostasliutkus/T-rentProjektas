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

    public async Task<bool> DeleteOrderAsync(int Id)
    {
        var srchResult = await _dataContext.Orders.FindAsync(Id);
        if (srchResult == null)
            return false;
        _dataContext.Orders.Remove(srchResult);
        await _dataContext.SaveChangesAsync();
        return true;
    }
}