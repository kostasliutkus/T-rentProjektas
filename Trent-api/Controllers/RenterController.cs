using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using T_rent_api.Models;
using T_rent_api.Repositories;

namespace T_rent_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RenterController : ControllerBase
{
    private readonly RenterRepository _RenterRepo;

    public RenterController(RenterRepository renterRepo)
    {
        _RenterRepo = renterRepo;
    }

    [HttpGet("GetRenters")]
    public async Task<IActionResult> GetRenters()
    {
        var renters = await _RenterRepo.GetRentersAsync();
        return Ok(renters);
    }

    [HttpGet("GetRenter/{id}")]
    public async Task<IActionResult> GetRenter(int id)
    {
        var renter = await _RenterRepo.GetRenterAsync(id);
        return Ok(renter);
    }

    [HttpPost("AddRenter")]
    public async Task<IActionResult> AddRenter([FromBody] Renter renRequest)
    {
        var renter = await _RenterRepo.AddRenterAsync(renRequest);
        return CreatedAtAction(nameof(GetRenter), new {id = renter.Id}, renter);
    }

    [HttpPut("ChangeRenter/{id}")]
    public async Task<IActionResult> ChangeRenter(int id, [FromBody] Renter RenterToUpdate)
    {
        RenterToUpdate.Id = id;
        
        if (await _RenterRepo.UpdateRenterAsync(RenterToUpdate))
        {
            return NoContent();
        }
        else
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("DeleteRenter/{id:int}")]
    public async Task<IActionResult> DeleteRenter(int id)
    {
        var result = await _RenterRepo.DeleteRenterAsync(id);
        if (result == false)
        {
            return NotFound(new { message = "Renter not found" });
        }
        return NoContent();
    }
}