using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public interface IBVBlogsRepository
    {
        IEnumerable<BVBlogs> GetAll(long id);
        void Add(BVBlogs item);
        BVBlogs Find(long userID, long blogID);
        void Remove(long userID, long blogID);
        void Update(BVBlogs item);
    }
}
