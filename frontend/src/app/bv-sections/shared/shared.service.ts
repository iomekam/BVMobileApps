import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SharedService {

  public url: string = environment.production === false ? "http://localhost:7345" : "http://bvmobileapps2017.azurewebsites.net";
  public username: string = "iomekam";//localStorage.getItem('username');
  public id: number;
  public showHeader = false; // hack for login page
}
