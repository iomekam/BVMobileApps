import { Injectable } from '@angular/core';
import { IBlogPost } from './iblog-post';
import { Observable } from 'rxjs/Observable';
import { Bounds } from '../../ng2-img-cropper';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { ValidationService } from '../shared/validation.service'

@Injectable()
export class BlogPostService {

    private _blogPost: IBlogPost[];
    private _unfinishedBlogPost: IBlogPost;

    private _highestID = 0;
    private _isInCreationPage = false;
    private _currentUpdateID = 0;

    private _url = 'http://localhost:7345/api/blogs/1';

    private ngUnsubscribe = new Subject<void>();
    private httpPutUnsubscribe = new Subject<void>();

    private _blogPostInit = new Subject<IBlogPost[]>();
    private _init = false;

    constructor(
        private _http: Http,
        private _validationService: ValidationService) {
        this._blogPost = [];

        this.init().takeUntil(this.ngUnsubscribe)
            .subscribe(
                blogPost => {
                    this._blogPost = blogPost;
                    this._init = true;
                    this._blogPostInit.next(this._blogPost);
                    _validationService.setBlogValidValid(this._blogPost);
                    this.ngUnsubscribe.next();
                    this.ngUnsubscribe.complete();
            }
        );
    }

    private init(): Observable<IBlogPost[]> {
        return this._http.get(this._url)
            .map((response: Response) => <IBlogPost[]> response.json())
            .do(data => {
                    data.forEach(
                        blogPost => {
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

    getBlogPosts(): Observable<IBlogPost[]> {
        if (!this._init) {
            this._blogPostInit.next(this._blogPost);
            return this._blogPostInit.asObservable();
        }
        else {
            this.sortBlogPosts();
            return Observable.of(this._blogPost);
        }
    }

    submitBlogPost(blogPost: IBlogPost): void {
        this._highestID++;
        blogPost.date = new Date();
        blogPost.image.originalBase64 = blogPost.image.original.src;
        this._blogPost.push(blogPost);

        this._unfinishedBlogPost = null;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        this._http.put(this._url, JSON.stringify(blogPost), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        blogPost.id = (<IBlogPost> data.json()).id;
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => console.log(JSON.stringify(error))
        );
    }

    updateBlogPost(updatedBlogPost: IBlogPost): void {
        updatedBlogPost.date = new Date();

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        this._http.put(this._url, JSON.stringify(updatedBlogPost), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => console.log(JSON.stringify(error))
        );
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

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers, body: deletedBlogPost});
        this._http.delete(this._url, options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => console.log(JSON.stringify(error))
        );
    }
}
