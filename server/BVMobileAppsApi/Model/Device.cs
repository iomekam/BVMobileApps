using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class Color
    {
        public Color()
        {
            Primary = "#000000";
            Secondary = "#0099ff";
        }

        public string Primary { get; set; }
        public string Secondary { get; set; }
    }

    public enum TabId
    {
        BLOG,
        PHOTO,
        MUSIC,
        VIdEO,
        RADIO,
        MORE,
        COLOR
    }

    public class Tab
    {
        public Tab()
        {
            this.Title = "";
            HeaderImage = new BVImage();
            ExtraHeaderImage = new BVImage();
            Image = new BVImage();
            ShowTitle = true;
            ShowImage = false;
            ShowHeader = false;
            HasExtraHeader = false;
            HasHeader = true;
        }

        public string Title { get; set; }
        public bool ShowTitle { get; set; }
        public bool ShowImage { get; set; }
        public bool ShowHeader { get; set; }
        public bool HasExtraHeader { get; set; }
        public bool HasHeader { get; set; }
        public TabId id { get; set; }
        public int Order { get; set; }
        public BVImage HeaderImage { get; set; }
        public BVImage ExtraHeaderImage { get; set; }
        public BVImage Image { get; set; }
    }

    public class Device
    {
        public Color Colors { get; set; }
        public List<Tab> Tabs { get; set; }

        public void Commit(int id, IAppSetupRepository appSetupRepository, IImagesRepository imageRepository)
        {
            AppSetup setup = appSetupRepository.Find(id);

            foreach(Tab tab in this.Tabs)
            {
                switch(tab.id)
                {
                    case TabId.BLOG:
                        setup.Main = tab.Title;
                        setup.MainOrder = tab.Order;
                        setup.RemoveTabNames = !tab.ShowTitle;

                        // Make new image
                        if (setup.MainImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.Image.Image,
                                ImageOriginal = tab.Image.OriginalBase64,
                                Left = tab.Image.Bounds.Left,
                                Top = tab.Image.Bounds.Top,
                                Right = tab.Image.Bounds.Right,
                                Bottom = tab.Image.Bounds.Bottom
                            };

                            setup.MainImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.MainImageId);
                            image.Image = tab.Image.Image;
                            image.ImageOriginal = tab.Image.OriginalBase64;
                            image.Left = tab.Image.Bounds.Left;
                            image.Top = tab.Image.Bounds.Top;
                            image.Right = tab.Image.Bounds.Right;
                            image.Bottom = tab.Image.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        // Make new image
                        if (setup.HeaderImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.HeaderImage.Image,
                                ImageOriginal = tab.HeaderImage.OriginalBase64,
                                Left = tab.HeaderImage.Bounds.Left,
                                Top = tab.HeaderImage.Bounds.Top,
                                Right = tab.HeaderImage.Bounds.Right,
                                Bottom = tab.HeaderImage.Bounds.Bottom
                            };

                            setup.HeaderImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.HeaderImageId);
                            image.Image = tab.HeaderImage.Image;
                            image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                            image.Left = tab.HeaderImage.Bounds.Left;
                            image.Top = tab.HeaderImage.Bounds.Top;
                            image.Right = tab.HeaderImage.Bounds.Right;
                            image.Bottom = tab.HeaderImage.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        // Make new image
                        if (setup.HeaderImageMiddleId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.ExtraHeaderImage.Image,
                                ImageOriginal = tab.ExtraHeaderImage.OriginalBase64,
                                Left = tab.ExtraHeaderImage.Bounds.Left,
                                Top = tab.ExtraHeaderImage.Bounds.Top,
                                Right = tab.ExtraHeaderImage.Bounds.Right,
                                Bottom = tab.ExtraHeaderImage.Bounds.Bottom
                            };

                            setup.HeaderImageMiddleId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.HeaderImageMiddleId);
                            image.Image = tab.ExtraHeaderImage.Image;
                            image.ImageOriginal = tab.ExtraHeaderImage.OriginalBase64;
                            image.Left = tab.ExtraHeaderImage.Bounds.Left;
                            image.Top = tab.ExtraHeaderImage.Bounds.Top;
                            image.Right = tab.ExtraHeaderImage.Bounds.Right;
                            image.Bottom = tab.ExtraHeaderImage.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        break;
                    case TabId.MORE:
                        setup.More = tab.Title;
                        setup.MoreOrder = tab.Order;
                        setup.ShowMoreTitle = tab.ShowTitle;

                        // Make new image
                        if (setup.MoreImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.Image.Image,
                                ImageOriginal = tab.Image.OriginalBase64,
                                Left = tab.Image.Bounds.Left,
                                Top = tab.Image.Bounds.Top,
                                Right = tab.Image.Bounds.Right,
                                Bottom = tab.Image.Bounds.Bottom
                            };

                            setup.MoreImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.MoreImageId);
                            image.Image = tab.Image.Image;
                            image.ImageOriginal = tab.Image.OriginalBase64;
                            image.Left = tab.Image.Bounds.Left;
                            image.Top = tab.Image.Bounds.Top;
                            image.Right = tab.Image.Bounds.Right;
                            image.Bottom = tab.Image.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        break;
                    case TabId.MUSIC:
                        setup.Music = tab.Title;
                        setup.MusicOrder = tab.Order;
                        setup.ShowMusicTitle = tab.ShowTitle;

                        // Make new image
                        if (setup.MusicImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.Image.Image,
                                ImageOriginal = tab.Image.OriginalBase64,
                                Left = tab.Image.Bounds.Left,
                                Top = tab.Image.Bounds.Top,
                                Right = tab.Image.Bounds.Right,
                                Bottom = tab.Image.Bounds.Bottom
                            };

                            setup.MusicImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.MusicImageId);
                            image.Image = tab.Image.Image;
                            image.ImageOriginal = tab.Image.OriginalBase64;
                            image.Left = tab.Image.Bounds.Left;
                            image.Top = tab.Image.Bounds.Top;
                            image.Right = tab.Image.Bounds.Right;
                            image.Bottom = tab.Image.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        // Make new image
                        if (setup.MusicHeaderImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.HeaderImage.Image,
                                ImageOriginal = tab.HeaderImage.OriginalBase64,
                                Left = tab.HeaderImage.Bounds.Left,
                                Top = tab.HeaderImage.Bounds.Top,
                                Right = tab.HeaderImage.Bounds.Right,
                                Bottom = tab.HeaderImage.Bounds.Bottom
                            };

                            setup.MusicHeaderImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.MusicHeaderImageId);
                            image.Image = tab.HeaderImage.Image;
                            image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                            image.Left = tab.HeaderImage.Bounds.Left;
                            image.Top = tab.HeaderImage.Bounds.Top;
                            image.Right = tab.HeaderImage.Bounds.Right;
                            image.Bottom = tab.HeaderImage.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        break;
                    case TabId.PHOTO:
                        setup.Photos = tab.Title;
                        setup.PhotosOrder = tab.Order;
                        setup.ShowPhotosTitle = tab.ShowTitle;

                        // Make new image
                        if (setup.PhotoImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.Image.Image,
                                ImageOriginal = tab.Image.OriginalBase64,
                                Left = tab.Image.Bounds.Left,
                                Top = tab.Image.Bounds.Top,
                                Right = tab.Image.Bounds.Right,
                                Bottom = tab.Image.Bounds.Bottom
                            };

                            setup.PhotoImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.PhotoImageId);
                            image.Image = tab.Image.Image;
                            image.ImageOriginal = tab.Image.OriginalBase64;
                            image.Left = tab.Image.Bounds.Left;
                            image.Top = tab.Image.Bounds.Top;
                            image.Right = tab.Image.Bounds.Right;
                            image.Bottom = tab.Image.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        // Make new image
                        if (setup.PhotosHeaderImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.HeaderImage.Image,
                                ImageOriginal = tab.HeaderImage.OriginalBase64,
                                Left = tab.HeaderImage.Bounds.Left,
                                Top = tab.HeaderImage.Bounds.Top,
                                Right = tab.HeaderImage.Bounds.Right,
                                Bottom = tab.HeaderImage.Bounds.Bottom
                            };

                            setup.PhotosHeaderImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.PhotosHeaderImageId);
                            image.Image = tab.HeaderImage.Image;
                            image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                            image.Left = tab.HeaderImage.Bounds.Left;
                            image.Top = tab.HeaderImage.Bounds.Top;
                            image.Right = tab.HeaderImage.Bounds.Right;
                            image.Bottom = tab.HeaderImage.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        break;
                    case TabId.RADIO:
                        setup.Radio = tab.Title;
                        setup.RadioOrder = tab.Order;
                        setup.ShowRadioTitle = tab.ShowTitle;

                        // Make new image
                        if (setup.RadioImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.Image.Image,
                                ImageOriginal = tab.Image.OriginalBase64,
                                Left = tab.Image.Bounds.Left,
                                Top = tab.Image.Bounds.Top,
                                Right = tab.Image.Bounds.Right,
                                Bottom = tab.Image.Bounds.Bottom
                            };

                            setup.RadioImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.RadioImageId);
                            image.Image = tab.Image.Image;
                            image.ImageOriginal = tab.Image.OriginalBase64;
                            image.Left = tab.Image.Bounds.Left;
                            image.Top = tab.Image.Bounds.Top;
                            image.Right = tab.Image.Bounds.Right;
                            image.Bottom = tab.Image.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        // Make new image
                        if (setup.RadioHeaderImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.HeaderImage.Image,
                                ImageOriginal = tab.HeaderImage.OriginalBase64,
                                Left = tab.HeaderImage.Bounds.Left,
                                Top = tab.HeaderImage.Bounds.Top,
                                Right = tab.HeaderImage.Bounds.Right,
                                Bottom = tab.HeaderImage.Bounds.Bottom
                            };

                            setup.RadioHeaderImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.RadioHeaderImageId);
                            image.Image = tab.HeaderImage.Image;
                            image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                            image.Left = tab.HeaderImage.Bounds.Left;
                            image.Top = tab.HeaderImage.Bounds.Top;
                            image.Right = tab.HeaderImage.Bounds.Right;
                            image.Bottom = tab.HeaderImage.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        break;
                    case TabId.VIdEO:
                        setup.Videos = tab.Title;
                        setup.VideosOrder = tab.Order;
                        setup.ShowVideoTitle = tab.ShowTitle;

                        // Make new image
                        if (setup.VideoImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.Image.Image,
                                ImageOriginal = tab.Image.OriginalBase64,
                                Left = tab.Image.Bounds.Left,
                                Top = tab.Image.Bounds.Top,
                                Right = tab.Image.Bounds.Right,
                                Bottom = tab.Image.Bounds.Bottom
                            };

                            setup.VideoImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.VideoImageId);
                            image.Image = tab.Image.Image;
                            image.ImageOriginal = tab.Image.OriginalBase64;
                            image.Left = tab.Image.Bounds.Left;
                            image.Top = tab.Image.Bounds.Top;
                            image.Right = tab.Image.Bounds.Right;
                            image.Bottom = tab.Image.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        // Make new image
                        if (setup.VideosHeaderImageId == 0)
                        {
                            Images image = new Images
                            {
                                Image = tab.HeaderImage.Image,
                                ImageOriginal = tab.HeaderImage.OriginalBase64,
                                Left = tab.HeaderImage.Bounds.Left,
                                Top = tab.HeaderImage.Bounds.Top,
                                Right = tab.HeaderImage.Bounds.Right,
                                Bottom = tab.HeaderImage.Bounds.Bottom
                            };

                            setup.VideosHeaderImageId = imageRepository.Add(image);
                        }
                        else
                        {
                            Images image = imageRepository.Find(setup.VideosHeaderImageId);
                            image.Image = tab.HeaderImage.Image;
                            image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                            image.Left = tab.HeaderImage.Bounds.Left;
                            image.Top = tab.HeaderImage.Bounds.Top;
                            image.Right = tab.HeaderImage.Bounds.Right;
                            image.Bottom = tab.HeaderImage.Bounds.Bottom;

                            imageRepository.Update(image);
                        }

                        break;
                }
            }

            setup.PrimaryColor = this.Colors.Primary.Substring(1);
            setup.SecColor = this.Colors.Secondary.Substring(1);

            appSetupRepository.Update(setup);
        }

        private static Device CreateNewDevice()
        {
            return new Device
            {
                Colors = new Color(),
                Tabs = new List<Tab>
                {
                    new Tab
                    {
                        id = TabId.BLOG,
                        Title = "Main",
                        Order = 0,
                        HasExtraHeader = true
                    },
                    new Tab
                    {
                        id = TabId.PHOTO,
                        Order = 3,
                        Title = "Photos",
                    },
                    new Tab
                    {
                        id = TabId.MUSIC,
                        Order = -5,
                        Title = "Music",
                    },
                    new Tab
                    {
                        id = TabId.VIdEO,
                        Order = -4,
                        Title = "Videos",
                    },
                    new Tab
                    {
                        id = TabId.RADIO,
                        Order = -2,
                        Title = "Radio",
                    },
                    new Tab
                    {
                        id = TabId.MORE,
                        Order = 8,
                        Title = "More",
                        HasHeader = false,
                    },
                }
            };
        }

        public static Device Get(int id, IAppSetupRepository appSetupRepository, IImagesRepository imageRepository)
        {

            AppSetup setup = appSetupRepository.Find(id);

            if(setup.Main == null)
            {
                return CreateNewDevice();
            }

            Device device = new Device
            {
                Colors = new Color
                {
                    Primary = '#' + setup.PrimaryColor,
                    Secondary = '#' + setup.SecColor
                },
                Tabs = new List<Tab>
                {
                    new Tab
                    {
                        id = TabId.BLOG,
                        Title = setup.Main,
                        ShowTitle = !setup.RemoveTabNames,
                        Order = setup.MainOrder,
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.HeaderImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.HeaderImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.HeaderImageId).Left,
                                Right  = imageRepository.Find(setup.HeaderImageId).Right,
                                Top = imageRepository.Find(setup.HeaderImageId).Top,
                                Bottom = imageRepository.Find(setup.HeaderImageId).Bottom
                            }
                        },
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.MainImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.MainImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MainImageId).Left,
                                Right  = imageRepository.Find(setup.MainImageId).Right,
                                Top = imageRepository.Find(setup.MainImageId).Top,
                                Bottom = imageRepository.Find(setup.MainImageId).Bottom
                            }
                        },
                        ExtraHeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.HeaderImageMiddleId).Image,
                            OriginalBase64 = imageRepository.Find(setup.HeaderImageMiddleId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.HeaderImageMiddleId).Left,
                                Right  = imageRepository.Find(setup.HeaderImageMiddleId).Right,
                                Top = imageRepository.Find(setup.HeaderImageMiddleId).Top,
                                Bottom = imageRepository.Find(setup.HeaderImageMiddleId).Bottom
                            }
                        },
                        ShowImage = imageRepository.Find(setup.MainImageId).Image != "",
                        ShowHeader = imageRepository.Find(setup.HeaderImageId).Image != "",
                        HasExtraHeader = true,
                    },
                    new Tab
                    {
                        id = TabId.RADIO,
                        Order = setup.RadioOrder,
                        Title = setup.Radio,
                        ShowTitle = setup.ShowRadioTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.RadioImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.RadioImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.RadioImageId).Left,
                                Right  = imageRepository.Find(setup.RadioImageId).Right,
                                Top = imageRepository.Find(setup.RadioImageId).Top,
                                Bottom = imageRepository.Find(setup.RadioImageId).Bottom
                            },
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.RadioHeaderImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.RadioHeaderImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.RadioHeaderImageId).Left,
                                Right  = imageRepository.Find(setup.RadioHeaderImageId).Right,
                                Top = imageRepository.Find(setup.RadioHeaderImageId).Top,
                                Bottom = imageRepository.Find(setup.RadioHeaderImageId).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.RadioImageId).Image != "",
                        ShowHeader = imageRepository.Find(setup.RadioHeaderImageId).Image != "",
                    },
                    new Tab
                    {
                        id = TabId.PHOTO,
                        Order = setup.PhotosOrder,
                        Title = setup.Photos,
                        ShowTitle = setup.ShowPhotosTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.PhotoImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.PhotoImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.PhotoImageId).Left,
                                Right  = imageRepository.Find(setup.PhotoImageId).Right,
                                Top = imageRepository.Find(setup.PhotoImageId).Top,
                                Bottom = imageRepository.Find(setup.PhotoImageId).Bottom
                            }
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.PhotosHeaderImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.PhotosHeaderImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.PhotosHeaderImageId).Left,
                                Right  = imageRepository.Find(setup.PhotosHeaderImageId).Right,
                                Top = imageRepository.Find(setup.PhotosHeaderImageId).Top,
                                Bottom = imageRepository.Find(setup.PhotosHeaderImageId).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.PhotoImageId).Image != "",
                        ShowHeader = imageRepository.Find(setup.PhotosHeaderImageId).Image != "",
                    },
                    new Tab
                    {
                        id = TabId.VIdEO,
                        Order = setup.VideosOrder,
                        Title = setup.Videos,
                        ShowTitle = setup.ShowVideoTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.VideoImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.VideoImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.VideoImageId).Left,
                                Right  = imageRepository.Find(setup.VideoImageId).Right,
                                Top = imageRepository.Find(setup.VideoImageId).Top,
                                Bottom = imageRepository.Find(setup.VideoImageId).Bottom
                            }
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.VideosHeaderImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.VideosHeaderImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.VideosHeaderImageId).Left,
                                Right  = imageRepository.Find(setup.VideosHeaderImageId).Right,
                                Top = imageRepository.Find(setup.VideosHeaderImageId).Top,
                                Bottom = imageRepository.Find(setup.VideosHeaderImageId).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.VideoImageId).Image != "",
                        ShowHeader = imageRepository.Find(setup.VideosHeaderImageId).Image != "",
                    },
                    new Tab
                    {
                        id = TabId.MUSIC,
                        Order = setup.MusicOrder,
                        Title = setup.Music,
                        ShowTitle = setup.ShowMusicTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.MusicImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.MusicImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MusicImageId).Left,
                                Right  = imageRepository.Find(setup.MusicImageId).Right,
                                Top = imageRepository.Find(setup.MusicImageId).Top,
                                Bottom = imageRepository.Find(setup.MusicImageId).Bottom
                            }
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.MusicHeaderImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.MusicHeaderImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MusicHeaderImageId).Left,
                                Right  = imageRepository.Find(setup.MusicHeaderImageId).Right,
                                Top = imageRepository.Find(setup.MusicHeaderImageId).Top,
                                Bottom = imageRepository.Find(setup.MusicHeaderImageId).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.MusicImageId).Image != "",
                        ShowHeader = imageRepository.Find(setup.MusicHeaderImageId).Image != "",
                    },
                    new Tab
                    {
                        id = TabId.MORE,
                        Order = setup.MoreOrder,
                        Title = setup.More,
                        ShowTitle = setup.ShowMoreTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.MoreImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.MoreImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MoreImageId).Left,
                                Right  = imageRepository.Find(setup.MoreImageId).Right,
                                Top = imageRepository.Find(setup.MoreImageId).Top,
                                Bottom = imageRepository.Find(setup.MoreImageId).Bottom
                            }
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.MoreHeaderImageId).Image,
                            OriginalBase64 = imageRepository.Find(setup.MoreHeaderImageId).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MoreHeaderImageId).Left,
                                Right  = imageRepository.Find(setup.MoreHeaderImageId).Right,
                                Top = imageRepository.Find(setup.MoreHeaderImageId).Top,
                                Bottom = imageRepository.Find(setup.MoreHeaderImageId).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.MoreImageId).Image != "",
                        ShowHeader = imageRepository.Find(setup.MoreHeaderImageId).Image != "",
                        HasHeader = false
                    },
                }
            };

            return device;
        }
    }
}
