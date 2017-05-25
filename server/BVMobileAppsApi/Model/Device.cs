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

    public enum TabID
    {
        BLOG,
        PHOTO,
        MUSIC,
        VIDEO,
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
        public TabID id { get; set; }
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
                    case TabID.BLOG:
                        setup.Main = tab.Title;
                        setup.MainOrder = tab.Order;
                        setup.RemoveTabNames = tab.ShowTitle;

                        if (tab.Image.Image != null && tab.Image.Image != "")
                        {
                            // Make new image
                            if (setup.MainImageID == 0)
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

                                setup.MainImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.MainImageID);
                                image.Image = tab.Image.Image;
                                image.ImageOriginal = tab.Image.OriginalBase64;
                                image.Left = tab.Image.Bounds.Left;
                                image.Top = tab.Image.Bounds.Top;
                                image.Right = tab.Image.Bounds.Right;
                                image.Bottom = tab.Image.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        if (tab.HeaderImage.Image != null && tab.HeaderImage.Image != "")
                        {
                            // Make new image
                            if (setup.HeaderImageID == 0)
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

                                setup.HeaderImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.HeaderImageID);
                                image.Image = tab.HeaderImage.Image;
                                image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                                image.Left = tab.HeaderImage.Bounds.Left;
                                image.Top = tab.HeaderImage.Bounds.Top;
                                image.Right = tab.HeaderImage.Bounds.Right;
                                image.Bottom = tab.HeaderImage.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        if (tab.ExtraHeaderImage.Image != null && tab.ExtraHeaderImage.Image != "")
                        {
                            // Make new image
                            if (setup.HeaderImageMiddleID == 0)
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

                                setup.HeaderImageMiddleID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.HeaderImageMiddleID);
                                image.Image = tab.ExtraHeaderImage.Image;
                                image.ImageOriginal = tab.ExtraHeaderImage.OriginalBase64;
                                image.Left = tab.ExtraHeaderImage.Bounds.Left;
                                image.Top = tab.ExtraHeaderImage.Bounds.Top;
                                image.Right = tab.ExtraHeaderImage.Bounds.Right;
                                image.Bottom = tab.ExtraHeaderImage.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        break;
                    case TabID.MORE:
                        setup.More = tab.Title;
                        setup.MoreOrder = tab.Order;
                        setup.ShowMoreTitle = tab.ShowTitle;

                        if (tab.Image.Image != null && tab.Image.Image != "")
                        {
                            // Make new image
                            if (setup.MoreImageID == 0)
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

                                setup.MoreImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.MoreImageID);
                                image.Image = tab.Image.Image;
                                image.ImageOriginal = tab.Image.OriginalBase64;
                                image.Left = tab.Image.Bounds.Left;
                                image.Top = tab.Image.Bounds.Top;
                                image.Right = tab.Image.Bounds.Right;
                                image.Bottom = tab.Image.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        break;
                    case TabID.MUSIC:
                        setup.Music = tab.Title;
                        setup.MusicOrder = tab.Order;
                        setup.ShowMusicTitle = tab.ShowTitle;

                        if (tab.Image.Image != null && tab.Image.Image != "")
                        {
                            // Make new image
                            if (setup.MusicImageID == 0)
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

                                setup.MusicImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.MusicImageID);
                                image.Image = tab.Image.Image;
                                image.ImageOriginal = tab.Image.OriginalBase64;
                                image.Left = tab.Image.Bounds.Left;
                                image.Top = tab.Image.Bounds.Top;
                                image.Right = tab.Image.Bounds.Right;
                                image.Bottom = tab.Image.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        if (tab.HeaderImage.Image != null && tab.HeaderImage.Image != "")
                        {
                            // Make new image
                            if (setup.MusicHeaderImageID == 0)
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

                                setup.MusicHeaderImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.MusicHeaderImageID);
                                image.Image = tab.HeaderImage.Image;
                                image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                                image.Left = tab.HeaderImage.Bounds.Left;
                                image.Top = tab.HeaderImage.Bounds.Top;
                                image.Right = tab.HeaderImage.Bounds.Right;
                                image.Bottom = tab.HeaderImage.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        break;
                    case TabID.PHOTO:
                        setup.Photos = tab.Title;
                        setup.PhotosOrder = tab.Order;
                        setup.ShowPhotosTitle = tab.ShowTitle;

                        if (tab.Image.Image != null && tab.Image.Image != "")
                        {
                            // Make new image
                            if (setup.PhotoImageID == 0)
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

                                setup.PhotoImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.PhotoImageID);
                                image.Image = tab.Image.Image;
                                image.ImageOriginal = tab.Image.OriginalBase64;
                                image.Left = tab.Image.Bounds.Left;
                                image.Top = tab.Image.Bounds.Top;
                                image.Right = tab.Image.Bounds.Right;
                                image.Bottom = tab.Image.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        if (tab.HeaderImage.Image != null && tab.HeaderImage.Image != "")
                        {
                            // Make new image
                            if (setup.PhotosHeaderImageID == 0)
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

                                setup.PhotosHeaderImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.PhotosHeaderImageID);
                                image.Image = tab.HeaderImage.Image;
                                image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                                image.Left = tab.HeaderImage.Bounds.Left;
                                image.Top = tab.HeaderImage.Bounds.Top;
                                image.Right = tab.HeaderImage.Bounds.Right;
                                image.Bottom = tab.HeaderImage.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        break;
                    case TabID.RADIO:
                        setup.Radio = tab.Title;
                        setup.RadioOrder = tab.Order;
                        setup.ShowRadioTitle = tab.ShowTitle;

                        if (tab.Image.Image != null && tab.Image.Image != "")
                        {
                            // Make new image
                            if (setup.RadioImageID == 0)
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

                                setup.RadioImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.RadioImageID);
                                image.Image = tab.Image.Image;
                                image.ImageOriginal = tab.Image.OriginalBase64;
                                image.Left = tab.Image.Bounds.Left;
                                image.Top = tab.Image.Bounds.Top;
                                image.Right = tab.Image.Bounds.Right;
                                image.Bottom = tab.Image.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        if (tab.HeaderImage.Image != null && tab.HeaderImage.Image != "")
                        {
                            // Make new image
                            if (setup.RadioHeaderImageID == 0)
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

                                setup.RadioHeaderImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.RadioHeaderImageID);
                                image.Image = tab.HeaderImage.Image;
                                image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                                image.Left = tab.HeaderImage.Bounds.Left;
                                image.Top = tab.HeaderImage.Bounds.Top;
                                image.Right = tab.HeaderImage.Bounds.Right;
                                image.Bottom = tab.HeaderImage.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        break;
                    case TabID.VIDEO:
                        setup.Videos = tab.Title;
                        setup.VideosOrder = tab.Order;
                        setup.ShowVideoTitle = tab.ShowTitle;

                        if (tab.Image.Image != null && tab.Image.Image != "")
                        {
                            // Make new image
                            if (setup.VideoImageID == 0)
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

                                setup.VideoImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.VideoImageID);
                                image.Image = tab.Image.Image;
                                image.ImageOriginal = tab.Image.OriginalBase64;
                                image.Left = tab.Image.Bounds.Left;
                                image.Top = tab.Image.Bounds.Top;
                                image.Right = tab.Image.Bounds.Right;
                                image.Bottom = tab.Image.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        if (tab.HeaderImage.Image != null && tab.HeaderImage.Image != "")
                        {
                            // Make new image
                            if (setup.VideosHeaderImageID == 0)
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

                                setup.VideosHeaderImageID = imageRepository.Add(image);
                            }
                            else
                            {
                                Images image = imageRepository.Find(setup.VideosHeaderImageID);
                                image.Image = tab.HeaderImage.Image;
                                image.ImageOriginal = tab.HeaderImage.OriginalBase64;
                                image.Left = tab.HeaderImage.Bounds.Left;
                                image.Top = tab.HeaderImage.Bounds.Top;
                                image.Right = tab.HeaderImage.Bounds.Right;
                                image.Bottom = tab.HeaderImage.Bounds.Bottom;

                                imageRepository.Update(image);
                            }
                        }

                        break;
                }
            }

            setup.PrimaryColor = this.Colors.Primary;
            setup.SecColor = this.Colors.Secondary;

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
                        id = TabID.BLOG,
                        Title = "Main",
                        Order = 0,
                        HasExtraHeader = true
                    },
                    new Tab
                    {
                        id = TabID.PHOTO,
                        Order = 3,
                        Title = "Photos",
                    },
                    new Tab
                    {
                        id = TabID.MUSIC,
                        Order = -5,
                        Title = "Music",
                    },
                    new Tab
                    {
                        id = TabID.VIDEO,
                        Order = -4,
                        Title = "Videos",
                    },
                    new Tab
                    {
                        id = TabID.RADIO,
                        Order = -2,
                        Title = "Radio",
                    },
                    new Tab
                    {
                        id = TabID.MORE,
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
                    Primary = setup.PrimaryColor,
                    Secondary = setup.SecColor
                },
                Tabs = new List<Tab>
                {
                    new Tab
                    {
                        id = TabID.BLOG,
                        Title = setup.Main,
                        ShowTitle = setup.RemoveTabNames,
                        Order = setup.MainOrder,
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.HeaderImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.HeaderImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.HeaderImageID).Left,
                                Right  = imageRepository.Find(setup.HeaderImageID).Right,
                                Top = imageRepository.Find(setup.HeaderImageID).Top,
                                Bottom = imageRepository.Find(setup.HeaderImageID).Bottom
                            }
                        },
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.MainImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.MainImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MainImageID).Left,
                                Right  = imageRepository.Find(setup.MainImageID).Right,
                                Top = imageRepository.Find(setup.MainImageID).Top,
                                Bottom = imageRepository.Find(setup.MainImageID).Bottom
                            }
                        },
                        ExtraHeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.HeaderImageMiddleID).Image,
                            OriginalBase64 = imageRepository.Find(setup.HeaderImageMiddleID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.HeaderImageMiddleID).Left,
                                Right  = imageRepository.Find(setup.HeaderImageMiddleID).Right,
                                Top = imageRepository.Find(setup.HeaderImageMiddleID).Top,
                                Bottom = imageRepository.Find(setup.HeaderImageMiddleID).Bottom
                            }
                        },
                        ShowImage = imageRepository.Find(setup.MainImageID).Image != "",
                        ShowHeader = imageRepository.Find(setup.HeaderImageID).Image != "",
                        HasExtraHeader = true,
                    },
                    new Tab
                    {
                        id = TabID.RADIO,
                        Order = setup.RadioOrder,
                        Title = setup.Radio,
                        ShowTitle = setup.ShowRadioTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.RadioImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.RadioImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.RadioImageID).Left,
                                Right  = imageRepository.Find(setup.RadioImageID).Right,
                                Top = imageRepository.Find(setup.RadioImageID).Top,
                                Bottom = imageRepository.Find(setup.RadioImageID).Bottom
                            },
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.RadioHeaderImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.RadioHeaderImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.RadioHeaderImageID).Left,
                                Right  = imageRepository.Find(setup.RadioHeaderImageID).Right,
                                Top = imageRepository.Find(setup.RadioHeaderImageID).Top,
                                Bottom = imageRepository.Find(setup.RadioHeaderImageID).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.RadioImageID).Image != "",
                        ShowHeader = imageRepository.Find(setup.RadioHeaderImageID).Image != "",
                    },
                    new Tab
                    {
                        id = TabID.PHOTO,
                        Order = setup.PhotosOrder,
                        Title = setup.Photos,
                        ShowTitle = setup.ShowPhotosTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.PhotoImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.PhotoImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.PhotoImageID).Left,
                                Right  = imageRepository.Find(setup.PhotoImageID).Right,
                                Top = imageRepository.Find(setup.PhotoImageID).Top,
                                Bottom = imageRepository.Find(setup.PhotoImageID).Bottom
                            }
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.PhotosHeaderImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.PhotosHeaderImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.PhotosHeaderImageID).Left,
                                Right  = imageRepository.Find(setup.PhotosHeaderImageID).Right,
                                Top = imageRepository.Find(setup.PhotosHeaderImageID).Top,
                                Bottom = imageRepository.Find(setup.PhotosHeaderImageID).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.PhotoImageID).Image != "",
                        ShowHeader = imageRepository.Find(setup.PhotosHeaderImageID).Image != "",
                    },
                    new Tab
                    {
                        id = TabID.VIDEO,
                        Order = setup.VideosOrder,
                        Title = setup.Videos,
                        ShowTitle = setup.ShowVideoTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.VideoImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.VideoImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.VideoImageID).Left,
                                Right  = imageRepository.Find(setup.VideoImageID).Right,
                                Top = imageRepository.Find(setup.VideoImageID).Top,
                                Bottom = imageRepository.Find(setup.VideoImageID).Bottom
                            }
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.VideosHeaderImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.VideosHeaderImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.VideosHeaderImageID).Left,
                                Right  = imageRepository.Find(setup.VideosHeaderImageID).Right,
                                Top = imageRepository.Find(setup.VideosHeaderImageID).Top,
                                Bottom = imageRepository.Find(setup.VideosHeaderImageID).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.VideoImageID).Image != "",
                        ShowHeader = imageRepository.Find(setup.VideosHeaderImageID).Image != "",
                    },
                    new Tab
                    {
                        id = TabID.MUSIC,
                        Order = setup.MusicOrder,
                        Title = setup.Music,
                        ShowTitle = setup.ShowMusicTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.MusicImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.MusicImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MusicImageID).Left,
                                Right  = imageRepository.Find(setup.MusicImageID).Right,
                                Top = imageRepository.Find(setup.MusicImageID).Top,
                                Bottom = imageRepository.Find(setup.MusicImageID).Bottom
                            }
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.MusicHeaderImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.MusicHeaderImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MusicHeaderImageID).Left,
                                Right  = imageRepository.Find(setup.MusicHeaderImageID).Right,
                                Top = imageRepository.Find(setup.MusicHeaderImageID).Top,
                                Bottom = imageRepository.Find(setup.MusicHeaderImageID).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.MusicImageID).Image != "",
                        ShowHeader = imageRepository.Find(setup.MusicHeaderImageID).Image != "",
                    },
                    new Tab
                    {
                        id = TabID.MORE,
                        Order = setup.MoreOrder,
                        Title = setup.More,
                        ShowTitle = setup.ShowMoreTitle,
                        Image = new BVImage
                        {
                            Image = imageRepository.Find(setup.MoreImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.MoreImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MoreImageID).Left,
                                Right  = imageRepository.Find(setup.MoreImageID).Right,
                                Top = imageRepository.Find(setup.MoreImageID).Top,
                                Bottom = imageRepository.Find(setup.MoreImageID).Bottom
                            }
                        },
                        HeaderImage = new BVImage
                        {
                            Image = imageRepository.Find(setup.MoreHeaderImageID).Image,
                            OriginalBase64 = imageRepository.Find(setup.MoreHeaderImageID).ImageOriginal,
                            Bounds = new Bounds
                            {
                                Left = imageRepository.Find(setup.MoreHeaderImageID).Left,
                                Right  = imageRepository.Find(setup.MoreHeaderImageID).Right,
                                Top = imageRepository.Find(setup.MoreHeaderImageID).Top,
                                Bottom = imageRepository.Find(setup.MoreHeaderImageID).Bottom
                            },
                        },
                        ShowImage = imageRepository.Find(setup.MoreImageID).Image != "",
                        ShowHeader = imageRepository.Find(setup.MoreHeaderImageID).Image != "",
                        HasHeader = false
                    },
                }
            };

            return device;
        }
    }
}
