using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using T_rent_api.Auth.Model;
using T_rent_api.Models;
using T_rent_api.Repositories;

namespace T_rent_api.Controllers;

[ApiController]

[Route("api/Renters")]
public class RenterController : ControllerBase
{
    private readonly RenterRepository _RenterRepo;
    private readonly IAuthorizationService _authorizationService;

    public RenterController(RenterRepository renterRepo,IAuthorizationService authorizationService)
    {
        _RenterRepo = renterRepo;
        _authorizationService = authorizationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetRenters()
    {
        var renters = await _RenterRepo.GetRentersAsync();
        if (renters == null)
            return StatusCode(500);
        return Ok(renters);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRenter(int id)
    {
        var renter = await _RenterRepo.GetRenterAsync(id);
        if (renter == null)
            return NotFound();
        return Ok(renter);
    }

    [HttpPost]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> AddRenter([FromBody] Renter renRequest)
    {
        var renter = await _RenterRepo.AddRenterAsync(renRequest);
        
        if (renter == null)
        {
            return StatusCode(400);
        }
        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        renter.UserId = userId;
        return Ok(renter);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = TrentRoles.TrentUser)]
    public async Task<IActionResult> ChangeRenter(int id, [FromBody] Renter RenterToUpdate)
    {
        RenterToUpdate.Id = id;
        
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, RenterToUpdate, PolicyNames.ResourceOwner);
        if (!authorizationResult.Succeeded)
        {
            //404
            //return NotFound();
            return Forbid();
        }
        if (await _RenterRepo.UpdateRenterAsync(RenterToUpdate))
        {
            return NoContent();
        }
        return StatusCode(500);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteRenter(int id)
    {
        var result = await _RenterRepo.DeleteRenterAsync(id);
        if (result == false)
        {
            return NotFound();
        }
        return NoContent();
    }
}