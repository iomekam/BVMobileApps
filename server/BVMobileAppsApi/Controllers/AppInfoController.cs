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
    public class AppInfoController : Controller
    {
        private readonly IAppSetupRepository _appSetupRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IImagesRepository _imageRepository;

        public AppInfoController(IAppSetupRepository appSetupRepository, IUserProfileRepository userProfileRepository, IImagesRepository imageRepository)
        {
            this._appSetupRepository = appSetupRepository;
            this._userProfileRepository = userProfileRepository;
            this._imageRepository = imageRepository;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public AppInfo Get(int id)
        {
            AppInfo info = AppInfo.Get(id, this._appSetupRepository, this._userProfileRepository, _imageRepository);
            return info;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]AppInfo value)
        {
            value.Commit(id, this._appSetupRepository, this._userProfileRepository, _imageRepository);
        }
    }
}
