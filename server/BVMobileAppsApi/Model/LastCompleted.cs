using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public enum BVPages
    {
        APP_INFO,
        PROFILE_INFO,
        BLOG,
        DESIGN
    }

    public class LastCompleted
    {
        public int LastPage { get; set; }

        public void Commit(int id, IAppSetupRepository appSetupRepository)
        {
            AppSetup setup = appSetupRepository.Find(id);
            setup.LastCompleted = (int)this.LastPage;

            appSetupRepository.Update(setup);
        }

        public static LastCompleted Get(int id, IAppSetupRepository appSetupRepository)
        {
            AppSetup setup = appSetupRepository.Find(id);

            LastCompleted info = new LastCompleted
            {
                LastPage = setup.LastCompleted
            };

            return info;
        }
    }
}
