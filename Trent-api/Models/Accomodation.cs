using System.ComponentModel.DataAnnotations.Schema;

namespace T_rent_api.Models;

public class Accomodation
{
    [Column("id")]
    public int Id { get; set; }
    
    [Column("location")]
    public string Location { get; set; }
    
    [Column("instrucitons")]
    public string Instructions { get; set; }
}