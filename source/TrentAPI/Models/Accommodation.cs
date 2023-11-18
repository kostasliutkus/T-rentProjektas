using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TRentAPI.Auth.Model;

namespace TRentAPI.Models;

public class Accommodation : IUserOwnedResource
{
    [Column("id")]
    public int Id { get; set; }
    
    [Column("location")]
    public string Location { get; set; }
    
    [Column("instructions")]
    public string Instructions { get; set; }

    [Column("fk_Renter_id")]
    public int RenterID { get; set; }
    [Required]
    public string UserId { get; set; }
    public TrentRestUser User { get; set; }
}