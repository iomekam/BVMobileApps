using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public interface IImagesRepository
    {
        int Add(Images item);
        IEnumerable<Images> GetAll();
        Images Find(long key);
        void Remove(long key);
        void Update(Images item);
    }
}
