import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { IBlogPost } from '../iblog-post';
import { BlogPostService } from '../blog-post.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bv-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input("blogPost") private blogPost: IBlogPost;

    @ViewChild('cropper', undefined)
    private cropper: ImageCropperComponent;

    private data: any;
    private cropperSettings: CropperSettings;

    private _activatedRouteSub: Subscription;

    private _isUpdate: boolean = false;

    private _wasNewPostSubmitted: boolean = false;
    private _wasCanceled: boolean = false;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _blogPostService: BlogPostService) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 600;
        this.cropperSettings.height = 600;
        this.cropperSettings.croppedWidth = 600;
        this.cropperSettings.croppedHeight = 600;
        this.cropperSettings.canvasWidth = 600;
        this.cropperSettings.canvasHeight = 600;

        this.data = {};
    }

    ngOnInit(): void {
        let updateID = 0;
        this._activatedRouteSub = this._route.params.subscribe(
            params => {
                updateID = +params['id'];
            });

        if (isNaN(updateID)) {
            this.blogPost = this._blogPostService.getUnfinishedBlogPost();

            if (this.blogPost == null) {
                this.blogPost = {
                    headline: 'My first blog post',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas odio dui, molestie non lacinia in, eleifend ut sapien. Maecenas id dapibus sapien. Sed vel tincidunt enim, nec mattis nisl. Nullam varius massa nisi, sed auctor tellus hendrerit non. In eget sem nec risus posuere auctor in ac tortor. Aenean leo orci, blandit ut dui ut, congue porta quam. Praesent gravida tortor at cursus rutrum. Curabitur vitae pellentesque velit. Sed eu massa a neque interdum iaculis vel sit amet tortor. Etiam nisl ipsum, sollicitudin a ullamcorper et, ultrices at tortor. Duis vel malesuada velit, vitae luctus elit.',
                    image: "",
                    keywords: ["This", "is", "my", "first", "blog", "post"],
                    id: 0,
                    date: new Date()
                };
            }    
        }
        else {
            this.blogPost = this._blogPostService.getBlogPost(updateID);
        }

        this._isUpdate = !isNaN(updateID);
        this._blogPostService.setIsInCreationPage(true, updateID);
        
        this.data = {
            image: this.blogPost.image
        };
    }

    ngOnDestroy(): void {
        if (!this._isUpdate && !this._wasCanceled && this._wasNewPostSubmitted == false) {
            this._blogPostService.setUnfinishedBlogPost(this.blogPost);
        }

        if (this._wasCanceled) {
            this._blogPostService.setUnfinishedBlogPost(null);
        }
    }

    ngAfterViewInit(): void {
        let img = document.createElement("img");
        img.src = this.blogPost.image;
        this.cropper.setImage(img);
    }

    submit(): void {
        this.blogPost.image = this.data.image;

        if (this._isUpdate) {
            this._blogPostService.updateBlogPost(this.blogPost);
        }
        else {
            this._blogPostService.submitBlogPost(this.blogPost);
            this._wasNewPostSubmitted = true;
        }

        this._blogPostService.setIsInCreationPage(false, null);
        this._router.navigate(['/app-blog'], { skipLocationChange: true });
    }

    cancel(): void {
        this._wasCanceled = true;
        this._blogPostService.setIsInCreationPage(false, null);
        this._router.navigate(['/app-blog'], { skipLocationChange: true });
    }

    onCrop(event: any): void {
        this.blogPost.image = this.data.image;
    }
}
