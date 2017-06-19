import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SharedService {

  public url: string = environment.production === false ? "http://localhost:7345" : "http://bvmobileapps2017.azurewebsites.net";
  public username: string = "username";//localStorage.getItem('username');
  public id: number = -1;

  public onHttpError(error: any): void {
    console.log("redirect");
  }
}
