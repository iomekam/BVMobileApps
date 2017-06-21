import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SharedService {

  public serverLocation: string = "http://bvmobileapps2017.azurewebsites.net";
  public url: string = environment.production === false ? "http://localhost:7345" : this.serverLocation;
  public username: string = "username";
  public redirectUrl: string = "";
  private offlineMode = true;

  public isOfflineMode(): boolean {
    return this.offlineMode;
  }
  public onHttpError(error: any): void {
    if(this.redirectUrl) {
        window.location.href = this.redirectUrl;
    }
    
  }
}
