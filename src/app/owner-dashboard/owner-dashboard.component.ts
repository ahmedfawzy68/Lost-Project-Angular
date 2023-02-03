import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';

declare const $: any;

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss'],
  providers: [MessageService],
})
export class OwnerDashboardComponent implements OnInit {
  success: any;
  error: any;
  filtersArray: any;
  allReportsArray: any;
  info: any;
  reportID: any;
  empty = false;

  filtersForm: FormGroup = new FormGroup({
    type: new FormControl(null),
    brand: new FormControl(null),
    model: new FormControl(null),
    color: new FormControl(null),
    orderBy: new FormControl(null),
    RAM: new FormControl(null),
    ROM: new FormControl(null),
    frontCrash_top:new FormControl(null),
    frontCrash_center:new FormControl(null),
    frontCrash_bottom:new FormControl(null),
    backCrash_top:new FormControl(null),
    backCrash_center:new FormControl(null),
    backCrash_bottom:new FormControl(null),
  });

  avatarForm: FormGroup = new FormGroup({
    avatar: new FormControl(null, [Validators.required]),
  });

  reviewForm: FormGroup = new FormGroup({
    theifName: new FormControl(null, [Validators.required]),
    theifNatID: new FormControl(null, [Validators.required]),
    theifMobile: new FormControl(null, [Validators.required]),
    theifPicture: new FormControl(null),
    additional_info: new FormControl(null),
  });
  Type: any;
  Brand: any;
  Model: any;
  Color: any;
  RAM: any;
  ROM: any;
  fraction: any;
  time: any;
  check2: boolean = false;

  constructor(
    private _DashboardService: DashboardService,
    private _MessageService: MessageService,
    private _AuthService: AuthService
  ) {}

  selectBrand(event: any) {
    this.Brand = this._AuthService.Brand().filter((e) => e.id == event.value);
  }
  selectModel(event: any) {
    this.Model = this._AuthService.Model().filter((e) => e.id == event.value);
  }

  animateSkelton() {
    setTimeout(() => {
      $('.skeltonItems').fadeOut(500);
    }, 2000);
    setTimeout(() => {
      $('.realItems').fadeIn(500);
    }, 2500);
  }

