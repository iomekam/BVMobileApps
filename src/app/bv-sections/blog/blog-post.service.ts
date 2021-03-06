import { Injectable } from '@angular/core';
import { IBlogPost } from './iblog-post';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlogPostService {

    private _blogPost: IBlogPost[];
    private _unfinishedBlogPost: IBlogPost;

    private _highestID = 0;
    private _isInCreationPage = false;
    private _currentUpdateID = 0;

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

    getBlogPosts(): Observable<IBlogPost[]> {
        this._blogPost = this._blogPost.sort(
            (a: IBlogPost, b: IBlogPost) => {
              if (b.date > a.date) { return 1; }
              if (b.date < a.date) { return -1; }

              return 0;
            }
        );

        return Observable.of(this._blogPost);
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

    constructor() {
        this._blogPost = [];
    }

}
