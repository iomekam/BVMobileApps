import { Injectable } from '@angular/core';
import { IBlogPost } from './iblog-post';

@Injectable()
export class BlogPostService {

    private _blogPost: IBlogPost[];
    private _highestID: number = 0;

    getBlogPost(id: number): IBlogPost {
        return this._blogPost.find(
            blogPost => {
                return id == blogPost.id;
            }
        );
    }

    getBlogPosts(): IBlogPost[] {
        return this._blogPost;
    }

    submitBlogPost(blogPost: IBlogPost): void {
        this._highestID++;
        blogPost.id = this._highestID;
        this._blogPost.push(blogPost);
    }

    updateBlogPost(updatedBlogPost: IBlogPost): void {
        
    }

    deleteBlogPost(id: number): void {
        let index: number = this._blogPost.findIndex(
            blogPost => {
                return id == blogPost.id;
            }
        );

        this._blogPost.splice(index, 1);
    }

    constructor() {
        this._blogPost = [];
    }

}
