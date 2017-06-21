using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class ArtistRepository : IArtistRepository
    {
        private readonly BlackvibesContext _context;

        public ArtistRepository(BlackvibesContext context)
        {
            _context = context;
        }

        public int Add(Artists item)
        {
            return this._context.InsertArtist(item.Artist, item.Twitter);
        }

        public void Update(Artists item)
        {
            _context.Artists.Update(item);
            _context.SaveChanges();
        }

        public Artists Find(int aid)
        {
            return _context.Artists.FirstOrDefault(t => t.Aid == aid);
        }

    }
}
