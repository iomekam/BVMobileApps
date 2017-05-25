using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model 
{
    public class AppSetupContext: DbContext
    {
        public AppSetupContext(DbContextOptions<AppSetupContext> options) : base(options)
        {
        }

        public DbSet<AppSetup> AppSetupItems { get; set; }
    }
}
