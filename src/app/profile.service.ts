import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private _HttpClient: HttpClient) {}

  liveLink:any = 'http://lost.360-courses.com/api/';

  changeOwnerPass(password: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.post(
      `${this.liveLink}store-owner/profile/change-password`,
      password,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  changeUserPass(password: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.post(
      `${this.liveLink}user/profile/change-password`,
      password,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  changeOwnerInfo(ownerInfo: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.post(
      `${this.liveLink}store-owner/profile/update-info`,
      ownerInfo,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  changeUserInfo(userInfo: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.post(
      `${this.liveLink}user/profile/update-info`,
      userInfo,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  changeUserContact(userContact: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.post(
      `${this.liveLink}user/profile/update-contact`,
      userContact,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  changeUserReport(userReport: any, reportID: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.post(
      `${this.liveLink}user/report/update/${reportID}`,
      userReport,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }
  changeStoreInfo(storeData: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.post(
      `${this.liveLink}store-owner/profile/update-store`,
      storeData,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  deleteUserReport(reportID: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.delete(
      `${this.liveLink}user/report/delete/${reportID}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  showReview(reviewID: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.get(
      `${this.liveLink}store-owner/review/show/${reviewID}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  ownReviews(): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.get(
      `${this.liveLink}store-owner/review/get-all`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  changeReview(reviewID: any, reviewData: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.post(
      `${this.liveLink}store-owner/review/update/${reviewID}`,
      reviewData,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  deleteReview(reviewID: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.delete(
      `${this.liveLink}store-owner/review/delete/${reviewID}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }
}
