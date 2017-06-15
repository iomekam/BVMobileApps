using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class UserProfile
    {
        public int UserId { get; set; }
        public bool Picture { get; set; }
        public bool BRealName { get; set; }
        public bool BEmail { get; set; }
        public bool BAge { get; set; }
        public bool BCityState { get; set; }
        public string Description { get; set; }
        public DateTime LastUpdate { get; set; }
        public byte? OccupationId { get; set; }
        public string Aim { get; set; }
        public string YahooIm { get; set; }
        public string Msnim { get; set; }
        public string MbSignature { get; set; }
        public string Website { get; set; }
        public string Occupation { get; set; }
        public string Twitter { get; set; }
        public string Status { get; set; }
        public DateTime? StatusDateTime { get; set; }
        public string BlogName { get; set; }
        public bool EmailNotifications { get; set; }
        public string Facebook { get; set; }
        public string Youtube { get; set; }
        public bool? FacebookLikeBox { get; set; }
        public int? Aid { get; set; }
        public bool PromptMobileApp { get; set; }
        public DateTime? PromptInvite { get; set; }
        public string Instagram { get; set; }
        public string Soundcloud { get; set; }
        public bool BPhone { get; set; }
        public string BlogTalkRadio { get; set; }
        public string MusicFeed { get; set; }
        public string ListenLive { get; set; }
        public string Vimeo { get; set; }
        public string Flickr { get; set; }
        public string AudioStream { get; set; }
        public string AudioStreamName { get; set; }
        public string PlaylistId { get; set; }
        public byte? CategoryId { get; set; }
        public string Podomatic { get; set; }
        public string MixCloud { get; set; }
        public string Periscope { get; set; }
        public string AudioMack { get; set; }
        public string VideoStreamName { get; set; }
        public string VideoStreamEmbed { get; set; }
        public string VideoStreamLink { get; set; }
    }
}
