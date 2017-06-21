using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BVMobileAppsApi.Model;
using BVMobileAppsApi.Token;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BVMobileAppsApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class LastCompletedController : Controller
    {
        private readonly IAppSetupRepository _appSetupRepository;

        public LastCompletedController(IAppSetupRepository appSetupRepository)
        {
            _appSetupRepository = appSetupRepository;
        }

        // GET api/values/5
        [HttpGet]
        public LastCompleted Get()
        {
            int id = JWT.GetUserId(Request);
            LastCompleted last = LastCompleted.Get(id, this._appSetupRepository);
            last.Username = JWT.GetUsername(Request);
            return last;
        }

        // PUT api/values/5
        [HttpPut]
        public void Put([FromBody]LastCompleted value)
        {
            int id = JWT.GetUserId(Request);
            value.Commit(id, this._appSetupRepository);
        }
    }
}
