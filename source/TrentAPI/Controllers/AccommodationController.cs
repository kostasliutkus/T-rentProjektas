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
[Route("api/Renters/{idR}/Accommodations")]
public class AccommodationController : ControllerBase
{
    private readonly AccommodationRepository _AccommodationRepo;
    private readonly IAuthorizationService _authorizationService;
    
    public AccommodationController(AccommodationRepository AccommodationRepo,IAuthorizationService _authorizaitonService)
    {
        _AccommodationRepo = AccommodationRepo;
        _authorizationService = _authorizaitonService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAccommodations(int idR)
    {
        var accommodations = await _AccommodationRepo.GetAccommodationsAsync(idR);
        if (accommodations == null)
            return StatusCode(500);
        return Ok(accommodations);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAccommodation(int id,int idR)
    {
            var accommodation = await _AccommodationRepo.GetAccommodationAsync(id,idR);
            if (accommodation == null)
                return NotFound();
            return Ok(accommodation); 
    }

    [HttpPost]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> AddAccommodation(CreateAccommodationDto accRequest,int idR)
    {
        // var accommodation = await _AccommodationRepo.AddAccommodationAsync(accRequest,idR);
        // if (accommodation == null)
        // {
        //     return StatusCode(400);
        // }
        // accommodation.RenterID = idR;
        // return Ok(accommodation);
        if (accRequest == null)
        {
            return StatusCode(400);
        }
        var accommodation = new Accommodation
        {
            Instructions = accRequest.Instructions,
            Location = accRequest.Location,
            RenterID = idR,
            UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
        };
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, accommodation, PolicyNames.ResourceOwner);
        if (!authorizationResult.Succeeded)
        {
            //404
            //return NotFound();
            return Forbid();
        }
        await _AccommodationRepo.AddAccommodationAsync(accommodation, idR);
        return Created("",
            new AccommodationDto(accommodation.Id, accommodation.Instructions, accommodation.Location,
                accommodation.RenterID));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> ChangeAccommodation(int id, UpdateAccommodationDto accommodationToUpdate,int idR)
    {
        var accommodation = await _AccommodationRepo.GetAccommodationAsync(id, idR);

        if (accommodation == null)
            return NotFound();
        // var authorizationResult = await _authorizationService.AuthorizeAsync(User, accommodation, PolicyNames.ResourceOwner);
        // if (!authorizationResult.Succeeded)
        // {
        //     //404
        //     //return NotFound();
        //     return Forbid();
        // }
        if (User.IsInRole(TrentRoles.Admin) && User.FindFirstValue(JwtRegisteredClaimNames.Sub) != accommodation.UserId)
        {
            return Forbid();
        }
        accommodation.Location = accommodationToUpdate.Location;
        accommodation.Instructions = accommodationToUpdate.Instructions;

        await _AccommodationRepo.UpdateAccommodationAsync(accommodation, idR);
        
        return Ok(new AccommodationDto(accommodation.Id,accommodation.Instructions,accommodation.Location,accommodation.RenterID));
        // accommodationToUpdate.Id = id;
        //
        // if (await _AccommodationRepo.UpdateAccommodationAsync(accommodationToUpdate,idR))
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
    public async Task<IActionResult> DeleteAccommodation(int id,int idR)
    {
        var result = await _AccommodationRepo.GetAccommodationAsync(id, idR);
        if (result == null)
        {
            return NotFound();
        }
        // var authorizationResult = await _authorizationService.AuthorizeAsync(User, result, PolicyNames.ResourceOwner);
        // if (!authorizationResult.Succeeded)
        // {
        //     //404
        //     //return NotFound();
        //     return Forbid();
        // }
        if (User.IsInRole(TrentRoles.Admin) && User.FindFirstValue(JwtRegisteredClaimNames.Sub) != result.UserId)
        {
            return Forbid();
        }
        await _AccommodationRepo.DeleteAccommodationAsync(id,idR);
        return NoContent();
        // var result = await _AccommodationRepo.DeleteAccommodationAsync(id,idR);
        // if (result == false)
        // {
        //     return NotFound(new { message = "Accommodation not found" });
        // }
        // return NoContent();
    }
}