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
    public class BlogsController : Controller
    {
        private readonly IBVBlogsRepository _bvBlogsRepository;
        private readonly IImagesRepository _imageRepository;

        public BlogsController(IBVBlogsRepository bvBlogsRepository, IImagesRepository imageRepository)
        {
            this._bvBlogsRepository = bvBlogsRepository;
            this._imageRepository = imageRepository;
        }

        // GET api/values/5
        [HttpGet]
        public IEnumerable<Blog> Get()
        {
            int id = JWT.GetUserId(Request);
            
            IEnumerable<Blog> blog = Blog.Get(id, this._bvBlogsRepository, _imageRepository);
            return blog;
        }

        // PUT api/values/5
        [HttpPut]
        public Blog Put([FromBody]Blog value)
        {
            int id = JWT.GetUserId(Request);
            string username = JWT.GetUsername(Request);

            value.Commit(id, username, this._bvBlogsRepository, _imageRepository);
            return value;
        }

        // DELETE api/values/5
        [HttpDelete]
        public void Delete([FromBody]Blog value)
        {
            int id = JWT.GetUserId(Request);
            this._bvBlogsRepository.Remove(id, value.Id);
        }
    }
}
