using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using T_rent_api.Auth.Model;

namespace T_rent_api.Models;

public class Renter : IUserOwnedResource
{
    [Column("first_name")]
    public string FirstName { get; set; }
    
    [Column("last_name")]
    public string LastName{ get; set; }
    
    [Column("organization")]
    public string Organization{ get; set; }
    
    [Column("age")]
    public int age { get; set; }
    
    [Column("Id")]
    [Key]
    public int Id { get; set; }
    
    [Column("email")]
    public string Email{ get; set; }
    
    [Column("phone")]
    public string Phone{ get; set; }
    
    [Required,JsonIgnore]
    public string UserId { get; set; }
    //[JsonIgnore]
    //public TrentRestUser User { get; set; }
}