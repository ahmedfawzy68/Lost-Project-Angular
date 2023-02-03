import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../dashboard.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.scss'],
  providers: [MessageService],
})
export class SingleReviewComponent implements OnInit {
  reviewID: any;
  singleReview: any;
  singleOwnerReview: any;
  whatsapp = 'https://api.whatsapp.com/send?phone=2';
  location = 'https://www.google.com/maps/search/?api=1&query=';
  tel = 'tel:';
  remove: boolean = false;
  error: any;
  success: any;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _DashboardService: DashboardService,
    private _ProfileService: ProfileService,
    private _MessageService: MessageService
  ) {}

  ngOnInit(): void {
    this.reviewID = this._ActivatedRoute.snapshot.params?.['reviewID'];
    this.getReview();
    this.getownerReview();
  }

  getReview() {
    if (localStorage.getItem('userToken') != null) {
      this._DashboardService
        .userReviewDetails(this.reviewID)
        .subscribe((resp) => {
          if (resp.status == true) {
            this.singleReview = resp.Data;
            if (this.singleReview.additional_info == null) {
              this.remove == true;
            } else {
              this.remove == false;
            }
          } else {
            this.error = this.showError();
          }
        });
    }
  }

  getownerReview() {
    if (localStorage.getItem('ownerToken') != null) {
      this._ProfileService.showReview(this.reviewID).subscribe((resp) => {
        if (resp.status == true) {
          this.singleOwnerReview = resp.Data;
          if (this.singleOwnerReview.additional_info == null) {
            this.remove = false;
          } else {
            this.remove = true;
          }
        } else {
          this.error = this.showError();
        }
      });
    }
  }
  showSuccess() {
    this._MessageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.success,
    });
  }
  showError() {
    this._MessageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.error,
    });
  }
}
