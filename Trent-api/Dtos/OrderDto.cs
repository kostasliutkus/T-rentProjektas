namespace T_rent_api.Dtos.Orders;

public record OrderDto(int Id,DateTime CreationDate, DateTime LeaseStartDate, DateTime LeaseEndDate, decimal Price, int AccommodationID,
    int RenterID);
public record CreateOrderDto(DateTime CreationDate, DateTime LeaseStartDate, DateTime LeaseEndDate, decimal Price, int AccommodationID,
    int RenterID);
public record UpdateOrderDto(DateTime CreationDate, DateTime LeaseStartDate, DateTime LeaseEndDate, decimal Price, int AccommodationID,
    int RenterID);