import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCropperComponent, CropperSettings, Bounds } from '../../../ng2-img-cropper';
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

    @Input('blogPost') private blogPost: IBlogPost;

    @ViewChild('cropper', undefined)
    private cropper: ImageCropperComponent;

    private cropperSettings: CropperSettings;

    private _activatedRouteSub: Subscription;

    private _isUpdate = false;

    private _wasNewPostSubmitted = false;
    private _wasCanceled = false;

    private form: FormGroup;
    private isTagTouched = false;

    private readonly headlineErrorMessage = 'A headline is required';
    private readonly blogErrorMessage = 'Your blog post must have content';
    private readonly keywordEmptyErrorMessage = 'A keyword is required';

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
        });

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 700;
        this.cropperSettings.height = 700;
        this.cropperSettings.croppedWidth = 700;
        this.cropperSettings.croppedHeight = 700;
        this.cropperSettings.canvasWidth = 700;
        this.cropperSettings.canvasHeight = 700;

        // Config used by ckeditor
        this.config = {
            toolbarGroups: [
                { 'name': 'basicstyles', 'groups': ['basicstyles'] },
                { 'name': 'links', 'groups': ['links'] },
                { 'name': 'paragraph', 'groups': ['list', 'blocks'] },
                { 'name': 'document', 'groups': ['mode'] },
                { 'name': 'insert', 'groups': ['insert'] },
                { 'name': 'styles', 'groups': ['styles'] },
                { 'name': 'about', 'groups': ['about'] }
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

        // If the update is nan, we have an unfinished blog post
        if (isNaN(updateID)) {
            this.blogPost = this._blogPostService.getUnfinishedBlogPost();

            if (this.blogPost == null) {
                this.blogPost = {
                    headline: '',
                    body: '',
                    image: {
                        original: new Image(),
                        originalBase64: '',
                        image: '',
                        bounds: new Bounds()
                    },
                    keywords: [],
                    id: 0,
                    date: new Date(),
                    isUnfinished: false
                };
            }
        }
        else {
            this.blogPost = this._blogPostService.getBlogPost(updateID);
        }

        this._isUpdate = !isNaN(updateID);

        // We set setIsInCreationPage to indicate that we are in the middle of creating/updating a blog post.
        // This allows for navigation to go straight to the blog creation page instead of the blog list
        // when navigated back to the blog section
        this._blogPostService.setIsInCreationPage(true, updateID);
    }

    ngOnDestroy(): void {
        // If this is not an update, nor a submitted blog post, then this entry is considered
        // unfinished
        if (!this._isUpdate && !this._wasCanceled && this._wasNewPostSubmitted === false) {
            this._blogPostService.setUnfinishedBlogPost(this.blogPost);
        }

        // If we cancel the entry, then it is no longer considered unfinished
        if (this._wasCanceled) {
            this._blogPostService.setUnfinishedBlogPost(null);
        }
    }

    @HostListener('window:beforeunload')
    onRefresh() {
      //this._blogPostService.setUnfinishedBlogPost(this.blogPost);
      this.blogPost.image.originalBase64 = this.blogPost.image.original.src;
      this.blogPost.isUnfinished = true;

      let xhr = new XMLHttpRequest();
      
      xhr.open("PUT", this._blogPostService.getUrl(), false);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(this.blogPost));
    }

    ngAfterViewInit(): void {
        this.cropper.setImage(this.blogPost.image.original, this.blogPost.image.bounds);
    }

    submit(): void {
        this.blogPost.isUnfinished = false;

        // Update and post are different operations to the backend service,
        // so we need to be able to distingish between them
        if (this._isUpdate) {
            this._blogPostService.updateBlogPost(this.blogPost);
        }
        else {
            this._blogPostService.submitBlogPost(this.blogPost);
            this._wasNewPostSubmitted = true;
        }

        // submitted/updating a post means that we are done creating
        this._blogPostService.setIsInCreationPage(false, null);
        this._router.navigate(['/app-blog/blog-list'], { skipLocationChange: true });
    }

    cancel(): void {
        this._wasCanceled = true;
        this._blogPostService.setIsInCreationPage(false, null);

        if(this.blogPost.isUnfinished) {
            this.blogPost.isUnfinished = false;
            this._blogPostService.deleteBlogPost(this.blogPost.id);
        }

        this._router.navigate(['/app-blog/blog-list'], { skipLocationChange: true });
    }

    onCrop(bounds: Bounds): void {
        this.blogPost.image.bounds = bounds;
    }

    private onTagLostFocus(message: string): void {
        this.isTagTouched = true;
    }
}
