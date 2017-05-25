using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class ImagesRepository : IImagesRepository
    {
        private readonly ImagesContext _context;

        public ImagesRepository(ImagesContext context)
        {
            _context = context;
        }

        public IEnumerable<Images> GetAll()
        {
            return _context.ImagesItems.ToList();
        }

        public int Add(Images item)
        {
            _context.ImagesItems.Add(item);
            _context.SaveChanges();
            return item.ImageID;
        }

        public Images Find(long imageID)
        {
            if(imageID == 0) { return new Images(); }
            Images setup = _context.ImagesItems.FirstOrDefault(t => t.ImageID == imageID);
            if(setup == null)
            {
                setup = new Images();
                Add(setup);
            }

            return setup;
        }

        public void Remove(long imageID)
        {
            var entity = _context.ImagesItems.First(t => t.ImageID == imageID);
            _context.ImagesItems.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Images item)
        {
            _context.ImagesItems.Update(item);
            _context.SaveChanges();
        }
    }
}
