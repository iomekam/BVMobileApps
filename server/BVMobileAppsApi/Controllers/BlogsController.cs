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
        [HttpGet("{id}")]
        public IEnumerable<Blog> Get(int id)
        {
            IEnumerable<Blog> blog = Blog.Get(id, this._bvBlogsRepository, _imageRepository);
            return blog;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public Blog Put(int id, [FromBody]Blog value)
        {
            value.Commit(id, this._bvBlogsRepository, _imageRepository);
            return value;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id, [FromBody]Blog value)
        {
            this._bvBlogsRepository.Remove(id, value.Id);
        }
    }
}
