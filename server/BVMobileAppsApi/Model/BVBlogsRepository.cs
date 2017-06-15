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

        public void Add(BVBlogs item)
        {
            try
            {
                _context.Blogs.Add(item);
                _context.SaveChanges();
            }
            catch { }
        }

        public BVBlogs Find(long userID, long blogID)
        {
            BVBlogs blog = _context.Blogs.FirstOrDefault(t => t.UserId == userID && t.BlogId == blogID);
            if (blog == null)
            {
                blog = new BVBlogs();
                blog.UserId = (int)userID;
                Add(blog);
            }

            return blog;
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
