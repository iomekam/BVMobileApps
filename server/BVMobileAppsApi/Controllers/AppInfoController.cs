using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BVMobileAppsApi.Model;
using BVMobileAppsApi.Token;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BVMobileAppsApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AppInfoController : Controller
    {
        private readonly IAppSetupRepository _appSetupRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IImagesRepository _imageRepository;
        private readonly IArtistRepository _artistRepository;

        public AppInfoController(IAppSetupRepository appSetupRepository, IUserProfileRepository userProfileRepository, IImagesRepository imageRepository, IArtistRepository artistRepository)
        {
            this._appSetupRepository = appSetupRepository;
            this._userProfileRepository = userProfileRepository;
            this._imageRepository = imageRepository;
            this._artistRepository = artistRepository;
        }

        // GET api/values/5
        [HttpGet]
        public AppInfo Get()
        {
            int id = JWT.GetUserId(Request);
            AppInfo info = AppInfo.Get(id, this._appSetupRepository, this._userProfileRepository, this._imageRepository);
            return info;
        }

        // PUT api/values/5
        [HttpPut]
        public void Put([FromBody]AppInfo value)
        {
            int id = JWT.GetUserId(Request);
            value.Commit(id, this._appSetupRepository, this._userProfileRepository, _imageRepository, this._artistRepository);
        }
    }
}
