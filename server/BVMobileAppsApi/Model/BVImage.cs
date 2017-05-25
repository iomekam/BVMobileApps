using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class Bounds
    {
        public int Left { get; set; }
        public int Top { get; set; }
        public int Right { get; set; }
        public int Bottom { get; set; }
    }
    public class BVImage
    {
        public BVImage()
        {
            this.Image = "";
            this.Original = null;
            this.OriginalBase64 = "";
            this.Bounds = new Bounds();
        }

        public Object Original { get; set; }
        public string Image { get; set; }
        public string OriginalBase64 { get; set; }
        public Bounds Bounds { get; set; }
    }
}
