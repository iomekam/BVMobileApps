using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class BVBlogs
    {
        [Key]
        public int BlogID { get; set; }
        public int UserID { get; set; }

        public string Headline { get; set; }
        public DateTime Display_Date { get; set; }
        public string Story { get; set; }
        public string Keywords { get; set; }

        public int ImageID { get; set; }

        public bool Unfinished { get; set; }
    }
}
