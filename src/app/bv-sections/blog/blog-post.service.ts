import { Injectable } from '@angular/core';
import { IBlogPost } from './iblog-post';
import { Observable } from 'rxjs/Observable';
import { Bounds } from '../../ng2-img-cropper';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

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

    constructor(private _http: Http) {
        this._blogPost = [];

        this.init().takeUntil(this.ngUnsubscribe)
            .subscribe(
                blogPost => {
                    this._blogPost = blogPost;
                    this._init = true;
                    this._blogPostInit.next(this._blogPost);
                    this.ngUnsubscribe.next();
                    this.ngUnsubscribe.complete();
            }
        );
    }

    private init(): Observable<IBlogPost[]> {
        return this._http.get(this._url)
            .map((response: Response) => <IBlogPost[]> response.json())
            .do(data => {
                    let count = 1;
                    data.forEach(
                        blogPost => {
                            blogPost.image = {
                                original: new Image(),
                                image: '',
                                bounds: new Bounds()
                            };

                            blogPost.id = count++; 
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
        blogPost.id = this._highestID;
        blogPost.date = new Date();
        this._blogPost.push(blogPost);

        this._unfinishedBlogPost = null;
    }

    updateBlogPost(updatedBlogPost: IBlogPost): void {
        updatedBlogPost.date = new Date();
    }

    deleteBlogPost(id: number): void {
        const index: number = this._blogPost.findIndex(
            blogPost => {
                return id === blogPost.id;
            }
        );

        if (index === -1) { return; }

        this._blogPost.splice(index, 1);
    }
}
