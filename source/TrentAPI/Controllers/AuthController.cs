using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TRentAPI.Auth;
using TRentAPI.Auth.Model;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
namespace TRentAPI.Controllers;

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
            Email = registerUserDto.Email,
            UserName = registerUserDto.UserName,
            //Discriminator = "default"
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
        
        user.ForceRelogin = false;
        await _userManager.UpdateAsync(user);
        //valid user
        //(generate token)
        var roles = await _userManager.GetRolesAsync(user);

        var accessToken = _jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);
        var refreshToken = _jwtTokenService.CreateRefreshToken(user.Id);
        return Ok(new SuccessfulLoginDto(accessToken,refreshToken));
    }
    [HttpPost]
    [Route("accessToken")]
    public async Task<IActionResult> AccessToken(RefreshAccessTokenDto refreshAccessTokenDto)
    {
        if (!_jwtTokenService.TryParseRefreshToken(refreshAccessTokenDto.RefreshToken, out var claims))
        {
            return UnprocessableEntity();
        }

        var userId = claims.FindFirstValue(JwtRegisteredClaimNames.Sub);

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return UnprocessableEntity("Invalid token");
        }

        if (user.ForceRelogin)
        {
            return UnprocessableEntity();
        }
                
        var roles = await _userManager.GetRolesAsync(user);
            
        var accessToken = _jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);
        var refreshToken = _jwtTokenService.CreateRefreshToken(user.Id);
                
        return Ok(new SuccessfulLoginDto(accessToken, refreshToken));
    }
}