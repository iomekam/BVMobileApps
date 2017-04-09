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

    private data: any;
    private cropperSettings: CropperSettings;

    private createBlogPostString: string;

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
        this._router.navigate(['/app-blog/blog-create/' + id], { skipLocationChange: true });
    }

    deleteBlogPost(id: number): void {
        this._blogPostService.deleteBlogPost(id);
    }

    ngOnInit() {
        if (this._blogPostService.isInCreationPage()) {
            let url = '/app-blog/';
            url += 'blog-create/';
            let id = this._blogPostService.getUpdateId();

            if (!isNaN(id) && id > 0) {
                url += id;
            }
            
            this._router.navigate([url], { skipLocationChange: true });
            return;
        }
        
        this.blogPosts = this._blogPostService.getBlogPosts();
        if(this.blogPosts.length > 0) {
            this.createBlogPostString = "Create Another Blog Post";
        }
        else {
            this.createBlogPostString = "Create a Blog Post";
        }
    }
}
