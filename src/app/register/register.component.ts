import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

declare const $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    MessageService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class RegisterComponent implements OnInit {
  activeStateComment: boolean[] = [true, false, false];
  activeStateFraction: boolean[] = [true, false, false];
  activeStateSocial: boolean[] = [true, false, false];
  Government: any;
  city: any;
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

  userRegister: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    national_id: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    mobile_1: new FormControl(null, [Validators.required]),
    mobile_2: new FormControl(null),
    government: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    facebookLink: new FormControl(null),
    whatsapp: new FormControl(null),
    serialNumber: new FormControl(null),
    type: new FormControl(null, [Validators.required]),
    brand: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    color: new FormControl(null, [Validators.required]),
    frontCrach_top: new FormControl(null),
    frontCrach_center: new FormControl(null),
    frontCrach_bottom: new FormControl(null),
    backCrach_top: new FormControl(null),
    backCrach_center: new FormControl(null),
    backCrach_bottom: new FormControl(null),
    devicePicture: new FormControl(null, [Validators.required]),
    additional_info: new FormControl(null),
    RAM: new FormControl(null, [Validators.required]),
    ROM: new FormControl(null, [Validators.required]),
    avatar: new FormControl(null),
  });

  ownerRegister: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    government: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    storeMobile_1: new FormControl(null, [Validators.required]),
    facebookLink: new FormControl(null),
    whatsapp: new FormControl(null),
    confirmPassword: new FormControl(null, [Validators.required]),
    storeName: new FormControl(null, [Validators.required]),
    avatar: new FormControl(null),
  });
  check: boolean = false;
  check2: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _MessageService: MessageService
  ) {}

  selectCity(event: any) {
    // console.log(event.value)
    this.city = this._AuthService.city().filter((e) => e.id == event.value);
  }
  selectBrand(event: any) {
    this.Brand = this._AuthService.Brand().filter((e) => e.id == event.value);
  }
  selectModel(event: any) {
    this.Model = this._AuthService.Model().filter((e) => e.id == event.value);
  }

  ngOnInit(): void {
    this.Government = this._AuthService.Government();
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

  userAvatar(event: any) {
    const selectedFile = event.target.files[0];
    this.userRegister.get('avatar')?.setValue(selectedFile);
    var image = URL.createObjectURL(event.target.files[0]);
    var imageDiv = document.getElementById('file_upload');
    var newImg = document.createElement('img');
    if (imageDiv != null) {
      imageDiv.innerHTML = '';
    }
    newImg.src = image;
    imageDiv?.appendChild(newImg);
    newImg.width = 300;
    newImg.height = 300;
    newImg.className = 'rounded-circle';
  }

  ownerAvatar(event: any) {
    // const selectedFile = event.target.files[0];
    // this.ownerRegister.get('avatar')?.setValue(selectedFile);
    // var image = URL.createObjectURL(event.target.files[0]);
    // var imageDiv = document.getElementById('oFile_upload');
    // var newImg = document.createElement('img');
    // if (imageDiv != null) {
    //   imageDiv.innerHTML = ' ';
    // }
    // newImg.src = image;
    // imageDiv?.appendChild(newImg);
    // newImg.width = 300;
    // newImg.height = 300;
    // newImg.className = 'rounded-circle';
    const selectedFile = event.target.files[0];
    this.ownerRegister.get('avatar')?.setValue(selectedFile);
    var image = URL.createObjectURL(event.target.files[0]);
    var imageDiv = document.getElementById('oFile_upload');
    var newImg = document.createElement('img');
    if (imageDiv != null) {
      imageDiv.innerHTML = '';
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

  devicePicture() {
    const selectedFile = this.convertedFile;
    this.userRegister.get('devicePicture')?.setValue(selectedFile);

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
  termBox(event: any) {
    if (event.checked[0]) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
  userSubmitRegister() {
    if (this.userRegister.get('frontCrach_top')?.value == true) {
      this.userRegister.get('frontCrach_top')?.setValue(1);
    } else {
      this.userRegister.get('frontCrach_top')?.setValue(0);
    }
    if (this.userRegister.get('frontCrach_center')?.value == true) {
      this.userRegister.get('frontCrach_center')?.setValue(1);
    } else {
      this.userRegister.get('frontCrach_center')?.setValue(0);
    }
    if (this.userRegister.get('frontCrach_bottom')?.value == true) {
      this.userRegister.get('frontCrach_bottom')?.setValue(1);
    } else {
      this.userRegister.get('frontCrach_bottom')?.setValue(0);
    }
    if (this.userRegister.get('backCrach_top')?.value == true) {
      this.userRegister.get('backCrach_top')?.setValue(1);
    } else {
      this.userRegister.get('backCrach_top')?.setValue(0);
    }
    if (this.userRegister.get('backCrach_center')?.value == true) {
      this.userRegister.get('backCrach_center')?.setValue(1);
    } else {
      this.userRegister.get('backCrach_center')?.setValue(0);
    }
    if (this.userRegister.get('backCrach_bottom')?.value == true) {
      this.userRegister.get('backCrach_bottom')?.setValue(1);
    } else {
      this.userRegister.get('backCrach_bottom')?.setValue(0);
    }

    const formData = new FormData();
    formData.append('firstName', this.userRegister.value.firstName);
    formData.append('lastName', this.userRegister.value.lastName);
    formData.append('email', this.userRegister.value.email);
    formData.append('national_id', this.userRegister.value.national_id);
    formData.append('password', this.userRegister.value.password);
    formData.append('confirmPassword', this.userRegister.value.confirmPassword);
    formData.append('devicePicture', this.userRegister.value.devicePicture);
    formData.append('mobile_1', this.userRegister.value.mobile_1);
    formData.append('mobile_2', this.userRegister.value.mobile_2);
    formData.append('government', this.userRegister.value.government);
    formData.append('city', this.userRegister.value.city);
    formData.append('street', this.userRegister.value.street);
    formData.append('facebookLink', this.userRegister.value.facebookLink);
    formData.append('whatsapp', this.userRegister.value.whatsapp);
    formData.append('serialNumber', this.userRegister.value.serialNumber);
    formData.append('type', this.userRegister.value.type);
    formData.append('brand', this.userRegister.value.brand);
    formData.append('model', this.userRegister.value.model);
    formData.append('color', this.userRegister.value.color);
    formData.append('RAM', this.userRegister.value.RAM);
    formData.append('ROM', this.userRegister.value.ROM);
    formData.append('avatar', this.userRegister.value.avatar);
    formData.append('frontCrach_top', this.userRegister.value.frontCrach_top);
    formData.append(
      'frontCrach_center',
      this.userRegister.value.frontCrach_center
    );
    formData.append(
      'frontCrach_bottom',
      this.userRegister.value.frontCrach_bottom
    );
    formData.append('backCrach_top', this.userRegister.value.backCrach_top);
    formData.append(
      'backCrach_center',
      this.userRegister.value.backCrach_center
    );
    formData.append(
      'backCrach_bottom',
      this.userRegister.value.backCrach_bottom
    );
    formData.append('additional_info', this.userRegister.value.additional_info);

    if (this.userRegister.get('mobile_2')?.value == null) {
      formData.delete('mobile_2');
    }
    if (this.userRegister.get('facebookLink')?.value == null) {
      formData.delete('facebookLink');
    }
    if (this.userRegister.get('whatsapp')?.value == null) {
      formData.delete('whatsapp');
    }
    if (this.userRegister.get('serialNumber')?.value == null) {
      formData.delete('serialNumber');
    }
    if (this.userRegister.get('avatar')?.value == null) {
      formData.delete('avatar');
    }
    this._AuthService.userRegister(formData).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => {
          this._Router.navigate(['/login']);
        }, 1500);
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
  }

  termBox2(event: any) {
    if (event.checked[0]) {
      this.check2 = true;
    } else {
      this.check2 = false;
    }
  }
  ownerSubmitRegister() {
    
    const formData = new FormData();
    formData.append('firstName', this.ownerRegister.value.firstName);
    formData.append('lastName', this.ownerRegister.value.lastName);
    formData.append('email', this.ownerRegister.value.email);
    formData.append('mobile', this.ownerRegister.value.mobile);
    formData.append('password', this.ownerRegister.value.password);
    formData.append('confirmPassword', this.ownerRegister.value.confirmPassword);
    formData.append('storeMobile_1', this.ownerRegister.value.storeMobile_1);
    formData.append('government', this.ownerRegister.value.government);
    formData.append('city', this.ownerRegister.value.city);
    formData.append('street', this.ownerRegister.value.street);
    formData.append('facebookLink', this.ownerRegister.value.facebookLink);
    formData.append('whatsapp', this.ownerRegister.value.whatsapp);
    formData.append('storeName', this.ownerRegister.value.storeName);
    formData.append('avatar', this.ownerRegister.value.avatar);

    if (this.ownerRegister.get('facebookLink')?.value == null) {
      formData.delete('facebookLink');
    }
    if (this.ownerRegister.get('whatsapp')?.value == null) {
      formData.delete('whatsapp');
    }
    if (this.ownerRegister.get('avatar')?.value == null) {
      formData.delete('avatar');
    }

    this._AuthService.ownerRegister(formData).subscribe((resp) => {
      if (resp.status == true) {
        this.success = resp.msg;
        this.showSuccess();
        setTimeout(() => {
          this._Router.navigate(['/login']);
        }, 1500);
      } else {
        this.error = resp.msg;
        this.showError();
      }
    });
  }

  toggleFraction(index: number) {
    this.activeStateFraction[index] = !this.activeStateFraction[index];
  }
  toggleComment(index: number) {
    this.activeStateComment[index] = !this.activeStateComment[index];
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
  showWarn() {
    this._MessageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: this.error,
    });
  }
}
