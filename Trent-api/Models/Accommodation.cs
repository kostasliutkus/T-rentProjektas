using System.ComponentModel.DataAnnotations.Schema;

namespace T_rent_api.Models;

public class Accommodation
{
    [Column("id")]
    public int Id { get; set; }
    
    [Column("location")]
    public string Location { get; set; }
    
    [Column("instructions")]
    public string Instructions { get; set; }
    
    [Column("fk_Renter_id")]
    public int RenterID { get; set; }
}