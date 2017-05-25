using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class AppSetup
    {
        public AppSetup()
        {
            Color color = new Color();

            this.AppName = "";
            this.Keywords = null;
            this.Phone = "";
            this.PrimaryColor = color.Primary;
            this.SecColor = color.Secondary;
            this.Main = null;
            this.Radio = "";
            this.Videos = "";
            this.Photos = "";
            this.More = "";
        }

        [Key]
        public int UserID { get; set; }
        public string AppName { get; set; }
        public int LastCompleted { get; set; }
        public string Keywords { get; set; }
        public bool Logo { get; set; }
        public string Phone { get; set; }
        public string PrimaryColor { get; set; }
        public string SecColor { get; set; }

        public string Main { get; set; }
        public int MainOrder { get; set; }
        public bool RemoveTabNames { get; set; }
        public bool HeaderImage { get; set; }
        public bool HeaderMiddle { get; set; }
        public int HeaderImageID { get; set; }
        public int HeaderImageMiddleID { get; set; }

        public string Radio { get; set; }
        public int RadioOrder { get; set; }
        public int RadioHeaderImageID { get; set; }
        public bool ShowRadioTitle { get; set; }

        public string Videos { get; set; }
        public int VideosOrder { get; set; }
        public int VideosHeaderImageID { get; set; }
        public bool ShowVideoTitle { get; set; }

        public string Music { get; set; }
        public int MusicOrder { get; set; }
        public int MusicHeaderImageID { get; set; }
        public bool ShowMusicTitle { get; set; }

        public string Photos { get; set; }
        public int PhotosOrder { get; set; }
        public int PhotosHeaderImageID { get; set; }
        public bool ShowPhotosTitle { get; set; }

        public string More { get; set; }
        public int MoreOrder { get; set; }
        public int MoreHeaderImageID { get; set; }
        public bool ShowMoreTitle { get; set; }

        public int LogoImageID { get; set; }
        public int MainImageID { get; set; }
        public int VideoImageID { get; set; }
        public int RadioImageID { get; set; }
        public int PhotoImageID { get; set; }
        public int MoreImageID { get; set; }
        public int MusicImageID { get; set; }
    }
}
