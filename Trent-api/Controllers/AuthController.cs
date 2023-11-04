using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using T_rent_api.Auth.Model;
using T_rent_api.Auth;
using Microsoft.AspNetCore.Authorization;

namespace T_rent_api.Controllers;

[ApiController]
[AllowAnonymous]
[Route("api")]
public class AuthController : ControllerBase
{
    private readonly UserManager<TrentRestUser> _userManager;
    private readonly IJwtTokenService _jwtTokenService;
    public AuthController(UserManager<TrentRestUser> userManager, IJwtTokenService jwtTokenService)
    {
        _userManager = userManager;
        _jwtTokenService = jwtTokenService;
    }
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
    {
        
        var user = await _userManager.FindByNameAsync(registerUserDto.UserName);
        if (user != null)
            return BadRequest("User already exists.");
        
        var newUser = new TrentRestUser
        {
            Discriminator = "registeredUser",
            Email = registerUserDto.Email,
            UserName = registerUserDto.UserName
        };
        
        var createUserResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);
        if (!createUserResult.Succeeded)
            return BadRequest("could not create a user.");

        await _userManager.AddToRoleAsync(newUser, TrentRoles.TrentUser);

        return CreatedAtAction(nameof(Register), new UserDto(newUser.Id, newUser.UserName, newUser.Email));
    }
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.UserName);
        if (user == null)
            return BadRequest("User Name or password is invalid.");
        var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        if (!isPasswordValid)
            return BadRequest("User name or passsword is invalid.");
        
        //valid user
        //(generate token)
        var roles = await _userManager.GetRolesAsync(user);
        foreach(var role in roles)
            Console.WriteLine(role);
        var accessToken = _jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);
        
        return Ok(new SuccessfulLoginDto(accessToken));
    }
}