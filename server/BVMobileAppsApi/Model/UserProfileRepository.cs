using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly BlackvibesContext _context;

        public UserProfileRepository(BlackvibesContext context)
        {
            _context = context;
        }

        public IEnumerable<UserProfile> GetAll()
        {
            return _context.UsersProfile.ToList();
        }

        public void Add(UserProfile item)
        {
            try
            {
                _context.UsersProfile.Add(item);
                _context.SaveChanges();
            }
            catch {}
        }

        public UserProfile Find(long userID)
        {
            UserProfile setup = _context.UsersProfile.FirstOrDefault(t => t.UserId == userID);
            if (setup == null)
            {
                setup = new UserProfile();
                setup.UserId = (int)userID;
                Add(setup);
            }

            return setup;
        }

        public void Remove(long userID)
        {
            var entity = _context.UsersProfile.First(t => t.UserId == userID);
            _context.UsersProfile.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(UserProfile item)
        {
            _context.UsersProfile.Update(item);
            _context.SaveChanges();
        }
    }
}
