using Microsoft.AspNetCore.Mvc;
using Kulmi.Data;
using Kulmi.Dtos;
using Kulmi.Models;
using Kulmi.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Text;
using Kulmi.Models;

namespace Kulmi.Controllers
{

    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {

        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        private readonly IConfiguration _configuration;
        public AuthController(IUserRepository repository, JwtService jwtService, IConfiguration configuration)
        {
            _configuration = configuration;
            _repository = repository;
            _jwtService = jwtService;
        }


        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Name) || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
            {
                return BadRequest(new { message = "Please fill all Credentials" });
            }

            var user = new User
            {
                Name = dto.Name,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "user",

            };
            return Created("succsess", _repository.Create(user));

        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);
            if (user != null)
            {
                if (string.IsNullOrEmpty(user.Name) || string.IsNullOrEmpty(user.Password)) return BadRequest(new { message = "Fill te Credentials" });


                if (dto.Email != user.Email || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                {
                    return BadRequest(new { message = "Invalid Credentials" });
                }

                var jwt = _jwtService.Generate(user);
                var refresh = _jwtService.RefreshToken(user);

                Response.Cookies.Append("jwt", refresh, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                });

                return Ok(jwt);
            }
            else
            {
                return Ok("Dicka ka shku gabim");
            }


        }



        [HttpPost("refresh")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshtoken = Request.Cookies["jwt"];

            var token = _jwtService.VerifyRefresh(refreshtoken);

            //var newToken = _jwtService.Generate();


            return Ok(Json(token));
        }


        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "succsess"
            });
        }
    }
}
