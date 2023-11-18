using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TRentAPI.Auth.Model;

namespace TRentAPI.Models;

public class Renter : IUserOwnedResource
{
    [Column("first_name")]
    public string FirstName { get; set; }
    
    [Column("last_name")]
    public string LastName{ get; set; }
    
    [Column("organization")]
    public string Organization{ get; set; }
    
    [Column("age")]
    public int Age { get; set; }
    
    [Column("Id")]
    [Key]
    public int Id { get; set; }
    
    [Column("email")]
    public string Email{ get; set; }
    
    [Column("phone")]
    public string Phone{ get; set; }
    
    [Required]
    public string UserId { get; set; }
    public TrentRestUser User { get; set; }
}