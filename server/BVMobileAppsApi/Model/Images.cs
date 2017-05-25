using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class Images
    {
        public Images()
        {
            Image = "";
            ImageOriginal = "";
        }

        [Key]
        public int ImageID { get; set; }
        public int UserID { get; set; }
                public int Left { get; set; }
        public int Right { get; set; }
        public int Top { get; set; }
        public int Bottom { get; set; }

        public string Image { get; set; }
        public string ImageOriginal { get; set; }
    }
}
