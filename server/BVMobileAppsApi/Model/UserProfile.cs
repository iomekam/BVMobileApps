using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class UserProfile
    {
        [Key]
        public int UserID { get; set; }

        public string Occupation { get; set; }        public string Description { get; set; }
        public bool Picture { get; set; }

        public string Website { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string Twitter { get; set; }
        public string Periscope { get; set; }
        public string AudioMack { get; set; }
        public string SoundCloud { get; set; }
        public string MixCloud { get; set; }
        public string Podomatic { get; set; }
        public string BlogTalkRadio { get; set; }
        public string YouTube { get; set; }
        public string Vimeo { get; set; }
        public string Flickr { get; set; }
        public string ListenLive { get; set; }
    }
}
