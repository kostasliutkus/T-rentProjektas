using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using T_rent_api.Models;
using T_rent_api.Repositories;

namespace T_rent_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccommodationController : ControllerBase
{
    private readonly AccommodationRepository _AccommodationRepo;

    public AccommodationController(AccommodationRepository AccommodationRepo)
    {
        _AccommodationRepo = AccommodationRepo;
    }

    [HttpGet("GetAccommodations")]
    public async Task<IActionResult> GetAccommodations()
    {
        var accommodations = await _AccommodationRepo.GetAccommodationsAsync();
        return Ok(accommodations);
    }

    [HttpGet("GetAccommodation/{id}")]
    public async Task<IActionResult> GetAccommodation(int id)
    {
        var accommodation = await _AccommodationRepo.GetAccommodationAsync(id);
        return Ok(accommodation);
    }

    [HttpPost("AddAccommodation")]
    public async Task<IActionResult> AddAccommodation([FromBody] Accommodation accRequest)
    {
        var accommodation = await _AccommodationRepo.AddAccommodationAsync(accRequest);
        return CreatedAtAction(nameof(GetAccommodation), new {id = accommodation.Id}, accommodation);
    }

    [HttpPut("ChangeAccommodation/{id}")]
    public async Task<IActionResult> ChangeAccommodation(int id, [FromBody] Accommodation accommodationToUpdate)
    {
        accommodationToUpdate.Id = id;
        
        if (await _AccommodationRepo.UpdateAccommodationAsync(accommodationToUpdate))
        {
            return NoContent();
        }
        else
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("DeleteAccommodation/{id:int}")]
    public async Task<IActionResult> DeleteAccommodation(int id)
    {
        var result = await _AccommodationRepo.DeleteAccommodationAsync(id);
        if (result == false)
        {
            return NotFound(new { message = "Accommodation not found" });
        }
        return NoContent();
    }
}