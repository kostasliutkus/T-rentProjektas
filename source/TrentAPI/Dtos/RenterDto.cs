namespace TRentAPI.Dtos;

public record RenterDto(int Id,string FirstName, string LastName, string Organization, int Age, string Email,
    string Phone);
public record CreateRenterDto(string FirstName, string LastName, string Organization, int Age, string Email,
    string Phone);
public record UpdateRenterDto(string FirstName, string LastName, string Organization, int Age, string Email,
    string Phone);