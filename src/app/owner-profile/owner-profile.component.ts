import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';
import { ProfileService } from '../profile.service';

declare const $: any;

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.scss'],
  providers: [MessageService],
})
export class OwnerProfileComponent implements OnInit {
  error: any;
  success: any;
  singleReview: any;

  cities:any =[];
  selectedCity:any;

  profile_store: FormGroup = new FormGroup({
    firstName: new FormControl(null), /////
    lastName: new FormControl(null),
    email: new FormControl(null),
    national_id: new FormControl(null),
    current_password: new FormControl(null, [Validators.required]),
    new_password: new FormControl(null, [Validators.required]),
    new_confirm_password: new FormControl(null, [Validators.required]),
    mobile_1: new FormControl(null),
    mobile_2: new FormControl(null),
    government: new FormControl(null),
    city: new FormControl(null),
    street: new FormControl(null),
    address1: new FormControl(null),
    address2: new FormControl(null),
    facebookLink: new FormControl(null),
    whatsapp: new FormControl(null),
    serialNumber: new FormControl(null),
    additional_info: new FormControl(null),
  });
  newPersonal: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile: new FormControl(null),
  });

  avatarForm: FormGroup = new FormGroup({
    avatar: new FormControl(null, [Validators.required]),
  });

  Store_info: FormGroup = new FormGroup({
    government: new FormControl(null, [Validators.required]),
    storeName: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    facebookLink: new FormControl(null),
    whatsapp: new FormControl(null),
    storeMobile_1: new FormControl(null, [Validators.required]),
  });

  newPass: FormGroup = new FormGroup({
    current_password: new FormControl(null, [Validators.required]),
    new_password: new FormControl(null, [Validators.required]),
    new_confirm_password: new FormControl(null, [Validators.required]),
  });

  updateReviewForm: FormGroup = new FormGroup({
    theifName: new FormControl(null, [Validators.required]),
    theifNatID: new FormControl(null, [Validators.required]),
    theifMobile: new FormControl(null),
    theifPicture: new FormControl(null),
    additional_info: new FormControl(null),
  });

  info: any;
  allReviews: any;
  reviewID: any;
  Government:any;
  city:any;

  constructor(
    private _ProfileService: ProfileService,
    private _Router: Router,
    private _AuthService: AuthService,
    private _MessageService: MessageService,
    private _DashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getInfo();
    this.ownReviews();
    this.Government = this._AuthService.Government();
    this.city = this.cities;
    
  }

  submitNewInfo(newPersonal: FormGroup) {
    if (newPersonal.get('firstName')?.value == null) {
      newPersonal.get('firstName')?.setValue(this.info.firstName);
    }
    if (newPersonal.get('lastName')?.value == null) {
      newPersonal.get('lastName')?.setValue(this.info.lastName);
    }
    if (newPersonal.get('email')?.value == null) {
      newPersonal.get('email')?.setValue(this.info.email);
    }
    if (newPersonal.get('mobile')?.value == null) {
      newPersonal.get('mobile')?.setValue(this.info.mobile);
    }
    this._ProfileService
      .changeOwnerInfo(newPersonal.value)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          setTimeout(() => {
            this._Router.navigate(['ownerDashboard']);
          }, 1500);
        } else {
          this.error = resp.msg;
          this.showError();
        }
      });
  }

  getInfo() {
    this._DashboardService.getOwnerInfo().subscribe((resp) => {
      if (resp.status == true) {
        this.info = resp.Data;
        this._AuthService.Government().forEach(g => {
          if(this.info.Store.government == g.id){
           this._AuthService.city().forEach(c => {
            if(c.id == g.id){
              this.cities.push(c);
            }
           });
          }
        });
        this.selectedCity = this.info.Store.city;
        this.Store_info.get('city')?.setValue(this.selectedCity)
      } else {
        console.log(resp.msg);
      }
    });
  }

  selectCity(event: any) {
    this.city = this._AuthService.city().filter((e) => e.id == event.value);
  }

  submitNewStore(Store_info: FormGroup) {
    if (Store_info.get('storeName')?.value == null) {
      Store_info.get('storeName')?.setValue(this.info.Store.storeName);
    }
    if (Store_info.get('government')?.value == null) {
      Store_info.get('government')?.setValue(this.info.Store.government);
    }
    if (Store_info.get('city')?.value == null) {
      Store_info.get('city')?.setValue(this.info.Store.city);
    }
    if (Store_info.get('street')?.value == null) {
      Store_info.get('street')?.setValue(this.info.Store.street);
    }
    if (Store_info.get('storeMobile_1')?.value == null) {
      Store_info.get('storeMobile_1')?.setValue(this.info.Store.storeMobile_1);
    }
    if (Store_info.get('facebookLink')?.value == null) {
      Store_info.get('facebookLink')?.setValue(this.info.Store.facebookLink);
    }
    if (Store_info.get('whatsapp')?.value == null) {
      Store_info.get('whatsapp')?.setValue(this.info.Store.whatsapp);
    }
    
    this._ProfileService.changeStoreInfo(Store_info.value).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => this._Router.navigate(['/ownerDashboard']), 1500);
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
  }

  changeReview() {
    if (this.updateReviewForm.get('theifName')?.value == null) {
      this.updateReviewForm
        .get('theifName')
        ?.setValue(this.singleReview.theifName);
    }
    if (this.updateReviewForm.get('theifNatID')?.value == null) {
      this.updateReviewForm
        .get('theifNatID')
        ?.setValue(this.singleReview.theifNatID);
    }
    if (this.updateReviewForm.get('theifMobile')?.value == null) {
      this.updateReviewForm
        .get('theifMobile')
        ?.setValue(this.singleReview.theifMobile);
    }
    if (this.updateReviewForm.get('additional_info')?.value == null) {
      this.updateReviewForm
        .get('additional_info')
        ?.setValue(this.singleReview.additional_info);
    }
    
    if(this.updateReviewForm.value=='http://127.0.0.1:8000/assets/defult-theif-avatar.png'){
      this.updateReviewForm.value == null
    }

    const formData = new FormData();

    formData.append('theifName', this.updateReviewForm.value.theifName);
    formData.append('theifNatID', this.updateReviewForm.value.theifNatID);
    formData.append('theifMobile', this.updateReviewForm.value.theifMobile);
    formData.append('theifPicture', this.updateReviewForm.value.theifPicture);
    formData.append(
      'additional_info',
      this.updateReviewForm.value.additional_info
    );
    
    if (this.updateReviewForm.value.theifPicture == null) {
      formData.delete('theifPicture');
    }

    

    this._ProfileService
      .changeReview(this.reviewID, formData)
      .subscribe((resp) => {
        // alert(resp.msg)
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          this.close();
          setTimeout(() => {
          location.reload();
          }, 1000);
        } else {
          this.error = resp.msg;
          this.showError();
        }
      });
  }

  changeAvatar() {
    const formData = new FormData();
    formData.append('avatar', this.avatarForm.value.avatar);
    this._DashboardService.changeOwnerAvatar(formData).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
      } else {
        console.log(resp.msg);
        this.error = resp.msg;
        this.showError();
      }
    });
  }

  ownerAvatar(event: any) {
    const selectedFile = event.target.files[0];
    this.avatarForm.get('avatar')?.setValue(selectedFile);

    var image = URL.createObjectURL(event.target.files[0]);
    var imageDiv = document.getElementById('file_upload');
    var newImg = document.createElement('img');
    if (imageDiv != null) {
      imageDiv.innerHTML = '';
    }
    newImg.src = image;
    imageDiv?.appendChild(newImg);
    newImg.width = 200;
    newImg.height = 200;
    newImg.className = 'rounded-circle';
    this.changeAvatar();
  }

  showReview() {
    this._ProfileService.showReview(this.reviewID).subscribe((resp) => {
      if (resp.status == true) {
        this.singleReview = resp.Data;
        $('.parentPopup').fadeIn(500);
        $('.parentPopup').css('display', 'flex');
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
  }

  deleteReview(reviewID:any){
    this._ProfileService.deleteReview(reviewID).subscribe((resp)=>{
      if(resp.status == true){
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => {
        location.reload();
        }, 1000);
      }
      else{
        this.error = resp.msg;
        this.showError();
      }
    })
  }

  thiefAvatar(event: any) {
    const selectedFile = event.target.files[0];
    this.updateReviewForm.get('theifPicture')?.setValue(selectedFile);
    var image = URL.createObjectURL(event.target.files[0]);
    var imageDiv = document.getElementById('oFile_upload');
    var newImg = document.createElement('img');
    if (imageDiv != null) {
      imageDiv.innerHTML = ' ';
    }
    newImg.src = image;
    imageDiv?.appendChild(newImg);
    newImg.width = 300;
    newImg.height = 300;
    newImg.className = 'rounded-circle';
  }

  ownReviews() {
    this._ProfileService.ownReviews().subscribe((resp) => {
      if (resp.status == true) {
        this.allReviews = resp.Data;
        
      } else {
        this.error = resp.msg;
      }
    });
  }

  submitNewPass(newPass: FormGroup) {
    this._ProfileService.changeOwnerPass(newPass.value).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => this._Router.navigate(['/ownerDashboard']), 1500);
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
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
  popup(reviewID: any) {
    console.log(reviewID);
    this.reviewID = reviewID;
    this.showReview();
  }

  close() {
    $('.parentPopup').fadeOut(500);
  }
}
