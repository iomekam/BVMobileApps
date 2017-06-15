using System;
using System.Collections.Generic;

namespace BVMobileAppsApi.Models
{
    public partial class Blogs
    {
        public int BlogId { get; set; }
        public string Headline { get; set; }
        public string Story { get; set; }
        public DateTime DisplayDate { get; set; }
        public bool Display { get; set; }
        public int? UserId { get; set; }
        public string Keywords { get; set; }
        public string ApproveCode { get; set; }
        public bool BPhoto { get; set; }
        public string KeywordsUrl { get; set; }
        public bool BFrontPage { get; set; }
        public DateTime? LastMod { get; set; }
        public short Comments { get; set; }
        public byte Location { get; set; }
        public byte? CategoryId { get; set; }
        public int ImageId { get; set; }
        public bool Unfinished { get; set; }
    }
}
