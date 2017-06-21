using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using BVMobileAppsApi.Model;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using BVMobileAppsApi.Token;

namespace BVMobileAppsApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CreateController : Controller
    {
        private readonly IAppSetupRepository _appSetupRepository;
        private readonly IImagesRepository _imageRepository;
        private readonly IBVBlogsRepository _bvBlogsRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CreateController(IAppSetupRepository appSetupRepository, IBVBlogsRepository bvBlogsRepository, IImagesRepository imageRepository, IUserProfileRepository userProfileRepository)
        {
            this._appSetupRepository = appSetupRepository;
            this._imageRepository = imageRepository;
            this._bvBlogsRepository = bvBlogsRepository;
            this._userProfileRepository = userProfileRepository;
        }

        // POST api/values
        [HttpPost]
        public void Post()
        {
            int id = JWT.GetUserId(Request);
            string username = JWT.GetUsername(Request);

            // Logo //
            AppSetup setup = _appSetupRepository.Find(id);
            Images image = _imageRepository.Find(setup.LogoImageId);

            string imageBase64 = image.Image.Split(',')[1];
            
            string folderPath = "data/mobile/" + username + "/";
            System.IO.Directory.CreateDirectory(folderPath);

            // data/mobile
            CreateAndSave(imageBase64, folderPath + username + "-" + 1024 + ".png", 1024);
            CreateAndSave(imageBase64, folderPath + username + "-" + 512 + ".png", 512);
            CreateAndSave(imageBase64, folderPath + username + "-" + 120 + ".png", 120);
            CreateAndSave(imageBase64, folderPath + username + "-" + 114 + ".png", 114);
            CreateAndSave(imageBase64, folderPath + username + "-" + 80 + ".png", 80);
            CreateAndSave(imageBase64, folderPath + username + "-" + 58 + ".png", 58);
            CreateAndSave(imageBase64, folderPath + username + "-" + 57 + ".png", 57);
            CreateAndSave(imageBase64, folderPath + username + "-" + 29 + ".png", 29);

            folderPath = "images/users/";
            System.IO.Directory.CreateDirectory(folderPath);

            // images/users/
            CreateAndSave(imageBase64, folderPath + id + "-" + username + ".jpg", 300);
            CreateAndSave(imageBase64, folderPath + id + "-" + username + "-s.jpg", 75);

            // Blog //
            IEnumerable<BVBlogs> blogs = _bvBlogsRepository.GetAll(id);
            
            foreach(BVBlogs blog in blogs)
            {
                image = _imageRepository.Find(blog.ImageID);
                imageBase64 = image.Image.Split(',')[1];

                string picfolder = "" + blog.DisplayDate.Month + '-' + blog.DisplayDate.Year;
                string pickeyword = "" + blog.BlogId;

                foreach(string keyword in blog.Keywords.Split(','))
                {
                    pickeyword += "-" + keyword.ToLower();
                }

                folderPath = "images/blogs/" + picfolder + "/";
                System.IO.Directory.CreateDirectory(folderPath);

                CreateAndSave(imageBase64, folderPath + pickeyword + ".jpg", 600);
            }

            // Design //
            
            if(setup.MainOrder == 0)
            {
                image = _imageRepository.Find(setup.MainImageId);

                if(image.Image != null && image.Image != "")
                {
                    SaveTabIcon(image, setup.Main, username);
                }  
            }
            if (setup.RadioOrder > 0)
            {
                image = _imageRepository.Find(setup.RadioImageId);

                if (image.Image != null && image.Image != "")
                {
                    SaveTabIcon(image, setup.Radio, username);
                }
            }
            if (setup.PhotosOrder > 0)
            {
                image = _imageRepository.Find(setup.PhotoImageId);

                if (image.Image != null && image.Image != "")
                {
                    SaveTabIcon(image, setup.Photos, username);
                }
            }
            if (setup.VideosOrder > 0)
            {
                image = _imageRepository.Find(setup.VideoImageId);

                if (image.Image != null && image.Image != "")
                {
                    SaveTabIcon(image, setup.Videos, username);
                }
            }
            if (setup.MusicOrder > 0)
            {
                image = _imageRepository.Find(setup.MusicImageId);

                if (image.Image != null && image.Image != "")
                {
                    SaveTabIcon(image, setup.Music, username);
                }
            }
            if (setup.MoreOrder > 0)
            {
                image = _imageRepository.Find(setup.MoreImageId);

                if (image.Image != null && image.Image != "")
                {
                    SaveTabIcon(image, setup.More, username);
                }
            }

            // Header images
            UserProfile profile = _userProfileRepository.Find(id);
            image = _imageRepository.Find(setup.HeaderImageId);

            if (image == null || image.Image == "") { return; }

            imageBase64 = image.Image.Split(',')[1];

            folderPath = "data/mobile/" + username + "/";
            System.IO.Directory.CreateDirectory(folderPath);

            CreateAndSave(imageBase64, folderPath + "header@2x.png", 570, 88);
            CreateAndSave(imageBase64, folderPath + "header.png", 285, 44);

            // HeaderMiddle image
            image = _imageRepository.Find(setup.HeaderImageMiddleId);

            if (image == null || image.Image == "") { return; }

            imageBase64 = image.Image.Split(',')[1];

            CreateAndSave(imageBase64, folderPath + "header_middle@2x.png", 300, 88);
            CreateAndSave(imageBase64, folderPath + "header_middle.png", 150, 44);

            SaveHeader((int)profile.Aid, username, setup.Photos, setup.PhotosHeaderImageId, TabId.PHOTO, 612, 302);
            SaveHeader((int)profile.Aid, username, setup.Videos, setup.VideosHeaderImageId, TabId.VIdEO, 612, 302);
            SaveHeader((int)profile.Aid, username, setup.Music, setup.MusicHeaderImageId, TabId.MUSIC, 612, 302);
            SaveHeader((int)profile.Aid, username, setup.Radio, setup.RadioHeaderImageId, TabId.RADIO, 600, 600);
        }

        private int GetPictureIDType(TabId id)
        {
            if(id == TabId.PHOTO) { return 5; }
            if (id == TabId.VIdEO) { return 6; }
            if (id == TabId.MUSIC) { return 8; }
            if (id == TabId.RADIO) { return 7; }

            return 0;
        }

        private void SaveHeader(int aid, string username, string name, int imageId, TabId tabId, int width, int height)
        {
            InsertPicture pic = _appSetupRepository.InsertPicture(aid, username, name, GetPictureIDType(tabId));
            Images image = _imageRepository.Find(imageId);

            if(image == null || image.Image == "") { return; }

            string imageBase64 = image.Image.Split(',')[1];

            string folderPath = "images/bvc/" + pic.FolderID + "/";
            System.IO.Directory.CreateDirectory(folderPath);

            CreateAndSave(imageBase64, folderPath + pic.KeywordsUrl + ".jpg", width, height);
            CreateAndSave(imageBase64, folderPath + pic.KeywordsUrl + "-s.jpg", 75, 75);
        }

        private void SaveTabIcon(Images image, string title, string username)
        {
            title = title.ToLower();
            string imageBase64 = image.Image.Split(',')[1];

            string folderPath = "data/mobile/" + username + "/";
            System.IO.Directory.CreateDirectory(folderPath);

            List<int> dims = new List<int> { 90, 68, 60, 45, 30 };

            foreach (int dim in dims)
            {
                CreateAndSave(imageBase64, folderPath + "tab_icon_" + title + "-" + dim + ".jpg", dim);
            }
        }

        private void CreateAndSave(string imageBase64, string filename, int width, int height = -1)
        {
            if(height == -1)
            {
                height = width;
            }

            byte[] bytes = Convert.FromBase64String(imageBase64);

            Image image;
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                image = Image.FromStream(ms);
                while(image.Palette == null)
                {
                    image = Image.FromStream(ms);
                }
            }

            Bitmap resizedImage = ResizeImage(image, width, height);
            resizedImage.Save(filename);
        }

        private static Bitmap ResizeImage(Image image, int width, int height)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }
    }
}