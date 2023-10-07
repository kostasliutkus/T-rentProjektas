﻿using Microsoft.AspNetCore.Mvc;
using T_rent_api.Models;
using T_rent_api.Repositories;

namespace T_rent_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly OrderRepository _OrderRepo;

    public OrderController(OrderRepository OrderRepo)
    {
        _OrderRepo = OrderRepo;
    }

    [HttpGet("GetOrders")]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _OrderRepo.GetOrdersAsync();
        return Ok(orders);
    }

    [HttpGet("GetOrder/{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _OrderRepo.GetOrderAsync(id);
        return Ok(order);
    }

    [HttpPost("AddOrder")]
    public async Task<IActionResult> AddOrder([FromBody] Order ordRequest)
    {
        var order = await _OrderRepo.AddOrderAsync(ordRequest);
        return CreatedAtAction(nameof(GetOrder), new {id = order.Id}, order);
    }

    [HttpDelete("DeleteOrder/{Id}")]
    public async Task<IActionResult> DeleteOrder([FromBody] int Id)
    {
        var result = await _OrderRepo.DeleteOrderAsync(Id);
        if (result == false)
        {
            return NotFound(new { message = "Order not found" });
        }
        return NoContent();
    }
}