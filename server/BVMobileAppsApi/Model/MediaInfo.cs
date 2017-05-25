using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public enum MediaType
    {
        FACEBOOK,
        TWITTER,
        INSTAGRAM,
        PERISCOPE,
        AUDIOMACK,
        SOUNDCLOUD,
        MIXCLOUD,
        PODOMATIC,
        BLOGTALKRADIO,
        YOUTUBE,
        VIMEO,
        FLICKR,
        LISTENLIVE
    }

    public class MediaInfo
    {
        public MediaType MediaType { get; set; }
        public string Username { get; set; }
    }
}
