using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly UserProfileContext _context;

        public UserProfileRepository(UserProfileContext context)
        {
            _context = context;
        }

        public IEnumerable<UserProfile> GetAll()
        {
            return _context.UserProfileItems.ToList();
        }

        public void Add(UserProfile item)
        {
            try
            {
                _context.UserProfileItems.Add(item);
                _context.SaveChanges();
            }
            catch {}
        }

        public UserProfile Find(long userID)
        {
            UserProfile setup = _context.UserProfileItems.FirstOrDefault(t => t.UserID == userID);
            if (setup == null)
            {
                setup = new UserProfile();
                setup.UserID = (int)userID;
                Add(setup);
            }

            return setup;
        }

        public void Remove(long userID)
        {
            var entity = _context.UserProfileItems.First(t => t.UserID == userID);
            _context.UserProfileItems.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(UserProfile item)
        {
            _context.UserProfileItems.Update(item);
            _context.SaveChanges();
        }
    }
}
