using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class AppSetupRepository : IAppSetupRepository
    {
        private readonly AppSetupContext _context;

        public AppSetupRepository(AppSetupContext context)
        {
            _context = context;
        }

        public IEnumerable<AppSetup> GetAll()
        {
            return _context.AppSetupItems.ToList();
        }

        public void Add(AppSetup item)
        {
            _context.AppSetupItems.Add(item);
            _context.SaveChanges();
        }

        public AppSetup Find(long userID)
        {
            AppSetup setup = _context.AppSetupItems.FirstOrDefault(t => t.UserID == userID);
            if(setup == null)
            {
                setup = new AppSetup();
                setup.UserID = (int)userID;
                Add(setup);
            }

            return setup;
        }

        public void Remove(long userID)
        {
            var entity = _context.AppSetupItems.First(t => t.UserID == userID);
            _context.AppSetupItems.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(AppSetup item)
        {
            _context.AppSetupItems.Update(item);
            _context.SaveChanges();
        }

        public bool Exists(long key)
        {
            AppSetup setup = _context.AppSetupItems.FirstOrDefault(t => t.UserID == key);
            return setup != null;
        }
    }
}
