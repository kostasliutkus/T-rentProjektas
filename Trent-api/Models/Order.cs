using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using T_rent_api.Auth.Model;

namespace T_rent_api.Models;

public class Order : IUserOwnedResource
{
    [Column("id")]
    public int Id { get; set; }
    
    [Column("creation_date")]
    public DateTime CreationDate { get; set; }
    
    [Column("lease_start_date")]
    public DateTime LeaseStartDate { get; set; }
    
    [Column("lease_expiration_date")]
    public DateTime LeaseEndDate { get; set; }
    
    [Column("price")]
    public decimal Price { get; set; }
    [Column("fk_accommodation_id")]
    public int AccommodationID { get; set; }
    [Column("fk_renter_id")]
    public int RenterID { get; set; }
    [Required]
    public string UserId { get; set; }
    public TrentRestUser User { get; set; }
}