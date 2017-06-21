using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class InsertBlog
    {
        public int BlogID { get; set; }
    }
    public class BVBlogs
    {
        public BVBlogs()
        {
            this.Headline = "";
            this.Story = "";
            this.Keywords = null;
            this.ApproveCode = "";
            this.KeywordsUrl = "";
            this.DisplayDate = DateTime.Now;
        }

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
        public int ImageID { get; set; }
        public bool Unfinished { get; set; }
    }
}
