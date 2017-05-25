using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class BVBlogsRepository: IBVBlogsRepository
    {
        private readonly BVBlogsContext _context;

        public BVBlogsRepository(BVBlogsContext context)
        {
            _context = context;
        }

        public IEnumerable<BVBlogs> GetAll(long id)
        {
            return _context.BVBlogsItems.Where(blog => blog.UserID == id);
        }

        public void Add(BVBlogs item)
        {
            _context.BVBlogsItems.Add(item);
            _context.SaveChanges();
        }

        public BVBlogs Find(long userID, long blogID)
        {
            BVBlogs blog = _context.BVBlogsItems.FirstOrDefault(t => t.UserID == userID && t.BlogID == blogID);
            if (blog == null)
            {
                blog = new BVBlogs();
                blog.UserID = (int)userID;
                Add(blog);
            }

            return blog;
        }

        public void Remove(long userID, long blogID)
        {
            var entity = _context.BVBlogsItems.First(t => t.UserID == userID && t.BlogID == blogID);
            _context.BVBlogsItems.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(BVBlogs item)
        {
            _context.BVBlogsItems.Update(item);
            _context.SaveChanges();
        }
    }
}
