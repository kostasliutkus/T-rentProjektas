namespace TRentAPI.Dtos;

public record AccommodationDto(int Id,string Location, string Instructions, int RenterID);
public record CreateAccommodationDto(string Location, string Instructions,int RenterID);
public record UpdateAccommodationDto(string Location, string Instructions,int RenterID);