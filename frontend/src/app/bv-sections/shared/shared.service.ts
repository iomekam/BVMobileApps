import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SharedService {

  public url: string = environment.production === false ? "http://localhost:7345" : "http://bvmobileapps2017.azurewebsites.net";
  public username: string = "bvMobileAppsTestAccount";
  public redirectUrl: string = "";

  public isOfflineMode(): boolean {
    return this.username  === "bvMobileAppsTestAccounts";
  }
  public onHttpError(error: any): void {
    if(this.redirectUrl) {
        console.log("redirect");
        window.location.href = this.redirectUrl;
    }
    
  }
}
