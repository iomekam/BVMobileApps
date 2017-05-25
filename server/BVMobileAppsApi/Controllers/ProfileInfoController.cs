using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BVMobileAppsApi.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BVMobileAppsApi.Controllers
{
    [Route("api/[controller]")]
    public class ProfileInfoController : Controller
    {
        private readonly IAppSetupRepository _appSetupRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public ProfileInfoController(IAppSetupRepository appSetupRepository, IUserProfileRepository userProfileRepository)
        {
            this._appSetupRepository = appSetupRepository;
            this._userProfileRepository = userProfileRepository;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Profile Get(int id)
        {
            Profile profile = Profile.Get(id, this._appSetupRepository, this._userProfileRepository);
            return profile;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Profile value)
        {
            value.Commit(id, this._appSetupRepository, this._userProfileRepository);
        }
    }
}
