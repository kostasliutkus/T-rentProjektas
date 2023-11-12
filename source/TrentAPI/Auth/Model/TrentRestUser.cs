using Microsoft.AspNetCore.Identity;

namespace T_rent_api.Auth.Model;

public class TrentRestUser : IdentityUser
{
    public virtual string Discriminator { get; set; }
}