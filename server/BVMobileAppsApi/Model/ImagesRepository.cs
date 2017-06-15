using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class ImagesRepository : IImagesRepository
    {
        private readonly BlackvibesContext _context;

        public ImagesRepository(BlackvibesContext context)
        {
            _context = context;
        }

        public IEnumerable<Images> GetAll()
        {
            return _context.Images.ToList();
        }

        public int Add(Images item)
        {
            try
            {
                _context.Images.Add(item);
                _context.SaveChanges();
            }
            catch { }

            return item.ImageId;
        }

        public Images Find(long imageID)
        {
            if(imageID == 0) { return new Images(); }
            Images setup = _context.Images.FirstOrDefault(t => t.ImageId == imageID);
            if(setup == null)
            {
                setup = new Images();
                Add(setup);
            }

            return setup;
        }

        public void Remove(long imageID)
        {
            var entity = _context.Images.First(t => t.ImageId == imageID);
            _context.Images.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Images item)
        {
            _context.Images.Update(item);
            _context.SaveChanges();
        }
    }
}
