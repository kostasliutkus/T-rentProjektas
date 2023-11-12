using Microsoft.AspNetCore.Identity;
using T_rent_api.Auth.Model;

namespace T_rent_api.Data;

public class AuthDbSeeder
{
    private readonly UserManager<TrentRestUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    
    public AuthDbSeeder(UserManager<TrentRestUser> userManager,RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task SeedAsync()
    {
        await AddDefaultRoles();
        await AddAdminUser();
    }
    private async Task AddAdminUser()
    {
        var newAdminUser = new TrentRestUser()
        {
            Discriminator = "administrator",
            UserName = "admin",
            Email = "admin@gmail.com"
        };

        var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
        if (existingAdminUser == null)
        {
            var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "VerySafePassword1!");
            if (createAdminUserResult.Succeeded)
            {
                await _userManager.AddToRolesAsync(newAdminUser, TrentRoles.All);
            }
        }
    }
    private async Task AddDefaultRoles()
    {
        foreach (var role in TrentRoles.All)
        {
            var roleExists = await _roleManager.RoleExistsAsync(role);
            if (!roleExists)
                await _roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}