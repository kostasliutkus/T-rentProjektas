using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using T_rent_api.Models;
using T_rent_api.Repositories;

namespace T_rent_api.Controllers;

[ApiController]
[Route("api/Accommodations")]
public class AccommodationController : ControllerBase
{
    private readonly AccommodationRepository _AccommodationRepo;

    public AccommodationController(AccommodationRepository AccommodationRepo)
    {
        _AccommodationRepo = AccommodationRepo;
    }

    [HttpGet("{id}/Renter")]
    public async Task<IActionResult> GetAccommodations(int id)
    {
        var accommodations = await _AccommodationRepo.GetAccommodationsAsync(id);
        return Ok(accommodations);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAccommodation(int id)
    {
        var accommodation = await _AccommodationRepo.GetAccommodationAsync(id);
        return Ok(accommodation);
    }

    [HttpPost]
    public async Task<IActionResult> AddAccommodation([FromBody] Accommodation accRequest)
    {
        var accommodation = await _AccommodationRepo.AddAccommodationAsync(accRequest);
        return CreatedAtAction(nameof(GetAccommodation), new {id = accommodation.Id}, accommodation);
    }

    [HttpPut("{id}")]
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

    [HttpDelete("{id:int}")]
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