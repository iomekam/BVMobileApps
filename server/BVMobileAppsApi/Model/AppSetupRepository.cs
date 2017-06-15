using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class AppSetupRepository : IAppSetupRepository
    {
        private readonly BlackvibesContext _context;

        public AppSetupRepository(BlackvibesContext context)
        {
            _context = context;
        }

        public IEnumerable<AppSetup> GetAll()
        {
            return _context.AppSetup.ToList();
        }

        public void Add(AppSetup item)
        {
            try
            {
                _context.AppSetup.Add(item);
                _context.SaveChanges();
            }
            catch { }
        }

        public AppSetup Find(long userId)
        {
            AppSetup setup = _context.AppSetup.FirstOrDefault(t => t.UserId == userId);
            if(setup == null)
            {
                setup = new AppSetup();
                setup.UserId = (int)userId;
                Add(setup);
            }

            return setup;
        }

        public void Remove(long userId)
        {
            var entity = _context.AppSetup.First(t => t.UserId == userId);
            _context.AppSetup.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(AppSetup item)
        {
            _context.AppSetup.Update(item);
            _context.SaveChanges();
        }

        public bool Exists(long key)
        {
            AppSetup setup = _context.AppSetup.FirstOrDefault(t => t.UserId == key);
            return setup != null;
        }
    }
}
