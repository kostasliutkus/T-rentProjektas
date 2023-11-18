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

[Route("api/Renters")]
public class RenterController : ControllerBase
{
    private readonly RenterRepository _renterRepo;
    private readonly IAuthorizationService _authorizationService;

    public RenterController(RenterRepository renterRepo,IAuthorizationService authorizationService)
    {
        _renterRepo = renterRepo;
        _authorizationService = authorizationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetRenters()
    {
        var renters = await _renterRepo.GetRentersAsync();
        if (renters == null)
            return StatusCode(500);
        return Ok(renters);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRenter(int id)
    {
        var renter = await _renterRepo.GetRenterAsync(id);
        if (renter == null)
            return NotFound();
        return Ok(renter);
    }

    [HttpPost]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> AddRenter(CreateRenterDto renRequest)
    {
        if (renRequest == null)
        {
            return StatusCode(400);
        }
        var renter = new Renter
        {
            FirstName = renRequest.FirstName,
            LastName = renRequest.LastName,
            Organization = renRequest.Organization,
            Age = renRequest.Age,
            Email = renRequest.Email,
            Phone = renRequest.Phone,
            UserId =User.FindFirstValue(JwtRegisteredClaimNames.Sub)
        };
         
        await _renterRepo.AddRenterAsync(renter);
        return Created("", new RenterDto(renter.Id, renter.FirstName, renter.LastName,renter.Organization, renter.Age,renter.Email, renter.Phone));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> ChangeRenter(int id, UpdateRenterDto RenterToUpdate)
    {
        var renter = await _renterRepo.GetRenterAsync(id);

        if (renter == null)
            return NotFound();
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, renter, PolicyNames.ResourceOwner);
        if (!authorizationResult.Succeeded)
        {
            //404
            //return NotFound();
            return Forbid();
        }
        renter.FirstName = RenterToUpdate.FirstName;
        renter.LastName = RenterToUpdate.LastName;
        renter.Organization = RenterToUpdate.Organization;
        renter.Age = RenterToUpdate.Age;
        renter.Email = RenterToUpdate.Email;
        renter.Phone = RenterToUpdate.Phone;
        
        await _renterRepo.UpdateRenterAsync(renter);

        return Ok(new RenterDto(renter.Id, renter.FirstName, renter.LastName, renter.Organization, renter.Age,
            renter.Email, renter.Phone));
        // RenterToUpdate.Id = id;
        // var authorizationResult = await _authorizationService.AuthorizeAsync(User, RenterToUpdate, PolicyNames.ResourceOwner);
        // if (!authorizationResult.Succeeded)
        // {
        //     //404
        //     //return NotFound();
        //     return Forbid();
        // }
        // if (await _renterRepo.UpdateRenterAsync(RenterToUpdate))
        // {
        //     return NoContent();
        // }
        // return StatusCode(500);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> DeleteRenter(int id)
    {
        var result = await _renterRepo.GetRenterAsync(id);
        if (result == null)
        {
            return NotFound();
        }
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, result, PolicyNames.ResourceOwner);
        if (!authorizationResult.Succeeded)
        {
            //404
            //return NotFound();
            return Forbid();
        }

        await _renterRepo.DeleteRenterAsync(id);
        return NoContent();
    }
}