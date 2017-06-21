using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BVMobileAppsApi.Model;
using Microsoft.AspNetCore.Authorization;
using BVMobileAppsApi.Token;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BVMobileAppsApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DesignController : Controller
    {
        private readonly IAppSetupRepository _appSetupRepository;
        private readonly IImagesRepository _imageRepository;

        public DesignController(IAppSetupRepository appSetupRepository, IImagesRepository imageRepository)
        {
            this._appSetupRepository = appSetupRepository;
            this._imageRepository = imageRepository;
        }

        // GET api/values/5
        [HttpGet]
        public Device Get()
        {
            int id = JWT.GetUserId(Request);
            Device device = Device.Get(id, this._appSetupRepository, _imageRepository);
            return device;
        }

        // PUT api/values/5
        [HttpPut]
        public void Put([FromBody]Device value)
        {
            int id = JWT.GetUserId(Request);
            value.Commit(id, this._appSetupRepository, this._imageRepository);
        }
    }
}