  ngOnInit(): void {

    document.addEventListener('keyup', (clickEvent: KeyboardEvent) => {
      if (clickEvent.key == 'Escape') {
        this.close();
      }
    });

    this.animateSkelton();
    this.printAllReport();
    this.getInfo();
    this.Type = this._AuthService.Type();
    this.Color = [
      { name: 'black', icon: 'Black' },
      { name: 'white', icon: 'White' },
      { name: 'silver', icon: 'Silver' },
      { name: 'red', icon: 'Red' },
      { name: 'blue', icon: 'Blue' },
      { name: 'mint green', icon: '#A2E4B8' },
      { name: 'purple', icon: 'Purple' },
    ];
    this.fraction = [
      {
        label: 'Front',
        items: [
          { label: 'Top', FormControl: 'frontCrash_top' },
          { label: 'Center', FormControl: 'frontCrash_center' },
          { label: 'Bottom', FormControl: 'frontCrash_bottom' },
        ],
      },
      {
        label: 'Back',
        items: [
          { label: 'Top', FormControl: 'frontCrash_top' },
          { label: 'Center', FormControl: 'frontCrash_center' },
          { label: 'Bottom', FormControl: 'frontCrash_bottom' },
        ],
      },
    ];
    this.RAM = [
      { name: '4GB', value: 4 },
      { name: '6GB', value: 6 },
      { name: '8GB', value: 8 },
      { name: '16GB', value: 16 },
    ];
    this.time = [
      { name: 'Latest', value: 'ASC' },
      { name: 'Newest', value: 'DESC' },
    ];
    this.ROM = [
      { name: '16GB', value: 16 },
      { name: '32GB', value: 32 },
      { name: '64GB', value: 64 },
      { name: '128GB', value: 128 },
      { name: '256GB', value: 256 },
    ];
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

  closeSingleReport() {
    $('.SingleReportParentPopup').fadeOut(500);
  }

  termBox2(event: any) {
    if (event.checked[0]) {
      this.check2 = true;
    } else {
      this.check2 = false;
    }
  }
  submitReview() {
    const formData = new FormData();
    formData.append('theifName', this.reviewForm.value.theifName);
    formData.append('theifNatID', this.reviewForm.value.theifNatID);
    formData.append('theifMobile', this.reviewForm.value.theifMobile);
    formData.append('theifPicture', this.reviewForm.value.theifPicture);
    formData.append('additional_info', this.reviewForm.value.additional_info);

    if (this.reviewForm.value.theifPicture == null) {
      formData.delete('theifPicture');
    }

    this._DashboardService
      .submitReview(this.reportID, formData)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          location.reload();
        } else {
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
    newImg.width = 260;
    newImg.height = 260;
    newImg.className = 'rounded-circle';
    this.changeAvatar();
  }

  thiefAvatar(event: any) {
    const selectedFile = event.target.files[0];
    this.reviewForm.get('theifPicture')?.setValue(selectedFile);
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

  getInfo() {
    this._DashboardService.getOwnerInfo().subscribe((resp) => {
      if (resp.status == true) {
        this.info = resp.Data;
      } else {
        console.log(resp.msg);
      }
    });
  }

  printAllReport() {
    this._DashboardService.getAllReport().subscribe((resp) => {
      if (resp.status == true) {
        this.allReportsArray = resp.Data;
        if(this.allReportsArray.length == 0){
          if(this.allReportsArray[0]==null){
            this.empty = true;
          }
        }
        for (let j = 0; j < this.allReportsArray.length; j++) {
          for (let i = 0; i < this._AuthService.Model().length; i++) {
            if (
              this.allReportsArray[j].brand.toLowerCase() ==
              this._AuthService.Model()[i].id.toLowerCase()
            ) {
              for (
                let k = 0;
                k < this._AuthService.Model()[i].items.length;
                k++
              ) {
                if (
                  this.allReportsArray[j].model ==
                  this._AuthService.Model()[i].items[k].name
                ) {
                  this.allReportsArray[j].model =
                    this._AuthService.Model()[i].items[k].label;
                }
              }
            }
          }
        }
      } else {
        console.log(resp.status);
      }
    });
  }

  ownerReportObject: any;
  remove = false;
  getOwnerSingleReport() {
    this._DashboardService
      .ownerSingleReport(this.reportID)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.ownerReportObject = resp.Data;
          if (this.ownerReportObject.color == 'mint green') {
            this.ownerReportObject.color = '#A2E4B8';
          }
          $('.SingleReportParentPopup').fadeIn(500);
          $('.SingleReportParentPopup').css('display', 'flex');
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

  singleReportPopup(reportID: any) {
    this.reportID = reportID;
    this.getOwnerSingleReport();
  }

  popup(reportID: any) {
    this.reportID = reportID;
    $('.parentPopup').fadeIn(500);
    $('.parentPopup').css('display', 'flex');
  }

  close() {
    $('.parentPopup').fadeOut(500);
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

  submitfilters(filtersForm: FormGroup) {

    if(filtersForm.value.frontCrach_top == null){
      filtersForm.value.frontCrach_top = 'null';
    }
    if(filtersForm.value.frontCrach_center == null){
      filtersForm.value.frontCrach_center = 'null';
    }
    if(filtersForm.value.frontCrach_bottom == null){
      filtersForm.value.frontCrach_bottom = 'null';
    }
    if(filtersForm.value.backCrach_top == null){
      filtersForm.value.backCrach_top = 'null';
    }
    if(filtersForm.value.backCrach_center == null){
      filtersForm.value.backCrach_center = 'null';
    }
    if(filtersForm.value.backCrach_bottom == null){
      filtersForm.value.backCrach_bottom = 'null';
    }
    
    this._DashboardService
      .detailsSearch(filtersForm.value)
      .subscribe((resp) => {
        if (resp.status == true) {
          $('.allreportsArray').fadeOut();
          this.filtersArray = resp.Data;
          // for (let j = 0; j < this.filtersArray.length; j++) {
          //   for (let i = 0; i < this._AuthService.Model().length; i++) {
          //     if (
          //       this.filtersArray[j].brand.toLowerCase() ==
          //       this._AuthService.Model()[i].id.toLowerCase()
          //     ) {
          //       for (
          //         let k = 0;
          //         k < this._AuthService.Model()[i].items.length;
          //         k++
          //       ) {
          //         if (
          //           this.filtersArray[j].model ==
          //           this._AuthService.Model()[i].items[k].name
          //         ) {
          //           this.filtersArray[j].model =
          //             this._AuthService.Model()[i].items[k].label;
          //         }
          //       }
          //     }
          //   }
          // }
          this.success = resp.msg;
          this.showSuccess();
          this.closeFilter();
        } else {
          this.error = resp.msg;
          this.showError();
        }
      });
  }

  toggleFilter() {
    $('.filter').css('width', '750px');
    $('.filter').addClass('px-5');
    $('.filter').css('right', '0');
  }
  closeFilter() {
    $('.filter').css('width', '0');
    $('.filter').removeClass('px-5');
    $('.filter').css('right', '-50px');
  }
}
