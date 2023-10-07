namespace T_rent_api.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LeaseStartDate { get; set; }
    public DateTime LeaseEndDate { get; set; }
    public decimal Price { get; set; }
}