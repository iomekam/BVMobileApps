using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public interface IAppSetupRepository
    {
        void Add(AppSetup item);
        IEnumerable<AppSetup> GetAll();
        AppSetup Find(long key);
        void Remove(long key);
        void Update(AppSetup item);
        bool Exists(long key);
    }
}
