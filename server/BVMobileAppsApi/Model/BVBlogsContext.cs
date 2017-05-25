using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model 
{
    public class BVBlogsContext : DbContext
    {
        public BVBlogsContext(DbContextOptions<BVBlogsContext> options) : base(options)
        {
        }

        public DbSet<BVBlogs> BVBlogsItems { get; set; }
    }
}
