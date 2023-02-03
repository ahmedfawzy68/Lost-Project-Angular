import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NewpassService {

  constructor(private _HttpClient:HttpClient) { }


  liveLink:any = 'http://lost.360-courses.com/api/';

  userForgetpass(userEmail:any):Observable<any>
  {
    return this._HttpClient.post(`${this.liveLink}user/reset-password`,userEmail);
  }

  userPincode(userPincode:any):Observable<any>
  {
    return this._HttpClient.post(`${this.liveLink}user/confirm-token`,userPincode);
  }

  userNewpass(userNewpass:any):Observable<any>
  {
    return this._HttpClient.post(`${this.liveLink}user/update-password`,userNewpass);
  }

  ownerForgetpass(ownerEmail:any):Observable<any>
  {
    return this._HttpClient.post(`${this.liveLink}store-owner/reset-password`,ownerEmail);
  }

  ownerPincode(ownerPincode:any):Observable<any>
  {
    return this._HttpClient.post(`${this.liveLink}store-owner/confirm-token`,ownerPincode);
  }

  ownerNewpass(ownerNewpass:any):Observable<any>
  {
    return this._HttpClient.post(`${this.liveLink}store-owner/update-password`,ownerNewpass);
  }

}
