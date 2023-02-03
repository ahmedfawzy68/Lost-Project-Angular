import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';

declare const $: any;

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [MessageService],
})
export class UserDashboardComponent implements OnInit {
  reportID: any;
  remove = false;
  empty = false;

  error: any;
  success: any;
  info: any;

  allReportsArray: any;
  allReviewsArray: any;
  thisReportObject: any;

  constructor(
    private _DashboardService: DashboardService,
    private _MessageService: MessageService,
    private _AuthService: AuthService
  ) {}

  avatarForm: FormGroup = new FormGroup({
    avatar: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.animateSkelton();
    this.printAllReport();
    this.getUserInfo();
    document.addEventListener('keyup', (clickEvent: KeyboardEvent) => {
      if (clickEvent.key == 'Escape') {
        this.close();
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

  userAvatar(event: any) {
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

  changeAvatar() {
    const formData = new FormData();
    formData.append('avatar', this.avatarForm.value.avatar);
    this._DashboardService.changeUserAvatar(formData).subscribe((resp) => {
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

  printAllReport() {
    this._DashboardService.getUserReport().subscribe((resp) => {
      if (resp.status == true) {
        this.allReportsArray = resp.Data;
        if(this.allReportsArray.length == 0){
          if(this.allReportsArray[0]==null){
            this.empty = true;
          }
        }
        
        for (let j = 0; j < this.allReportsArray.length; j++) {
          for (let i = 0; i < this._AuthService.Model().length; i++) {
            
            if (this.allReportsArray[j].brand.toLowerCase() ==this._AuthService.Model()[i].id.toLowerCase()) {
              for (let k = 0;k < this._AuthService.Model()[i].items.length;k++
              ) {
                if (this.allReportsArray[j].model == this._AuthService.Model()[i].items[k].name) {
                  this.allReportsArray[j].model = this._AuthService.Model()[i].items[k].label;
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

  showReport(reportID: any) {
    this.reportID = reportID;
    this.getReport();
  }
  close() {
    $('.parentPopup').fadeOut(500);
  }

  getReport() {
    this._DashboardService.showReport(this.reportID).subscribe((resp) => {
      if (resp.status == true) {
        this.thisReportObject = resp.Data;
        if(this.thisReportObject.color == "mint green"){
          this.thisReportObject.color = "#A2E4B8"
        }
        for (let i = 0; i < this._AuthService.Model().length; i++) {
          if (this.thisReportObject.brand.toLowerCase() ==this._AuthService.Model()[i].id.toLowerCase()) {
            for (let k = 0;k < this._AuthService.Model()[i].items.length;k++) {
              if (this.thisReportObject.model ==this._AuthService.Model()[i].items[k].name) {
                this.thisReportObject.model =
                this._AuthService.Model()[i].items[k].label;
              }
            }
          }
        }

        $('.parentPopup').fadeIn(500);
        $('.parentPopup').css('display', 'flex');
        if (this.thisReportObject.additional_info == 'null') {
          this.remove = false;
        } else {
          this.remove = true;
        }
      } else {
        console.log(resp.msg);
      }
    });
  }

  getUserInfo() {
    this._DashboardService.getUserInfo().subscribe((resp) => {
      if (resp.status == true) {
        this.info = resp.Data;
      } else {
        console.log(resp.msg);
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
  showInfo() {
    this._MessageService.add({
      severity: 'info',
      summary: 'Info',
      detail: this.error,
    });
  }
}
