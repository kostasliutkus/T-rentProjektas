using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using T_rent_api.Models;
using T_rent_api.Repositories;

namespace T_rent_api.Controllers;

[ApiController]
[Route("api/Renters/{idR}/Accommodations")]
public class AccommodationController : ControllerBase
{
    private readonly AccommodationRepository _AccommodationRepo;

    public AccommodationController(AccommodationRepository AccommodationRepo)
    {
        _AccommodationRepo = AccommodationRepo;
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
    public async Task<IActionResult> AddAccommodation([FromBody] Accommodation accRequest,int idR)
    {
        var accommodation = await _AccommodationRepo.AddAccommodationAsync(accRequest,idR);
        if (accommodation == null)
        {
            return StatusCode(400);
        }
        accommodation.RenterID = idR;
        return Ok(accommodation);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ChangeAccommodation(int id, [FromBody] Accommodation accommodationToUpdate,int idR)
    {
        accommodationToUpdate.Id = id;
        
        if (await _AccommodationRepo.UpdateAccommodationAsync(accommodationToUpdate,idR))
        {
            return NoContent();
        }
        else
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAccommodation(int id,int idR)
    {
        var result = await _AccommodationRepo.DeleteAccommodationAsync(id,idR);
        if (result == false)
        {
            return NotFound(new { message = "Accommodation not found" });
        }
        return NoContent();
    }
}