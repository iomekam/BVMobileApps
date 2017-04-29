import { Component, Input, OnInit } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';
import { Router } from '@angular/router';
import { IBlogPost } from '../iblog-post';
import { BlogPostService } from '../blog-post.service';
import { ValidationService } from '../../shared/validation.service';
import { HeaderService } from '../../../header/header.service';

@Component({
  selector: 'bv-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

    private data: any;
    private cropperSettings: CropperSettings;

    public blogPosts: IBlogPost[];

    constructor(
        private _router: Router,
        private _blogPostService: BlogPostService,
        private _validationService: ValidationService) {

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
        this._validationService.setBlogValidValid(this.blogPosts);
    }

    ngOnInit() {
        // if we were in the middle of creating a blog post and left the page,
        // go back to blog creation page instead of blog list page
        if (this._blogPostService.isInCreationPage()) {
            let url = '/app-blog/';
            url += 'blog-create/';
            const id = this._blogPostService.getUpdateId();

            // If we do not have a number, that means that we were in the middle of creating a blog post.
            // but did not finish. This is considered an unfinished post, which is different than a post
            // that has been submitted and needs to be editted
            if (!isNaN(id) && id > 0) {
                url += id;
            }

            this._router.navigate([url], { skipLocationChange: true });
            return;
        }

        this._blogPostService.getBlogPosts().subscribe(
            blogPosts => {
                this.blogPosts = blogPosts;
                this._validationService.setBlogValidValid(blogPosts);
        });
    }
}
