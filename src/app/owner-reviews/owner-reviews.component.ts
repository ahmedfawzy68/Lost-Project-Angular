import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';


declare const $: any;

@Component({
  selector: 'app-owner-reviews',
  templateUrl: './owner-reviews.component.html',
  styleUrls: ['./owner-reviews.component.scss'],
  providers:[MessageService]
})
export class OwnerReviewsComponent implements OnInit {
  allReviewsArray: any;
  allReviews: any;
  success:any;
  error:any;

  updateReviewForm: FormGroup = new FormGroup({
    theifName: new FormControl(null, [Validators.required]),
    theifNatID: new FormControl(null, [Validators.required]),
    theifMobile: new FormControl(null),
    theifPicture: new FormControl(null),
    additional_info: new FormControl(null),
  });

  constructor(
    private _ProfileService: ProfileService,
    private _AuthService: AuthService,
    private _MessageService:MessageService
  ) {}

  ngOnInit(): void {
    this.animateSkelton();
    this.ownReviews();
  }

  delete(reviewID: any) {
    this._ProfileService.deleteReview(reviewID).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
  }


 

  ownReviews() {
    this._ProfileService.ownReviews().subscribe((resp) => {
      if (resp.status == true) {
        this.allReviews = resp.Data;
        // for (let j = 0; j < this.allReviews.length; j++) {
        //   for (let i = 0; i < this._AuthService.Model().length; i++) {
        //     if (
        //       this.allReviews[j].Report.brand.toLowerCase() ==
        //       this._AuthService.Model()[i].id.toLowerCase()
        //     ) {
        //       for (
        //         let k = 0;
        //         k < this._AuthService.Model()[i].items.length;
        //         k++
        //       ) {
        //         if (
        //           this.allReviews[j].Report.model ==
        //           this._AuthService.Model()[i].items[k].name
        //         ) {
        //           this.allReviews[j].Report.model =
        //             this._AuthService.Model()[i].items[k].label;
        //         }
        //       }
        //     }
        //   }
        // }
      }
    });
  }

  animateSkelton() {
    setTimeout(() => {
      $('.skeltonItems').fadeOut(500);
    }, 2000);
    setTimeout(() => {
      $('.realItems').fadeIn(500);
    }, 2500);
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
