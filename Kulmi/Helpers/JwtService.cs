using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Kulmi.Models;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Kulmi.Helpers
{
    public class JwtService
    {
        private IConfiguration _configuration;
        private string secureKey = "this is a very secure key";
        private string refreshSecureKey = "this is a new super very secure key";

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string Generate(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var roles = user.Role;
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512Signature);
            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

            //var payload = new JwtPayload(null, null, claims, null, DateTime.Now.AddMinutes(3));
            //var securityToken = new JwtSecurityToken(header, payload);
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(15),
              signingCredentials: credentials);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            //var accessToken = JsonConvert.SerializeObject( jwt + );

            return jwt;
        }

        public string RefreshToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(refreshSecureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512Signature);

            var refreshToken = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(10),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(refreshToken);
        }

        public JwtSecurityToken Verify(string jwt)
        {
            if (string.IsNullOrEmpty(jwt))
            {
                throw new ArgumentException($"'{nameof(jwt)}' cannot be null or empty.", nameof(jwt));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
                
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;

        }
        public JwtSecurityToken VerifyRefresh(string jwt)
        {
        
            if (string.IsNullOrEmpty(jwt))
            {
                throw new ArgumentException($"'{nameof(jwt)}' cannot be null or empty.", nameof(jwt));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(refreshSecureKey);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;

        }
    }
}
