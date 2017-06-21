using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public interface IArtistRepository
    {
        int Add(Artists artist);
        void Update(Artists artist);
        Artists Find(int key);
    }
}
