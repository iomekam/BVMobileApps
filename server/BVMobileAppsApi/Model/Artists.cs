using System;
using System.Collections.Generic;

namespace BVMobileAppsApi.Model
{
    public class InsertArtist
    {
        public int Aid { get; set; }
        public Int16 Status { get; set; }
    }
    public partial class Artists
    {
        public int Aid { get; set; }
        public int ArtistId { get; set; }
        public string Artist { get; set; }
        public byte GenreId { get; set; }
        public string Picture { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public string ContactEmail { get; set; }
        public string Twitter { get; set; }
    }
}
