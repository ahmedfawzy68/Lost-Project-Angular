import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';
import { ProfileService } from '../profile.service';



declare const $: any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  providers:[MessageService]
})
export class ReviewsComponent implements OnInit {
  allReviewsArray: any;
  allReviews:any = [];
  success:any;
  error:any;


  constructor(private _DashboardService: DashboardService,private _AuthService:AuthService,private _ProfileService:ProfileService,private _MessageService:MessageService) {}

  ngOnInit(): void {
    this.animateSkelton();
    this.printAllReviews();
    this.ownReviews();
  }

 

  printAllReviews() {
    this._DashboardService.getAllReviews().subscribe((resp) => {
      if (resp.status == true) {
        this.allReviewsArray = resp.Data;
        console.log(this.allReviewsArray);
        
        for (let j = 0; j < this.allReviewsArray.length; j++) {
          for (let i = 0; i < this._AuthService.Model().length; i++) {
            if (
              this.allReviewsArray[j].Report.brand.toLowerCase() ==
              this._AuthService.Model()[i].id.toLowerCase()
            ) {
              for (
                let k = 0;
                k < this._AuthService.Model()[i].items.length;
                k++
              ) {
                if (
                  this.allReviewsArray[j].Report.model ==this._AuthService.Model()[i].items[k].name
                ) {
                  this.allReviewsArray[j].Report.model =this._AuthService.Model()[i].items[k].label;
                }
              }
            }
          }
        }
      } else {
        console.log(resp.msg, resp.status);
      }
    });
  }

  ownReviews() {
    this._ProfileService.ownReviews().subscribe((resp) => {
      if (resp.status == true) {
        this.allReviews = resp.Data;
        
      } else {
        console.log(resp.msg);
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
