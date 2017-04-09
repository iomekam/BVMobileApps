import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { IBlogPost } from '../iblog-post';
import { BlogPostService } from '../blog-post.service';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    private form: FormGroup;
    private isTagTouched: boolean = false;

    private readonly headlineErrorMessage: string = "A headline is required";
    private readonly blogErrorMessage: string = "Your blog post must have content";
    private readonly keywordEmptyErrorMessage: string = "A keyword is required";

    private config: any;

    constructor(
        form: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _blogPostService: BlogPostService) {

        this.form = form.group({
            headline: ['', Validators.compose([Validators.required])],
            blog: ['', Validators.compose([Validators.required])],
            keywords: [[], Validators.required]
        })

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 700;
        this.cropperSettings.height = 700;
        this.cropperSettings.croppedWidth = 700;
        this.cropperSettings.croppedHeight = 700;
        this.cropperSettings.canvasWidth = 700;
        this.cropperSettings.canvasHeight = 700;

        this.data = {};

        this.config = {
            toolbarGroups: [
                { "name": "basicstyles", "groups": ["basicstyles"] },
                { "name": "links", "groups": ["links"] },
                { "name": "paragraph", "groups": ["list", "blocks"] },
                { "name": "document", "groups": ["mode"] },
                { "name": "insert", "groups": ["insert"] },
                { "name": "styles", "groups": ["styles"] },
                { "name": "about", "groups": ["about"] }
            ],
            // Remove the redundant buttons from toolbar groups defined above.
            removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar',
            extraPlugins: 'divarea'
        };
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
        this._router.navigate(['/app-blog/blog-list'], { skipLocationChange: true });
    }

    cancel(): void {
        this._wasCanceled = true;
        this._blogPostService.setIsInCreationPage(false, null);
        this._router.navigate(['/app-blog/blog-list'], { skipLocationChange: true });
    }

    onCrop(event: any): void {
        this.blogPost.image = this.data.image;
    }

    private onTagLostFocus(message: string): void {
        this.isTagTouched = true;
    }
}
