import { Injectable } from '@angular/core';
import { IBlogPost } from './iblog-post';
import { Observable } from 'rxjs/Observable';
import { Bounds } from '../../ng2-img-cropper';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { ValidationService } from '../shared/validation.service'
import { SharedService } from '../shared/shared.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class BlogPostService {

    private _blogPost: IBlogPost[];
    private _unfinishedBlogPost: IBlogPost;

    private _highestID = 0;
    private _isInCreationPage = false;
    private _currentUpdateID = 0;

    private _url = '/api/blogs';

    private httpPutUnsubscribe = new Subject<void>();
    private httpUpdateUnsubscribe = new Subject<void>();
    private httpDeleteUnsubscribe = new Subject<void>();

    constructor(
        private _validationService: ValidationService,
        private _sharedService: SharedService,
        private _authHttp: AuthHttp) {
        this._blogPost = [];
        this._url = this._sharedService.url + this._url;
    }

    public setDataAfterFetch(blogPost: IBlogPost[]) {
        if(blogPost === null) {
            this._blogPost = [];
        }
        else {
            this._blogPost = blogPost;
        }
        
        this._validationService.setBlogValid(this.isValid());
     }

    public fetchData() : Observable<IBlogPost[]> {
        return this.init();
    }

    public isValid(): boolean {
        return this._blogPost.length > 0;
    }

    private init(): Observable<IBlogPost[]> {
        if(this._sharedService.isOfflineMode()) {
            return;
        }

        return this._authHttp.get(this._url)
            .map((response: Response) => <IBlogPost[]> response.json())
            .do(data => {
                    data.forEach(
                        blogPost => {
                            if(blogPost.isUnfinished === true) {
                                this.setIsInCreationPage(true, blogPost.id);
                            }

                            if(blogPost.keywords === null) {
                                blogPost.keywords = [];
                            }
                            
                            let image = new Image();
                            image.src = blogPost.image.originalBase64;
                            blogPost.image = {
                                original: image,
                                originalBase64: blogPost.image.originalBase64,
                                image: blogPost.image.image,
                                bounds: new Bounds(blogPost.image.bounds.left, blogPost.image.bounds.top, blogPost.image.bounds.right - blogPost.image.bounds.left, blogPost.image.bounds.bottom - blogPost.image.bounds.top)
                            };
                        }
                    );
                }
            );
    }

    isInCreationPage(): boolean {
        return this._isInCreationPage;
    }

    setIsInCreationPage(isCreation: boolean, updateID: number): void {
        this._isInCreationPage = isCreation;
        this._currentUpdateID = updateID;
    }

    getUpdateId(): number {
        return this._currentUpdateID;
    }

    getBlogPost(id: number): IBlogPost {
        return this._blogPost.find(
            blogPost => {
                return id === blogPost.id;
            }
        );
    }

    setUnfinishedBlogPost(blogPost: IBlogPost): void {
        if(blogPost !== null) {
            blogPost.isUnfinished = blogPost !== null;
        }
        
        this._unfinishedBlogPost = blogPost;
    }

    getUnfinishedBlogPost(): IBlogPost {
        return this._unfinishedBlogPost;
    }

    sortBlogPosts() {
        this._blogPost = this._blogPost.sort(
            (a: IBlogPost, b: IBlogPost) => {
              if (b.date > a.date) { return 1; }
              if (b.date < a.date) { return -1; }

              return 0;
            }
        );
    }

    getBlogPosts() {
        return this._blogPost;
    }

    submitBlogPost(blogPost: IBlogPost): void {
        this._highestID++;
        blogPost.date = new Date();
        blogPost.image.originalBase64 = blogPost.image.original.src;
        this._blogPost.push(blogPost);

        this._unfinishedBlogPost = null;

        if(this._sharedService.isOfflineMode()) {
            return;
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        this._authHttp.put(this._url, JSON.stringify(blogPost), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        blogPost.id = (<IBlogPost> data.json()).id;
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => this._sharedService.onHttpError(error));
    }

    updateBlogPost(updatedBlogPost: IBlogPost): void {
        updatedBlogPost.date = new Date();

        if(this._sharedService.isOfflineMode()) {
            return;
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        this._authHttp.put(this._url, JSON.stringify(updatedBlogPost), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        this.httpUpdateUnsubscribe.next();
                        this.httpUpdateUnsubscribe.complete();
                    },
                    error => this._sharedService.onHttpError(error));
    }

    getUrl(): string {
        return this._url;
    }

    deleteBlogPost(id: number): void {
        const index: number = this._blogPost.findIndex(
            blogPost => {
                return id === blogPost.id;
            }
        );

        if (index === -1) { return; }

        const deletedBlogPost = this._blogPost[index];

        this._blogPost.splice(index, 1);

        if(this._sharedService.isOfflineMode()) {
            return;
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers, body: deletedBlogPost});
        this._authHttp.delete(this._url, options)
                .takeUntil(this.httpDeleteUnsubscribe)
                .subscribe(
                    data => {
                        this.httpDeleteUnsubscribe.next();
                        this.httpDeleteUnsubscribe.complete();
                    },
                    error => this._sharedService.onHttpError(error));
    }
}
