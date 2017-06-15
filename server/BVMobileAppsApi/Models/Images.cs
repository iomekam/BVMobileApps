using System;
using System.Collections.Generic;

namespace BVMobileAppsApi.Models
{
    public partial class Images
    {
        public int ImageId { get; set; }
        public int UserId { get; set; }
        public int Left { get; set; }
        public int Right { get; set; }
        public int Top { get; set; }
        public int Bottom { get; set; }
        public string Image { get; set; }
        public string ImageOriginal { get; set; }
    }
}
