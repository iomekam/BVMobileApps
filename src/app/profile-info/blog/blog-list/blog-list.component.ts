import { Component, Input, OnInit } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';
import { Router } from '@angular/router';
import { IBlogPost } from '../iblog-post';
import { BlogPostService } from '../blog-post.service';

@Component({
  selector: 'bv-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  private blogTitle: string;
    private date: string;
    private content: string;
    private keywords: string[];

    private data: any;
    private cropperSettings: CropperSettings;

    @Input("list") private blogPosts: IBlogPost[];

    constructor(
        private _router: Router,
        private _blogPostService: BlogPostService) {

        this.blogPosts = [];
    }

    createBlogPost(): void {
        this._router.navigate(['/app-blog/blog-create'], { skipLocationChange: true });
    }

    editBlogPost(id: number): void {
        console.log(id);
        this._router.navigate(['/app-blog/blog-create/' + id], { skipLocationChange: true });
    }

    deleteBlogPost(id: number): void {
        this._blogPostService.deleteBlogPost(id);
    }

    ngOnInit() {
        this.blogPosts = this._blogPostService.getBlogPosts();
    }
}
