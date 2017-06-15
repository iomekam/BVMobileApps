using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BVMobileAppsApi.Model
{
    public class Blog
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Headline { get; set; }
        public string Body { get; set; }
        public List<string> Keywords { get; set; }
        public BVImage Image { get; set; }
        public bool IsUnfinished { get; set; }

        public void Commit(int id, IBVBlogsRepository bvBlogsRepository, IImagesRepository imageRepository)
        {
            BVBlogs blog = bvBlogsRepository.Find(id, this.Id);
            this.Id = blog.BlogId;

            blog.UserId = id;
            blog.DisplayDate = this.Date;
            blog.Headline = this.Headline;
            blog.Story = this.Body;
            blog.Keywords = String.Join(",", this.Keywords);
            blog.Unfinished = this.IsUnfinished;

            if(Image.Image != null && Image.Image != "")
            {
                // Make new image
                if(blog.ImageID == 0)
                {
                    Images image = new Images
                    {
                        Image = this.Image.Image,
                        ImageOriginal = this.Image.OriginalBase64,
                        Left = this.Image.Bounds.Left,
                        Top = this.Image.Bounds.Top,
                        Right = this.Image.Bounds.Right,
                        Bottom = this.Image.Bounds.Bottom
                    };

                    blog.ImageID = imageRepository.Add(image);
                }
                else
                {
                    Images image = imageRepository.Find(blog.ImageID);
                    image.Image = this.Image.Image;
                    image.ImageOriginal = this.Image.OriginalBase64;
                    image.Left = this.Image.Bounds.Left;
                    image.Top = this.Image.Bounds.Top;
                    image.Right = this.Image.Bounds.Right;
                    image.Bottom = this.Image.Bounds.Bottom;

                    imageRepository.Update(image);
                }
            }

            bvBlogsRepository.Update(blog);
        }

        public static IEnumerable<Blog> Get(int id, IBVBlogsRepository bvBlogsRepository, IImagesRepository imageRepository)
        {
            IEnumerable<BVBlogs> bvBlogs = bvBlogsRepository.GetAll(id);
            IEnumerable<Blog> blogs = new List<Blog>();

            foreach (BVBlogs bvBlog in bvBlogs)
            {
                Images image = imageRepository.Find(bvBlog.ImageID);

                blogs = blogs.Concat(new[] { new Blog
                {
                    Id = bvBlog.BlogId,
                    Date = bvBlog.DisplayDate,
                    Headline = bvBlog.Headline,
                    Body = bvBlog.Story,
                    IsUnfinished = bvBlog.Unfinished,
                    Keywords = bvBlog.Keywords == null || bvBlog.Keywords.Count() == 0 ? null : bvBlog.Keywords.Split(',').ToList(),
                    Image = new BVImage
                    {
                        Image = image.Image,
                        OriginalBase64 = image.ImageOriginal,
                        Bounds = new Bounds
                        {
                            Left = image.Left,
                            Top = image.Top,
                            Right = image.Right,
                            Bottom = image.Bottom
                        }
                    }
                }
                });
            }

            return blogs.OrderByDescending(s => s.Date);
        }
    }
}
