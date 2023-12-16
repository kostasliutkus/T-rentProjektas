using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRentAPI.Auth.Model;
using TRentAPI.Dtos;
using TRentAPI.Models;
using TRentAPI.Repositories;

namespace TRentAPI.Controllers;

[ApiController]
[Route("api/Renters/{idR}/Accommodations/{idA}/Orders")]

public class OrderController : ControllerBase
{
    private readonly OrderRepository _orderRepo;
    private readonly IAuthorizationService _authorizationService;

    public OrderController(OrderRepository orderRepo,IAuthorizationService authorizationService)
    {
        _orderRepo = orderRepo;
        _authorizationService=authorizationService;
    }

    [HttpGet]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> GetOrders(int idR, int idA)
    {
        var orders = await _orderRepo.GetOrdersAsync(idR,idA);
        if (orders == null)
            return StatusCode(500);
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, orders.FirstOrDefault(), PolicyNames.ResourceOwner);
        if (!authorizationResult.Succeeded)
        {
            //404
            //return NotFound();
            return Forbid();
        }
        return Ok(orders);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> GetOrder(int idR, int idA,int id)
    {
        var order = await _orderRepo.GetOrderAsync(idR,idA,id);
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, order, PolicyNames.ResourceOwner);
        if (!authorizationResult.Succeeded)
        {
            //404
            //return NotFound();
            return Forbid();
        }
        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }

    [HttpPost]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> AddOrder(CreateOrderDto ordRequest,int idR,int idA)
    {
        if (ordRequest == null)
        {
            return StatusCode(400);
        }
        var order = new Order
        {
            RenterID=idR,
            AccommodationID=idA,
            CreationDate = DateTime.UtcNow,
            LeaseStartDate = ordRequest.LeaseStartDate,
            LeaseEndDate = ordRequest.LeaseEndDate,
            Price = ordRequest.Price,
            UserId =User.FindFirstValue(JwtRegisteredClaimNames.Sub)
        };
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, order, PolicyNames.ResourceOwner);
        if (!authorizationResult.Succeeded)
        {
            //404
            //return NotFound();
            return Forbid();
        }
        await _orderRepo.AddOrderAsync(order,idR,idA);
        return Created("",
            new OrderDto(order.Id, order.CreationDate, order.LeaseStartDate, order.LeaseEndDate, order.Price, order.AccommodationID,
                order.RenterID));
        // var order = await _orderRepo.AddOrderAsync(ordRequest,idR,idA);
        // if (order == null)
        // {
        //     return StatusCode(400);
        // }
        // order.RenterID = idR;
        // order.AccommodationID = idA;
        // return Ok(order);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> ChangeOrder(int id, UpdateOrderDto orderToUpdate,int idR,int idA)
    {
        var order = await _orderRepo.GetOrderAsync(idR, idA, id);
        if (order == null)
            return NotFound();
        
        // var authorizationResult = await _authorizationService.AuthorizeAsync(User, order, PolicyNames.ResourceOwner);
        // if (!authorizationResult.Succeeded)
        // {
        //     //404
        //     //return NotFound();
        //     return Forbid();
        // }
        if (!User.IsInRole(TrentRoles.Admin) && User.FindFirstValue(JwtRegisteredClaimNames.Sub) != order.UserId)
        {
            return Forbid();
        }
        order.LeaseEndDate = orderToUpdate.LeaseEndDate;
        order.LeaseStartDate = orderToUpdate.LeaseStartDate;
        order.Price = orderToUpdate.Price;

        await _orderRepo.UpdateOrderAsync(order, idR, idA);
        
        return Ok(new OrderDto(order.Id,order.CreationDate,order.LeaseStartDate,order.LeaseEndDate,order.Price,order.AccommodationID,order.RenterID));
        // orderToUpdate.Id = id;
        // if (await _orderRepo.UpdateOrderAsync(orderToUpdate,idR,idA))
        // {
        //     return NoContent();
        // }
        // else
        // {
        //     return StatusCode(500);
        // }
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> DeleteOrder(int id,int idR,int idA)
    {
        var result = await _orderRepo.GetOrderAsync(idR,idA,id);
        if (result == null)
        {
            return NotFound(new { message = "Order not found" });
        }
        // var authorizationResult = await _authorizationService.AuthorizeAsync(User, result, PolicyNames.ResourceOwner);
        // if (!authorizationResult.Succeeded)
        // {
        //     //404
        //     //return NotFound();
        //     return Forbid();
        // }
        if (!User.IsInRole(TrentRoles.Admin) && User.FindFirstValue(JwtRegisteredClaimNames.Sub) != result.UserId)
        {
            return Forbid();
        }

        await _orderRepo.DeleteOrderAsync(id,idR,idA);
        return NoContent();
    }
    [HttpGet("api/GetOrdersByUser", Name = "GetOrdersByUser")]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> GetOrdersByUser()
    {
        try
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var orders = await _orderRepo.GetOrdersByUserAsync(userId);
            return Ok(orders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while fetching orders.");
        }
    }
}
