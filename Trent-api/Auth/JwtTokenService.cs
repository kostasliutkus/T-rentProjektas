﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace T_rent_api.Auth;

public interface IJwtTokenService
{
    string CreateAccessToken(string userName, string userId, IEnumerable<string> userRoles);
}

public class JwtTokenService : IJwtTokenService
{
    private readonly SymmetricSecurityKey _authSigningKey;
    private readonly string _issuer;
    private readonly string _audience;
    public JwtTokenService(IConfiguration configuration)
    {
       _authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
       _issuer = configuration["JWT:ValidIssuer"];
       _audience = configuration["JWT:ValidAudience"];
    }

    public string CreateAccessToken(string userName, string userId, IEnumerable<string> userRoles)
    {
        var authClaims = new List<Claim>
        {
            new(ClaimTypes.Name, userName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, userId)
        };
        authClaims.AddRange(userRoles.Select(userRole => new Claim(ClaimTypes.Role,userRole)));
        foreach (var role in userRoles)
            Console.WriteLine(role);
        var accessSecurityToken = new JwtSecurityToken
        (
            issuer: _issuer,
            audience: _audience,
            expires: DateTime.UtcNow.AddMinutes(10),
            claims: authClaims,
            signingCredentials: new SigningCredentials(_authSigningKey, SecurityAlgorithms.HmacSha256)
        );
        return new JwtSecurityTokenHandler().WriteToken(accessSecurityToken);
    }
}