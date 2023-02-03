import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';
import { ProfileService } from '../profile.service';

declare const $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [MessageService],
})
export class UserProfileComponent implements OnInit {
  activeStateComment: boolean[] = [true, false, false];
  activeStateFraction: boolean[] = [true, false, false];
  activeStateSocial: boolean[] = [true, false, false];
  success: any;
  error: any;
  reportRefreshWithoutSaving = false;

  reportID: any;
  currentObj: any;
  thisReportObject: any;
  info: any;
  convertedFile: any;
  devicePath: any;

  Type: any[] = [];
  Brand: any[] = [];
  Model: any[] = [];
  Color: any[] = [];
  RAM: any[] = [];
  ROM: any[] = [];

  getMyReportsArray: any;

  avatarForm: FormGroup = new FormGroup({
    avatar: new FormControl(null, [Validators.required]),
  });

  profile_stolen: FormGroup = new FormGroup({});

  newPersonal: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    national_id: new FormControl(null, [Validators.required]),
  });
  newReport: FormGroup = new FormGroup({
    serialNumber: new FormControl(null),
    type: new FormControl(null),
    brand: new FormControl(null),
    model: new FormControl(null),
    color: new FormControl(null),
    frontCrach_top: new FormControl(null),
    frontCrach_center: new FormControl(null),
    frontCrach_bottom: new FormControl(null),
    backCrach_top: new FormControl(null),
    backCrach_center: new FormControl(null),
    backCrach_bottom: new FormControl(null),
    devicePicture: new FormControl(null),
    additional_info: new FormControl(null),
    RAM: new FormControl(null),
    ROM: new FormControl(null),
  });

  newContact: FormGroup = new FormGroup({
    mobile_1: new FormControl(null, [Validators.required]),
    government: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    facebookLink: new FormControl(null, [Validators.required]),
    whatsapp: new FormControl(null, [Validators.required]),
  });

  newPass: FormGroup = new FormGroup({
    current_password: new FormControl(null, [Validators.required]),
    new_password: new FormControl(null, [Validators.required]),
    new_confirm_password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _Router: Router,
    private _ProfileService: ProfileService,
    private _MessageService: MessageService,
    private _AuthService: AuthService,
    private _DashboardService: DashboardService
  ) {}

  Government: any;

  ngOnInit(): void {
    this.Brand = this.brands;
    this.Model = this.models;
    this.getMyReports();
    this.getInfo();

    this.Government = this._AuthService.Government();
    this.city = this.cities;

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
    this.RAM = [
      { name: '4GB', value: 4 },
      { name: '6GB', value: 6 },
      { name: '8GB', value: 8 },
      { name: '16GB', value: 16 },
    ];
    this.ROM = [
      { name: '16GB', value: 16 },
      { name: '32GB', value: 32 },
      { name: '64GB', value: 64 },
      { name: '128GB', value: 128 },
      { name: '256GB', value: 256 },
    ];
  }

  toggleFraction(index: number) {
    this.activeStateFraction[index] = !this.activeStateFraction[index];
  }
  toggleComment(index: number) {
    this.activeStateComment[index] = !this.activeStateComment[index];
  }
  AddComment() {
    $('.comment').slideToggle(300);
  }
  AddFraction() {
    $('.fractions').slideToggle(300);
  }

  getDevice(event: any) {
    let modelName = event.value;

    for (let i = 0; i < this.Model.length; i++) {
      let brandName = this.Model[i].id.toLowerCase();
      let typeName = this.Model[i].type;
      for (let j = 0; j < this.Model[i].items.length; j++) {
        if (this.Model[i].items[j].name == modelName) {
          let imgName = this.Model[i].items[j].img;
          this.devicePath = `../../assets/devices/${typeName}/${brandName}/${imgName}`;
          fetch(this.devicePath)
            .then((e) => {
              return e.blob();
            })
            .then((blob) => {
              let b: any = blob;
              b.lastModifiedDate = new Date();
              b.name = imgName;
              this.convertedFile = new File([b], b.name);
              this.devicePicture();
            });
        }
      }
    }
  }

  devicePicture() {
    const selectedFile = this.convertedFile;
    this.newReport.get('devicePicture')?.setValue(selectedFile);

    if (
      $('#defaultImg').css('opacity') == 1 &&
      $('#chosenImg').css('opacity') != 1
    ) {
      $('#defaultImg').fadeOut(500);
      $('#defaultImg').css('opacity', '0');
      setTimeout(() => {
        $('#chosenImg').animate(
          {
            opacity: 1,
          },
          500
        );
      }, 500);
    } else {
      $('#chosenImg').css({
        opacity: 0,
      });
      setTimeout(() => {
        $('#chosenImg').animate(
          {
            opacity: 1,
          },
          500
        );
      }, 200);
    }
  }

  submitNewInfo(newPersonal: FormGroup) {
    if (newPersonal.value.firstName == null) {
      newPersonal.get('firstName')?.setValue(this.info.firstName);
    }
    if (newPersonal.value.lastName == null) {
      newPersonal.get('lastName')?.setValue(this.info.lastName);
    }
    if (newPersonal.value.email == null) {
      newPersonal.get('email')?.setValue(this.info.email);
    }
    if (newPersonal.value.national_id == null) {
      newPersonal.get('national_id')?.setValue(this.info.national_id);
    }
    this._ProfileService.changeUserInfo(newPersonal.value).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => {
          this._Router.navigate(['userDashboard']);
        }, 1500);
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
  }

  city: any;
  selectBrand(event: any) {
    this.Brand = this._AuthService.Brand().filter((e) => e.id == event.value);
  }
  selectModel(event: any) {
    this.Model = this._AuthService.Model().filter((e) => e.id == event.value);
  }

  selectCity(event: any) {
    this.city = this._AuthService.city().filter((e) => e.id == event.value);
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
    newImg.width = 200;
    newImg.height = 200;
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

  getMyReports() {
    this._DashboardService.getUserReport().subscribe((resp) => {
      if (resp.status == true) {
        this.getMyReportsArray = resp.Data;
        for (let j = 0; j < this.getMyReportsArray.length; j++) {
          if (this.getMyReportsArray[j].color == 'mint green') {
            this.getMyReportsArray[j].color = '#A2E4B8';
          }
          for (let i = 0; i < this._AuthService.Model().length; i++) {
            if (
              this.getMyReportsArray[j].brand.toLowerCase() ==
              this._AuthService.Model()[i].id.toLowerCase()
            ) {
              for (
                let k = 0;
                k < this._AuthService.Model()[i].items.length;
                k++
              ) {
                if (
                  this.getMyReportsArray[j].model ==
                  this._AuthService.Model()[i].items[k].name
                ) {
                  this.getMyReportsArray[j].model =
                    this._AuthService.Model()[i].items[k].label;
                }
              }
            }
          }
        }
      } else {
        console.log(resp.msg);
      }
    });
  }
  cities: any = [];
  selectedCity: any;

  getInfo() {
    this._DashboardService.getUserInfo().subscribe((resp) => {
      if (resp.status == true) {
        this.info = resp.Data;
        this._AuthService.Government().forEach((g) => {
          if (
            this.info.ContactInfo.government.toLowerCase() == g.id.toLowerCase()
          ) {
            this._AuthService.city().forEach((c) => {
              if (c.id == g.id) {
                this.cities.push(c);
              }
            });
          }
        });
        this.selectedCity = this.info.ContactInfo.city;
        this.newContact.get('city')?.setValue(this.selectedCity);
      } else {
        console.log(resp.msg);
      }
    });
  }

  deleteReport(reportID: any) {
    this._ProfileService.deleteUserReport(reportID).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => {
          this._Router.navigate(['/userDashboard']);
        }, 1500);
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
  }

  submitNewReport() {
    if (this.newReport.get('frontCrach_top')?.value == true) {
      this.newReport.get('frontCrach_top')?.setValue(1);
    } else {
      this.newReport.get('frontCrach_top')?.setValue(0);
    }
    if (this.newReport.get('frontCrach_center')?.value == true) {
      this.newReport.get('frontCrach_center')?.setValue(1);
    } else {
      this.newReport.get('frontCrach_center')?.setValue(0);
    }
    if (this.newReport.get('frontCrach_bottom')?.value == true) {
      this.newReport.get('frontCrach_bottom')?.setValue(1);
    } else {
      this.newReport.get('frontCrach_bottom')?.setValue(0);
    }
    if (this.newReport.get('backCrach_top')?.value == true) {
      this.newReport.get('backCrach_top')?.setValue(1);
    } else {
      this.newReport.get('backCrach_top')?.setValue(0);
    }
    if (this.newReport.get('backCrach_center')?.value == true) {
      this.newReport.get('backCrach_center')?.setValue(1);
    } else {
      this.newReport.get('backCrach_center')?.setValue(0);
    }
    if (this.newReport.get('backCrach_bottom')?.value == true) {
      this.newReport.get('backCrach_bottom')?.setValue(1);
    } else {
      this.newReport.get('backCrach_bottom')?.setValue(0);
    }

    const formData = new FormData();
    formData.append('devicePicture', this.newReport.value.devicePicture);
    formData.append('serialNumber', this.newReport.value.serialNumber);
    formData.append('type', this.newReport.value.type);
    formData.append('brand', this.newReport.value.brand);
    formData.append('model', this.newReport.value.model);
    formData.append('color', this.newReport.value.color);
    formData.append('RAM', this.newReport.value.RAM);
    formData.append('ROM', this.newReport.value.ROM);
    formData.append('frontCrach_top', this.newReport.value.frontCrach_top);
    formData.append(
      'frontCrach_center',
      this.newReport.value.frontCrach_center
    );
    formData.append(
      'frontCrach_bottom',
      this.newReport.value.frontCrach_bottom
    );
    formData.append('backCrach_top', this.newReport.value.backCrach_top);
    formData.append('backCrach_center', this.newReport.value.backCrach_center);
    formData.append('backCrach_bottom', this.newReport.value.backCrach_bottom);
    formData.append('additional_info', this.newReport.value.additional_info);

    if (this.newReport.get('serialNumber')?.value == null) {
      formData.delete('serialNumber');
    }

    this._ProfileService
      .changeUserReport(formData, this.reportID)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          setTimeout(() => {
            this._Router.navigate(['/userDashboard']);
          }, 1500);
        } else {
          this.error = resp.msg;
          this.showError();
        }
      });
  }

  submitNewContact(newContact: FormGroup) {
    if (newContact.value.mobile_1 == null) {
      newContact.get('mobile_1')?.setValue(this.info.ContactInfo.mobile_1);
    }
    if (newContact.value.government == null) {
      newContact.get('government')?.setValue(this.info.ContactInfo.government);
    }
    if (newContact.value.city == null) {
      newContact.get('city')?.setValue(this.info.ContactInfo.city);
    }
    if (newContact.value.street == null) {
      newContact.get('street')?.setValue(this.info.ContactInfo.street);
    }
    if (newContact.value.facebookLink == null) {
      newContact
        .get('facebookLink')
        ?.setValue(this.info.ContactInfo.facebookLink);
    }
    if (newContact.value.whatsapp == null) {
      newContact.get('whatsapp')?.setValue(this.info.ContactInfo.whatsapp);
    }
    this._ProfileService
      .changeUserContact(newContact.value)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          setTimeout(() => {
            this._Router.navigate(['userDashboard']);
          }, 1500);
        } else {
          this.error = resp.msg;
          this.showError();
        }
      });
  }

  submitNewPass(newPass: FormGroup) {
    this._ProfileService.changeUserPass(newPass.value).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => this._Router.navigate(['/userDashboard']), 1500);
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
  selectedModel: any;
  selectedBrand: any;
  models: any = [];
  brands: any = [];
  imgName: any;

  getOneReport() {
    this._DashboardService.showReport(this.reportID).subscribe((resp) => {
      if (resp.status == true) {
        this.thisReportObject = resp.Data;
        if (this.thisReportObject.color == 'mint green') {
          this.thisReportObject.color = '#A2E4B8';
          
          
        }
        if (this.newReport.get('serialNumber')?.value == null) {
          this.newReport
            .get('serialNumber')
            ?.setValue(this.thisReportObject.serialNumber);
        }
        if (this.newReport.get('type')?.value == null) {
          this.newReport.get('type')?.setValue(this.thisReportObject.type);
        }
        this._AuthService.Type().forEach((t) => {
          if (this.thisReportObject.type == t.id) {
            this._AuthService.Brand().forEach((b) => {
              if (t.id == b.id) {
                this.brands.push(b);
                for (let i = 0; i < b.items.length; i++) {
                  if (
                    this.thisReportObject.brand.toLowerCase() ==
                    b.items[i].id.toLowerCase()
                  ) {
                    this.selectedBrand = b.items[i].id;
                    this._AuthService.Model().forEach((m) => {
                      if (b.items[i].id == m.id) {
                        this.models.push(m);
                        for (let j = 0; j < m.items.length; j++) {
                          if (
                            this.thisReportObject.model.toLowerCase() ==
                            m.items[j].name.toLowerCase()
                          ) {
                            this.selectedModel = m.items[j].name;
                            this.imgName = m.items[j].img;
                            this.devicePath = `../../assets/devices/${this.thisReportObject.type.toLowerCase()}/${this.selectedBrand.toLowerCase()}/${
                              this.imgName
                            }`;
                          }
                        }
                      }
                    });
                  }
                }
              }
            });
          }
        });
        this.newReport.get('brand')?.setValue(this.selectedBrand);
        this.newReport.get('model')?.setValue(this.selectedModel);
        
        if (this.newReport.get('color')?.value == null) {
          this.newReport.get('color')?.setValue(this.thisReportObject.color);
        }
        if (this.newReport.get('RAM')?.value == null) {
          this.newReport.get('RAM')?.setValue(this.thisReportObject.RAM);
        }
        if (this.newReport.get('ROM')?.value == null) {
          this.newReport.get('ROM')?.setValue(this.thisReportObject.ROM);
        }

        fetch(this.devicePath)
          .then((e) => {
            return e.blob();
          })
          .then((blob) => {
            let b: any = blob;
            b.lastModifiedDate = new Date();
            b.name = this.imgName;
            this.convertedFile = new File([b], b.name);
            this.devicePicture();
          });
      } else {
        console.log(resp.msg);
      }
    });
  }

  popup(report: any) {
    this.reportID = report.reportID;
    $('.parentPopup').fadeIn(500);
    $('.parentPopup').css('display', 'flex');
    this.getOneReport();
  }
  close() {
    $('.parentPopup').fadeOut(500);
  }
}
