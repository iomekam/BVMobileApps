using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile item);
        UserProfile Find(long key);
        void Update(UserProfile item);
    }
}
