import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _HttpClient: HttpClient) {}

  liveLink:any = 'http://lost.360-courses.com/api/';

  getAllReport(): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.get(
      `${this.liveLink}store-owner/report/get-all`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  submitReview(reportID: any, thiefData: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.post(
      `${this.liveLink}store-owner/review/submit/${reportID}`,
      thiefData,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  serialSearch(serialData: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');

    const httpParams = new HttpParams({
      fromObject: {
        serial: serialData,
      },
    });

    return this._HttpClient.get(
      `${this.liveLink}store-owner/report/serialSerach`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        params: httpParams,
      }
    );
  }

  detailsSearch(data: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    const httpParams = new HttpParams({
      fromObject: {
        type: data.type,
        brand: data.brand,
        model: data.model,
        color: data.color,
        RAM: data.RAM,
        ROM: data.ROM,
        backCrach_top: data.backCrach_top,
        frontCrach_top: data.frontCrach_top,
        backCrach_bottom: data.backCrach_bottom,
        frontCrach_bottom: data.frontCrach_bottom,
        backCrach_center: data.backCrach_center,
        frontCrach_center: data.frontCrach_center,
        orderBy: data.orderBy,
      },
    });
    console.log(data);
    return this._HttpClient.get(
      `${this.liveLink}store-owner/report/list`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        params: httpParams,
      }
    );
  }

  getUserReport(): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.get(
      `${this.liveLink}user/report/get-all`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  getAllReviews(): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.get(
      `${this.liveLink}user/report/reviews`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  getOwnerInfo(): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.get(
      `${this.liveLink}store-owner/getInfo`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.get(`${this.liveLink}user/getInfo`,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
  }

  showReport(reportID: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.get(
      `${this.liveLink}user/report/show/${reportID}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  changeUserAvatar(userAvatar: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.post(
      `${this.liveLink}user/profile/update-avatar`,
      userAvatar,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }
  changeOwnerAvatar(ownerAvatar: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.post(
      `${this.liveLink}store-owner/profile/update-avatar`,
      ownerAvatar,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  ownerSingleReport(reportID: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.get(
      `${this.liveLink}store-owner/report/get/${reportID}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  userReviewDetails(reportID: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.get(
      `${this.liveLink}user/report/review/${reportID}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }
}
