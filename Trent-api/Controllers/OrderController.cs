using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using T_rent_api.Models;
using T_rent_api.Repositories;

namespace T_rent_api.Controllers;

[ApiController]
[Route("api/Renters/{idR}/Accommodations/{idA}/Orders")]
public class OrderController : ControllerBase
{
    private readonly OrderRepository _OrderRepo;

    public OrderController(OrderRepository OrderRepo)
    {
        _OrderRepo = OrderRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders(int idR, int idA)
    {
        var orders = await _OrderRepo.GetOrdersAsync(idR,idA);
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int idR, int idA,int id)
    {
        var order = await _OrderRepo.GetOrderAsync(idR,idA,id);
        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrder([FromBody] Order ordRequest,int idR,int idA)
    {
        var order = await _OrderRepo.AddOrderAsync(ordRequest,idR,idA);
        order.RenterID = idR;
        order.AccommodationID = idA;
        return Ok(order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ChangeOrder(int id, [FromBody] Order orderToUpdate)
    {
        orderToUpdate.Id = id;
        if (await _OrderRepo.UpdateOrderAsync(orderToUpdate))
        {
            return NoContent();
        }
        else
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var result = await _OrderRepo.DeleteOrderAsync(id);
        if (result == false)
        {
            return NotFound(new { message = "Order not found" });
        }
        return NoContent();
    }
}