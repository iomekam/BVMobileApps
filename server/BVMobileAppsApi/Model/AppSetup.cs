using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class InsertPicture
    {
        public int PictureID { get; set; }
        public byte FolderID { get; set; }
        public string KeywordsUrl { get; set; }
    }

    public class AppSetup
    {
        public AppSetup()
        {
            Color color = new Color();

            this.AppName = "";
            this.Keywords = null;
            this.Phone = "";
            this.PrimaryColor = color.Primary.Substring(1);
            this.SecColor = color.Secondary.Substring(1);
            this.Music = "";
            this.Main = null;
            this.Radio = "";
            this.Videos = "";
            this.Photos = "";
            this.More = "";
        }

        public int UserId { get; set; }
        public string AppName { get; set; }
        public byte LastCompleted { get; set; }
        public string Keywords { get; set; }
        public bool Logo { get; set; }
        public string Phone { get; set; }
        public string PrimaryColor { get; set; }
        public string SecColor { get; set; }
        public string Main { get; set; }
        public string Radio { get; set; }
        public string Videos { get; set; }
        public string Music { get; set; }
        public string Photos { get; set; }
        public bool RemoveTabNames { get; set; }
        public bool HeaderImage { get; set; }
        public bool HeaderMiddle { get; set; }
        public int MainOrder { get; set; }
        public int HeaderImageId { get; set; }
        public int HeaderImageMiddleId { get; set; }
        public int RadioOrder { get; set; }
        public int RadioHeaderImageId { get; set; }
        public bool ShowRadioTitle { get; set; }
        public int VideosOrder { get; set; }
        public int VideosHeaderImageId { get; set; }
        public bool ShowVideoTitle { get; set; }
        public int MusicOrder { get; set; }
        public int MusicHeaderImageId { get; set; }
        public bool ShowMusicTitle { get; set; }
        public int PhotosOrder { get; set; }
        public int PhotosHeaderImageId { get; set; }
        public bool ShowPhotosTitle { get; set; }
        public int MoreOrder { get; set; }
        public int MoreHeaderImageId { get; set; }
        public bool ShowMoreTitle { get; set; }
        public int LogoImageId { get; set; }
        public int MainImageId { get; set; }
        public int VideoImageId { get; set; }
        public int RadioImageId { get; set; }
        public int PhotoImageId { get; set; }
        public int MoreImageId { get; set; }
        public int MusicImageId { get; set; }
        public string More { get; set; }
    }
}
