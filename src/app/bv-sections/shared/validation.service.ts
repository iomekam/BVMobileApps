import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { IAppInfo } from '../app-info/iapp-info'
import { IProfileModel } from '../profile-info/iprofile-model'
import { IBlogPost } from '../blog/iblog-post';

@Injectable()
export class ValidationService {

  private _appInfoPageValid = false;
  private _profileInfoPageValid = false;
  private _blogValidPage = false;

  private _isValidSource: Subject<boolean> = new Subject<boolean>();
  isValid$ = this._isValidSource.asObservable();

  constructor() { }

  public setAppInfoValid(appInfo: IAppInfo) {
    
    this._appInfoPageValid = appInfo.appName !== '' && appInfo.image.image !== '' && appInfo.keywords.length > 0 && appInfo.longDescription !== '';
    this._isValidSource.next(this.areAllValid());
  }

  public setProfileInfoPageValid(profileInfo: IProfileModel) {
    this._profileInfoPageValid = profileInfo.website !== '';
    this._isValidSource.next(this.areAllValid());
  }

  public setBlogValidValid(blogPosts: IBlogPost[]) {
    this._blogValidPage = blogPosts.length > 0;
    this._isValidSource.next(this.areAllValid());
  }

  private areAllValid(): boolean {
    return this._appInfoPageValid && this._profileInfoPageValid && this._blogValidPage;
  }
}
