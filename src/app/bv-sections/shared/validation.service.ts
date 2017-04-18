import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { IAppInfo } from '../app-info/iapp-info';
import { IProfileModel } from '../profile-info/iprofile-model';
import { IBlogPost } from '../blog/iblog-post';

@Injectable()
export class ValidationService {

  private _appInfoPageValid = false;
  private _profileInfoPageValid = false;
  private _blogValidPage = false;

  private _isAppInfoPageValidSource: Subject<boolean> = new Subject<boolean>();
  isAppInfoPageValid$ = this._isAppInfoPageValidSource.asObservable();

  private _isProfileInfoPageValidSource: Subject<boolean> = new Subject<boolean>();
  isProfileInfoPageValid$ = this._isProfileInfoPageValidSource.asObservable();

  private _blogValidPageSource: Subject<boolean> = new Subject<boolean>();
  blogValidPage$ = this._blogValidPageSource.asObservable();

  constructor() { }

  public setAppInfoValid(appInfoPageValid: boolean) {
    
    this._appInfoPageValid = appInfoPageValid;
    this._isAppInfoPageValidSource.next(appInfoPageValid);
  }

  public setProfileInfoPageValid(profileInfo: IProfileModel) {
    this._profileInfoPageValid = profileInfo.website !== '';
    this._isProfileInfoPageValidSource.next(this._profileInfoPageValid);
  }

  public setBlogValidValid(blogPosts: IBlogPost[]) {
    this._blogValidPage = blogPosts.length > 0;
    this._blogValidPageSource.next(this._blogValidPage);
  }

  public getProfileInfoPageValid(): boolean {
    return this._profileInfoPageValid;
  }

  public getBlogValidPage(): boolean {
    return this._blogValidPage;
  }
}
