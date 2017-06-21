using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Token
{
    public class JWT
    {
        public static int GetUserId(HttpRequest request)
        {
            var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadToken(request.Headers["Authorization"].First().Split(' ')[1]) as JwtSecurityToken;

            string username = token.Claims.First(claim => claim.Type == "username").Value;
            return Int32.Parse(token.Claims.First(claim => claim.Type == "userid").Value);
        }

        public static string GetUsername(HttpRequest request)
        {
            var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadToken(request.Headers["Authorization"].First().Split(' ')[1]) as JwtSecurityToken;

            return token.Claims.First(claim => claim.Type == "username").Value;
        }
    }
}
