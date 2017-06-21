using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class BVBlogsRepository: IBVBlogsRepository
    {
        private readonly BlackvibesContext _context;

        public BVBlogsRepository(BlackvibesContext context)
        {
            _context = context;
        }

        public IEnumerable<BVBlogs> GetAll(long id)
        {
            return _context.Blogs.Where(blog => blog.UserId == id);
        }

        public int Add(BVBlogs item)
        {
            return this._context.InsertBlog(item);
        }

        public BVBlogs Find(long userID, long blogID)
        {
            return _context.Blogs.FirstOrDefault(t => t.UserId == userID && t.BlogId == blogID);
        }

        public void Remove(long userID, long blogID)
        {
            var entity = _context.Blogs.First(t => t.UserId == userID && t.BlogId == blogID);
            _context.Blogs.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(BVBlogs item)
        {
            _context.Blogs.Update(item);
            _context.SaveChanges();
        }
    }
}
