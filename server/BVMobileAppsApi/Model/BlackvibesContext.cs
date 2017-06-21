using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace BVMobileAppsApi.Model
{
    public partial class BlackvibesContext : DbContext
    {
        public virtual DbSet<AppSetup> AppSetup { get; set; }
        public virtual DbSet<BVBlogs> Blogs { get; set; }
        public virtual DbSet<Images> Images { get; set; }
        public virtual DbSet<UserProfile> UsersProfile { get; set; }
        public virtual DbSet<Artists> Artists { get; set; }

        public BlackvibesContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppSetup>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_App_Setup");

                entity.ToTable("App_Setup");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AppName)
                    .IsRequired()
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.HeaderImage).HasDefaultValueSql("0");

                entity.Property(e => e.HeaderImageId)
                    .HasColumnName("HeaderImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.HeaderImageMiddleId)
                    .HasColumnName("HeaderImageMiddleID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.HeaderMiddle).HasDefaultValueSql("0");

                entity.Property(e => e.Keywords).HasColumnType("varchar(100)");

                entity.Property(e => e.LastCompleted).HasDefaultValueSql("0");

                entity.Property(e => e.Logo).HasDefaultValueSql("0");

                entity.Property(e => e.LogoImageId)
                    .HasColumnName("LogoImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Main).HasColumnType("varchar(10)");

                entity.Property(e => e.MainImageId)
                    .HasColumnName("MainImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.MainOrder).HasDefaultValueSql("0");

                entity.Property(e => e.More).HasColumnType("varchar(10)");

                entity.Property(e => e.MoreHeaderImageId)
                    .HasColumnName("MoreHeaderImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.MoreImageId)
                    .HasColumnName("MoreImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.MoreOrder).HasDefaultValueSql("0");

                entity.Property(e => e.Music).HasColumnType("varchar(10)");

                entity.Property(e => e.MusicHeaderImageId)
                    .HasColumnName("MusicHeaderImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.MusicImageId)
                    .HasColumnName("MusicImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.MusicOrder).HasDefaultValueSql("0");

                entity.Property(e => e.Phone).HasColumnType("varchar(15)");

                entity.Property(e => e.PhotoImageId)
                    .HasColumnName("PhotoImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Photos).HasColumnType("varchar(10)");

                entity.Property(e => e.PhotosHeaderImageId)
                    .HasColumnName("PhotosHeaderImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.PhotosOrder).HasDefaultValueSql("0");

                entity.Property(e => e.PrimaryColor).HasColumnType("varchar(6)");

                entity.Property(e => e.Radio).HasColumnType("varchar(10)");

                entity.Property(e => e.RadioHeaderImageId)
                    .HasColumnName("RadioHeaderImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.RadioImageId)
                    .HasColumnName("RadioImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.RadioOrder).HasDefaultValueSql("0");

                entity.Property(e => e.RemoveTabNames).HasDefaultValueSql("0");

                entity.Property(e => e.SecColor).HasColumnType("varchar(6)");

                entity.Property(e => e.ShowMoreTitle).HasDefaultValueSql("0");

                entity.Property(e => e.ShowMusicTitle).HasDefaultValueSql("0");

                entity.Property(e => e.ShowPhotosTitle).HasDefaultValueSql("0");

                entity.Property(e => e.ShowRadioTitle).HasDefaultValueSql("0");

                entity.Property(e => e.ShowVideoTitle).HasDefaultValueSql("0");

                entity.Property(e => e.VideoImageId)
                    .HasColumnName("VideoImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Videos).HasColumnType("varchar(10)");

                entity.Property(e => e.VideosHeaderImageId)
                    .HasColumnName("VideosHeaderImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.VideosOrder).HasDefaultValueSql("0");
            });

            modelBuilder.Entity<BVBlogs>(entity =>
            {
                entity.HasKey(e => e.BlogId)
                    .HasName("PK_Blogs_New");

                entity.Property(e => e.BlogId).HasColumnName("BlogID");

                entity.Property(e => e.ApproveCode).HasColumnType("varchar(10)");

                entity.Property(e => e.BFrontPage)
                    .HasColumnName("bFrontPage")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.BPhoto)
                    .HasColumnName("bPhoto")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Comments).HasDefaultValueSql("0");

                entity.Property(e => e.Display).HasDefaultValueSql("1");

                entity.Property(e => e.DisplayDate)
                    .HasColumnName("Display_Date")
                    .HasColumnType("smalldatetime");

                entity.Property(e => e.Headline)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ImageID)
                    .HasColumnName("ImageID")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Keywords).HasMaxLength(100);

                entity.Property(e => e.KeywordsUrl)
                    .HasColumnName("KeywordsURL")
                    .HasColumnType("varchar(81)");

                entity.Property(e => e.LastMod)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.Location).HasDefaultValueSql("0");

                entity.Property(e => e.Story)
                    .IsRequired()
                    .HasColumnType("ntext");

                entity.Property(e => e.Unfinished).HasDefaultValueSql("0");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<Images>(entity =>
            {
                entity.HasKey(e => e.ImageId)
                    .HasName("PK__Images__7516F70CBFE8D3BE");

                entity.Property(e => e.Bottom).HasDefaultValueSql("0");

                entity.Property(e => e.Image)
                    .IsRequired()
                    .HasColumnType("varchar(max)")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.ImageOriginal)
                    .IsRequired()
                    .HasColumnType("varchar(max)")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Left).HasDefaultValueSql("0");

                entity.Property(e => e.Right).HasDefaultValueSql("0");

                entity.Property(e => e.Top).HasDefaultValueSql("0");
            });

            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_Users_Profile");

                entity.ToTable("Users_Profile");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Aid).HasColumnName("AID");

                entity.Property(e => e.Aim)
                    .HasColumnName("AIM")
                    .HasColumnType("varchar(16)");

                entity.Property(e => e.AudioMack).HasColumnType("varchar(75)");

                entity.Property(e => e.AudioStream).HasColumnType("varchar(200)");

                entity.Property(e => e.AudioStreamName).HasColumnType("varchar(100)");

                entity.Property(e => e.BAge)
                    .HasColumnName("bAge")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.BCityState)
                    .HasColumnName("bCityState")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.BEmail)
                    .HasColumnName("bEmail")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.BPhone)
                    .HasColumnName("bPhone")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.BRealName)
                    .HasColumnName("bRealName")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.BlogName).HasColumnType("varchar(100)");

                entity.Property(e => e.BlogTalkRadio).HasColumnType("varchar(30)");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.EmailNotifications)
                    .HasColumnName("Email_Notifications")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.Facebook).HasColumnType("varchar(200)");

                entity.Property(e => e.Flickr).HasColumnType("varchar(50)");

                entity.Property(e => e.Instagram).HasColumnType("varchar(50)");

                entity.Property(e => e.LastUpdate)
                    .HasColumnType("smalldatetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.ListenLive).HasColumnType("varchar(200)");

                entity.Property(e => e.MbSignature)
                    .HasColumnName("MB_Signature")
                    .HasColumnType("text");

                entity.Property(e => e.MixCloud).HasColumnType("varchar(30)");

                entity.Property(e => e.Msnim)
                    .HasColumnName("MSNIM")
                    .HasColumnType("varchar(64)");

                entity.Property(e => e.MusicFeed).HasColumnType("varchar(200)");

                entity.Property(e => e.Occupation).HasColumnType("varchar(100)");

                entity.Property(e => e.OccupationId).HasColumnName("OccupationID");

                entity.Property(e => e.Periscope).HasColumnType("varchar(20)");

                entity.Property(e => e.Picture).HasDefaultValueSql("0");

                entity.Property(e => e.PlaylistId).HasColumnType("varchar(40)");

                entity.Property(e => e.Podomatic).HasColumnType("varchar(50)");

                entity.Property(e => e.PromptInvite)
                    .HasColumnName("Prompt_Invite")
                    .HasColumnType("smalldatetime");

                entity.Property(e => e.PromptMobileApp)
                    .HasColumnName("Prompt_MobileApp")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Soundcloud).HasColumnType("varchar(50)");

                entity.Property(e => e.Status).HasColumnType("text");

                entity.Property(e => e.StatusDateTime).HasColumnType("smalldatetime");

                entity.Property(e => e.Twitter).HasColumnType("varchar(20)");

                entity.Property(e => e.VideoStreamEmbed).HasColumnType("varchar(100)");

                entity.Property(e => e.VideoStreamLink).HasColumnType("varchar(100)");

                entity.Property(e => e.VideoStreamName).HasColumnType("varchar(50)");

                entity.Property(e => e.Vimeo).HasColumnType("varchar(50)");

                entity.Property(e => e.Website).HasColumnType("varchar(100)");

                entity.Property(e => e.YahooIm)
                    .HasColumnName("YahooIM")
                    .HasColumnType("varchar(32)");

                entity.Property(e => e.Youtube).HasColumnType("varchar(60)");
            });

            modelBuilder.Entity<Artists>(entity =>
            {
                entity.HasKey(e => e.Aid)
                    .HasName("PK_Artists");

                entity.Property(e => e.Aid).HasColumnName("AID");

                entity.Property(e => e.Artist)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.ArtistId).HasColumnName("ArtistID");

                entity.Property(e => e.ContactEmail).HasColumnType("varchar(100)");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.GenreId).HasColumnName("GenreID");

                entity.Property(e => e.Picture).HasColumnType("varchar(50)");

                entity.Property(e => e.Twitter).HasColumnType("varchar(15)");

                entity.Property(e => e.Website).HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<InsertArtist>(entity =>
            {
                entity.HasKey(e => e.Aid);
                entity.Property(e => e.Aid).HasColumnName("AID");
                entity.Property(e => e.Status).HasColumnName("Status");
            });

            modelBuilder.Entity<InsertPicture>(entity =>
            {
                entity.HasKey(e => e.FolderID);
            });

            modelBuilder.Entity<InsertBlog>(entity =>
            {
                entity.HasKey(e => e.BlogID);
            });

            
        }

        public int InsertArtist(string appName, string twitter)
        {
            InsertArtist artist = this.Set<InsertArtist>().FromSql("InsertArtist @artist={0}, @genreid=25, @picture=null, @website=null, @twitter={1}, @description=null", appName, twitter).First();
            return artist.Aid;

        }

        public InsertPicture InsertPicture(int aid, string username, string name, int picId)
        {
            return this.Set<InsertPicture>().FromSql("INSERTPICTURE {0},{1},{2},{3},1,{4},'',null, null, '', ''",
                aid, name, picId, DateTime.Now, username + "-" + name).First();
        }

        public int InsertBlog(BVBlogs blog)
        {
            Random generator = new Random();
            String r = generator.Next(100000, 1000000000).ToString();

            return this.Set<InsertBlog>().FromSql("INSERT_BLOG {0},{1},{2},{3},{4},{5},{6},{7},null, 0,0,0,null",
                blog.UserId, r, blog.Headline, blog.DisplayDate, blog.Story, blog.Keywords, blog.ImageID > 0, blog.KeywordsUrl).First().BlogID;
        }
    }
}