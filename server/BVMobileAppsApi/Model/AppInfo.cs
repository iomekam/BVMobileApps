using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class AppInfo
    {
        public string AppName { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public List<string> Keywords { get; set; }
        public BVImage Image { get; set; }

        public void Commit(int id, IAppSetupRepository appSetupRepository, IUserProfileRepository userProfileRepository, IImagesRepository imageRepository)
        {
            AppSetup setup = appSetupRepository.Find(id);
            UserProfile profile = userProfileRepository.Find(id);

            if (Image.Image != null && Image.Image != "")
            {
                // Make new image
                if (setup.LogoImageID == 0)
                {
                    Images image = new Images
                    {
                        UserID = id,
                        Image = this.Image.Image,
                        ImageOriginal = this.Image.OriginalBase64,
                        Left = this.Image.Bounds.Left,
                        Top = this.Image.Bounds.Top,
                        Right = this.Image.Bounds.Right,
                        Bottom = this.Image.Bounds.Bottom
                    };

                    setup.LogoImageID = imageRepository.Add(image);
                }
                else
                {
                    Images image = imageRepository.Find(setup.LogoImageID);
                    image.Image = this.Image.Image;
                    image.ImageOriginal = this.Image.OriginalBase64;
                    image.Left = this.Image.Bounds.Left;
                    image.Top = this.Image.Bounds.Top;
                    image.Right = this.Image.Bounds.Right;
                    image.Bottom = this.Image.Bounds.Bottom;

                    imageRepository.Update(image);
                }
            }

            setup.AppName = this.AppName;
            setup.Keywords = this.Keywords == null || this.Keywords.Count == 0 ? null : String.Join(",", this.Keywords);
            setup.Logo = Image.Image != String.Empty;

            profile.Description = this.LongDescription;
            profile.Occupation = this.ShortDescription;
            profile.Picture = setup.Logo;

            appSetupRepository.Update(setup);
            userProfileRepository.Update(profile);
        }
        
        public static AppInfo Get(int id, IAppSetupRepository appSetupRepository, IUserProfileRepository userProfileRepository, IImagesRepository imageRepository)
        {
            AppSetup setup = appSetupRepository.Find(id);
            UserProfile profile = userProfileRepository.Find(id);

            AppInfo info = new AppInfo
            {
                AppName = setup.AppName,
                ShortDescription = profile.Occupation,
                LongDescription = profile.Description,
                Keywords = setup.Keywords == null ? new List<string>() : setup.Keywords.Split(',').ToList(),
                Image = new BVImage
                {
                    Image = imageRepository.Find(setup.LogoImageID).Image,
                    OriginalBase64 = imageRepository.Find(setup.LogoImageID).ImageOriginal,
                    Bounds = new Bounds
                    {
                        Left = imageRepository.Find(setup.LogoImageID).Left,
                        Top = imageRepository.Find(setup.LogoImageID).Top,
                        Right = imageRepository.Find(setup.LogoImageID).Right,
                        Bottom = imageRepository.Find(setup.LogoImageID).Bottom
                    }
                }
            };

            return info;
        }
    }
}
