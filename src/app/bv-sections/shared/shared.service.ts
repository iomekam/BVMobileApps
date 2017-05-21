import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  public url: string = "http://localhost:7345";
  public username: string = "iomekam";//localStorage.getItem('username');

}
