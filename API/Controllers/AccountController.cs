using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Interfaces;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenInterface _token;
        public AccountController(DataContext context,ITokenInterface token)
        {
            _token = token;
            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto){
            if(await UserExists(registerDto.UserName)) return BadRequest("Username already exists");
            using var hmac=new HMACSHA512();
            var user=new AppUser{
                UserName=registerDto.UserName.ToLower(),
                passwordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                passwordSalt=hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
         [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user=await _context.Users.SingleOrDefaultAsync(x=>x.UserName==loginDto.UserName);
            if(user==null) return Unauthorized("Invalid user");
            using var hmac=new HMACSHA512(user.passwordSalt);
            var computedHash= hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
            for(int i=0;i<computedHash.Length;i++){
                if (computedHash[i]!=user.passwordHash[i]) return Unauthorized("Incorrect password");
            }
            return new UserDto{
                Username=user.UserName,
                Token=_token.CreateToken(user)
            };
        }
        private async Task<bool> UserExists(string username){
            return await _context.Users.AnyAsync(x=>x.UserName==username.ToLower());
        }
    }
}