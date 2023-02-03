import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DashboardService } from '../dashboard.service';

declare const $: any;

@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
  styleUrls: ['./social-register.component.scss'],
  providers: [
    MessageService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class SocialRegisterComponent implements OnInit {
  ownerFirstName: any;
  ownerLastName: any;
  ownerEmail: any;
  userInfo: any;
  userIdentity = true;
  ownerIdentity = true;

  userCompleteInfo: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    national_id: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null),
    mobile_1: new FormControl(null),
    mobile_2: new FormControl(null),
    government: new FormControl(null),
    city: new FormControl(null),
    street: new FormControl(null),
    facebookLink: new FormControl(null),
    whatsapp: new FormControl(null),
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
    avatar: new FormControl(null),
  });

  ownerCompleteInfo: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    mobile: new FormControl(null),
    password: new FormControl(null),
    government: new FormControl(null),
    city: new FormControl(null),
    street: new FormControl(null),
    storeMobile_1: new FormControl(null),
    facebookLink: new FormControl(null),
    whatsapp: new FormControl(null),
    confirmPassword: new FormControl(null),
    storeName: new FormControl(null),
    avatar: new FormControl(null),
  });

  activeStateComment: boolean[] = [true, false, false];
  activeStateSocial: boolean[] = [true, false, false];
  activeStateFraction: boolean[] = [true, false, false];
  Government: any[] = [];
  City: any[] = [];
  Type: any[] = [];
  Brand: any[] = [];
  Model: any[] = [];
  Color: any[] = [];
  RAM: any[] = [];
  ROM: any[] = [];
  error: any;
  success: any;
  hide = true;
  convertedFile: any;
  devicePath: string = '';

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _MessageService: MessageService,
    private _DashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.userCompleteInfo.get('email')?.disable();
    this.ownerCompleteInfo.get('email')?.disable();
    this.getUserInfo();

    if (localStorage.getItem('userToken') != null) {
      this.userIdentity = false;
    } else {
      this.ownerIdentity = false;
    }

    this.Government = this._AuthService.Government();
    this.Type = this._AuthService.Type();
    this.Color = [
      { name: 'Black', icon: 'Black' },
      { name: 'White', icon: 'White' },
      { name: 'Silver', icon: 'Silver' },
      { name: 'Red', icon: 'Red' },
      { name: 'Blue', icon: 'Blue' },
      { name: 'Mint Green', icon: '#A2E4B8' },
      { name: 'Purple', icon: 'Purple' },
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

  getUserInfo() {
    this._DashboardService.getUserInfo().subscribe((resp) => {
      if (resp.status == true) {
        this.userInfo = resp.Data;
        this.userCompleteInfo.get('firstName')?.setValue(this.userInfo.firstName);
        this.userCompleteInfo.get('lastName')?.setValue(this.userInfo.lastName);

      } else {
        console.log(resp.msg);
      }
    });
  }

  selectCity(event: any) {
    this.City = this._AuthService.city().filter((e) => e.id == event.value);
  }
  selectBrand(event: any) {
    this.Brand = this._AuthService.Brand().filter((e) => e.id == event.value);
  }
  selectModel(event: any) {
    this.Model = this._AuthService.Model().filter((e) => e.id == event.value);
  }

  userSubmitCompleteInfo() {
    if (this.userCompleteInfo.get('frontCrach_top')?.value == true) {
      this.userCompleteInfo.get('frontCrach_top')?.setValue(1);
    } else {
      this.userCompleteInfo.get('frontCrach_top')?.setValue(0);
    }
    if (this.userCompleteInfo.get('frontCrach_center')?.value == true) {
      this.userCompleteInfo.get('frontCrach_center')?.setValue(1);
    } else {
      this.userCompleteInfo.get('frontCrach_center')?.setValue(0);
    }
    if (this.userCompleteInfo.get('frontCrach_bottom')?.value == true) {
      this.userCompleteInfo.get('frontCrach_bottom')?.setValue(1);
    } else {
      this.userCompleteInfo.get('frontCrach_bottom')?.setValue(0);
    }
    if (this.userCompleteInfo.get('backCrach_top')?.value == true) {
      this.userCompleteInfo.get('backCrach_top')?.setValue(1);
    } else {
      this.userCompleteInfo.get('backCrach_top')?.setValue(0);
    }
    if (this.userCompleteInfo.get('backCrach_center')?.value == true) {
      this.userCompleteInfo.get('backCrach_center')?.setValue(1);
    } else {
      this.userCompleteInfo.get('backCrach_center')?.setValue(0);
    }
    if (this.userCompleteInfo.get('backCrach_bottom')?.value == true) {
      this.userCompleteInfo.get('backCrach_bottom')?.setValue(1);
    } else {
      this.userCompleteInfo.get('backCrach_bottom')?.setValue(0);
    }

    if (this.userCompleteInfo.get('email')?.value == null) {
      this.userCompleteInfo.value.email = this.userInfo.email;
    }
    if (this.userCompleteInfo.get('firstName')?.value == null) {
      this.userCompleteInfo.value.firstName = this.userInfo.firstName;
    }
    if (this.userCompleteInfo.get('lastName')?.value == null) {
      this.userCompleteInfo.value.lastName = this.userInfo.lastName;
    }

    console.log(this.userCompleteInfo.value);

    const formData = new FormData();

    formData.append('firstName', this.userCompleteInfo.value.firstName);
    formData.append('lastName', this.userCompleteInfo.value.lastName);
    formData.append('email', this.userCompleteInfo.value.email);
    formData.append('national_id', this.userCompleteInfo.value.national_id);
    formData.append('password', this.userCompleteInfo.value.password);
    formData.append(
      'confirmPassword',
      this.userCompleteInfo.value.confirmPassword
    );
    formData.append('devicePicture', this.userCompleteInfo.value.devicePicture);
    formData.append('avatar', this.userCompleteInfo.value.avatar);
    formData.append('mobile_1', this.userCompleteInfo.value.mobile_1);
    formData.append('mobile_2', this.userCompleteInfo.value.mobile_2);
    formData.append('government', this.userCompleteInfo.value.government);
    formData.append('city', this.userCompleteInfo.value.city);
    formData.append('street', this.userCompleteInfo.value.street);
    formData.append('facebookLink', this.userCompleteInfo.value.facebookLink);
    formData.append('whatsapp', this.userCompleteInfo.value.whatsapp);
    formData.append('serialNumber', this.userCompleteInfo.value.serialNumber);
    formData.append('type', this.userCompleteInfo.value.type);
    formData.append('brand', this.userCompleteInfo.value.brand);
    formData.append('model', this.userCompleteInfo.value.model);
    formData.append('color', this.userCompleteInfo.value.color);
    formData.append('RAM', this.userCompleteInfo.value.RAM);
    formData.append('ROM', this.userCompleteInfo.value.ROM);
    formData.append(
      'frontCrach_top',
      this.userCompleteInfo.value.frontCrach_top
    );
    formData.append(
      'frontCrach_center',
      this.userCompleteInfo.value.frontCrach_center
    );
    formData.append(
      'frontCrach_bottom',
      this.userCompleteInfo.value.frontCrach_bottom
    );
    formData.append('backCrach_top', this.userCompleteInfo.value.backCrach_top);
    formData.append(
      'backCrach_center',
      this.userCompleteInfo.value.backCrach_center
    );
    formData.append(
      'backCrach_bottom',
      this.userCompleteInfo.value.backCrach_bottom
    );
    formData.append(
      'additional_info',
      this.userCompleteInfo.value.additional_info
    );

    if (this.userCompleteInfo.get('mobile_2')?.value == null) {
      formData.delete('mobile_2');
    }
    if (this.userCompleteInfo.get('facebookLink')?.value == null) {
      formData.delete('facebookLink');
    }
    if (this.userCompleteInfo.get('whatsapp')?.value == null) {
      formData.delete('whatsapp');
    }
    if (this.userCompleteInfo.get('serialNumber')?.value == null) {
      formData.delete('serialNumber');
    }
    if (this.userCompleteInfo.get('avatar')?.value == null) {
      formData.delete('avatar');
    }

    this._AuthService.userCompleteInfo(formData).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        this._AuthService.saveUserData();
        setTimeout(() => {
          this._Router.navigate(['userDashboard']);
        }, 1500);
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
  }

  ownerSubmitCompleteInfo() {
    if (this.ownerCompleteInfo.get('email')?.value == null) {
      this.ownerCompleteInfo.value.email = this.ownerEmail;
    }
    if (this.ownerCompleteInfo.get('firstName')?.value == null) {
      this.ownerCompleteInfo.value.firstName = this.ownerFirstName;
    }
    if (this.ownerCompleteInfo.get('lastName')?.value == null) {
      this.ownerCompleteInfo.value.lastName = this.ownerLastName;
    }

    const formData = new FormData();
    formData.append('firstName', this.ownerCompleteInfo.value.firstName);
    formData.append('lastName', this.ownerCompleteInfo.value.lastName);
    formData.append('email', this.ownerCompleteInfo.value.email);
    formData.append('mobile', this.ownerCompleteInfo.value.mobile);
    formData.append('password', this.ownerCompleteInfo.value.password);
    formData.append('confirmPassword', this.ownerCompleteInfo.value.confirmPassword);
    formData.append('storeMobile_1', this.ownerCompleteInfo.value.storeMobile_1);
    formData.append('government', this.ownerCompleteInfo.value.government);
    formData.append('city', this.ownerCompleteInfo.value.city);
    formData.append('street', this.ownerCompleteInfo.value.street);
    formData.append('facebookLink', this.ownerCompleteInfo.value.facebookLink);
    formData.append('whatsapp', this.ownerCompleteInfo.value.whatsapp);
    formData.append('storeName', this.ownerCompleteInfo.value.storeName);
    formData.append('avatar', this.ownerCompleteInfo.value.avatar);
    
    if (this.ownerCompleteInfo.get('avatar')?.value == null) {
      formData.delete('avatar');
    }
    this._AuthService
      .ownerCompleteInfo(formData)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          this._AuthService.saveOwnerData();
          setTimeout(() => {
            this._Router.navigate(['ownerDashboard']);
          }, 1500);
        } else {
          this.error = resp.msg;
          this.showError();
        }
      });
  }
  userAvatar(event: any) {
    const selectedFile = event.target.files[0];
    this.userCompleteInfo.get('avatar')?.setValue(selectedFile);
    var image = URL.createObjectURL(event.target.files[0]);
    var imageDiv = document.getElementById('uFile_upload');
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
  ownerAvatar(event: any) {
    const selectedFile = event.target.files[0];
    this.ownerCompleteInfo.get('avatar')?.setValue(selectedFile);
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

  getDevice(event: any) {
    let modelName = event.value;

    for (let i = 0; i < this.Model.length; i++) {
      let brandName = this.Model[i].id.toLowerCase();
      let typeName = this.Model[i].type;
      for (let j = 0; j < this.Model[i].items.length; j++) {
        if (this.Model[i].items[j].label == modelName) {
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

  // devicePicture() {
  //   const selectedFile = this.convertedFile;
  //   this.userCompleteInfo.get('devicePicture')?.setValue(selectedFile);

  //   var image = URL.createObjectURL(this.convertedFile);
  //   var imageDiv = document.getElementById('dFile_upload');
  //   var newImg = document.createElement('img');
  //   if (imageDiv != null) {
  //     imageDiv.innerHTML = ' ';
  //   }
  //   newImg.src = image;
  //   imageDiv?.appendChild(newImg);
  // }

  devicePicture() {
    const selectedFile = this.convertedFile;
    this.userCompleteInfo.get('devicePicture')?.setValue(selectedFile);

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

  toggleComment(index: number) {
    this.activeStateComment[index] = !this.activeStateComment[index];
  }
  toggleFraction(index: number) {
    this.activeStateFraction[index] = !this.activeStateFraction[index];
  }
  toggleSocial(index: number) {
    this.activeStateSocial[index] = !this.activeStateSocial[index];
  }
  AddComment() {
    $('.comment').slideToggle(300);
  }
  AddFraction() {
    $('.fractions').slideToggle(300);
  }
  AddSocial() {
    $('.social').slideToggle(300);
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
