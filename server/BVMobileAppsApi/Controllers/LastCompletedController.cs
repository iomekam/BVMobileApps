using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BVMobileAppsApi.Model;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BVMobileAppsApi.Controllers
{
    [Route("api/[controller]")]
    public class LastCompletedController : Controller
    {
        private readonly IAppSetupRepository _appSetupRepository;

        public LastCompletedController(IAppSetupRepository appSetupRepository)
        {
            _appSetupRepository = appSetupRepository;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public LastCompleted Get(int id)
        {
            LastCompleted last = LastCompleted.Get(id, this._appSetupRepository);
            return last;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]LastCompleted value)
        {
            value.Commit(id, this._appSetupRepository);
        }
    }
}
