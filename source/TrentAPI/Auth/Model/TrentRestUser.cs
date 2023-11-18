using Microsoft.AspNetCore.Identity;

namespace TRentAPI.Auth.Model;

public class TrentRestUser : IdentityUser
{
    public bool ForceRelogin { get; set; }
}