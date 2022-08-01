using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private DataContext _Context { get; }
        public BuggyController(DataContext context)
        {
            _Context = context;
        }
        [Authorize]
        [HttpGet("auth")] 
        public ActionResult<string> GetSecret(){
            return "secret text";
        }

        [HttpGet("not-found")] 
        public ActionResult<AppUser> GetNotFound(){
            var thing =_Context.Users.Find(-1);
            if (thing==null) return NotFound();
            return Ok(thing);
        }

        [HttpGet("server-error")] 
        public ActionResult<string> GetServerError(){
            var thing =_Context.Users.Find(-1);
            var thingToReturn=thing.ToString();
            return thingToReturn;
        }

        [HttpGet("bad-request")] 
        public ActionResult<string> GetBadrequest(){
            return BadRequest("Not a good request");
        }

    }
}