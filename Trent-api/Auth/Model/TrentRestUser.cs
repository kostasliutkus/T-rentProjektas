using Microsoft.AspNetCore.Identity;

namespace T_rent_api.Auth.Model;

public class TrentRestUser : IdentityUser
{
        public string Discriminator { get; set; }
        public TrentRestUser() : base()
        { 
                Discriminator = "Default";
        }
}