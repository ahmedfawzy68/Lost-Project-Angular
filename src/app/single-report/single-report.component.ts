import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';

declare const $: any;

@Component({
  selector: 'app-single-report',
  templateUrl: './single-report.component.html',
  styleUrls: ['./single-report.component.scss'],
})
export class SingleReportComponent implements OnInit {
  reportID: any;
  userReportObject: any;
  ownerReportObject: any;
  remove = false;
  whatsapp = 'https://api.whatsapp.com/send?phone=2';
  location = 'https://www.google.com/maps/search/?api=1&query=';
  mobilecall = 'tel:';

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _DashboardService: DashboardService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.reportID = this._ActivatedRoute.snapshot.params?.['reportID'];
    this.animateSkelton();
    this.getUserSingleReport();
    this.getOwnerSingleReport();
  }

  animateSkelton() {
    setTimeout(() => {
      $('.skeltonItems').fadeOut(500);
    }, 2000);
    setTimeout(() => {
      $('.realItems').fadeIn(500);
    }, 2500);
  }
  getUserSingleReport() {
    if (localStorage.getItem('userToken') != null) {
      this._DashboardService.showReport(this.reportID).subscribe((resp) => {
        if (resp.status == true) {
          this.userReportObject = resp.Data;
          if (this.userReportObject.color == 'mint green') {
            this.userReportObject.color = '#A2E4B8';
          }
          for (let i = 0; i < this._AuthService.Model().length; i++) {
            if (
              this.userReportObject.brand.toLowerCase() ==
              this._AuthService.Model()[i].id.toLowerCase()
            ) {
              for (
                let k = 0;
                k < this._AuthService.Model()[i].items.length;
                k++
              ) {
                if (
                  this.userReportObject.model ==
                  this._AuthService.Model()[i].items[k].name
                ) {
                  this.userReportObject.model =
                    this._AuthService.Model()[i].items[k].label;
                }
              }
            }
          }
          if (this.userReportObject.additional_info == 'null') {
            this.remove = false;
          } else {
            this.remove = true;
          }
        }
      });
    }
  }

  getOwnerSingleReport() {
    if (localStorage.getItem('ownerToken') != null) {
      this._DashboardService
        .ownerSingleReport(this.reportID)
        .subscribe((resp) => {
          if (resp.status == true) {
            this.ownerReportObject = resp.Data;
            if (this.ownerReportObject.color == 'mint green') {
              this.ownerReportObject.color = '#A2E4B8';
            }
            for (let i = 0; i < this._AuthService.Model().length; i++) {
              if (
                this.ownerReportObject.brand.toLowerCase() ==
                this._AuthService.Model()[i].id.toLowerCase()
              ) {
                for (
                  let k = 0;
                  k < this._AuthService.Model()[i].items.length;
                  k++
                ) {
                  if (
                    this.ownerReportObject.model ==
                    this._AuthService.Model()[i].items[k].name
                  ) {
                    this.ownerReportObject.model =
                      this._AuthService.Model()[i].items[k].label;
                  }
                }
              }
            }
            if (this.ownerReportObject.additional_info == 'null') {
              this.remove = false;
            } else {
              this.remove = true;
            }
          } else {
            console.log(resp.msg);
          }
        });
    }
  }
}
