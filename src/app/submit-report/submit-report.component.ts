import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

declare const $: any;

@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['./submit-report.component.scss'],
  providers: [MessageService],
})
export class SubmitReportComponent implements OnInit {
  activeStateComment: boolean[] = [true, false, false];
  activeStateFraction: boolean[] = [true, false, false];
  activeStateSocial: boolean[] = [true, false, false];
  Type: any[] = [];
  Brand: any[] = [];
  Model: any[] = [];
  Color: any[] = [];
  RAM: any[] = [];
  ROM: any[] = [];
  error: any;
  success: any;
  devicePath: any;
  convertedFile: any;
  check: boolean = false;

  selectBrand(event: any) {
    this.Brand = this._AuthService.Brand().filter((e) => e.id == event.value);
  }
  selectModel(event: any) {
    this.Model = this._AuthService.Model().filter((e) => e.id == event.value);
  }

  report: FormGroup = new FormGroup({
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
  });

 
  checkValue(event: any) {
    if (event.checked[0]) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
  submitReport() {
    if (this.report.get('frontCrach_top')?.value == true) {
      this.report.get('frontCrach_top')?.setValue(1);
    } else {
      this.report.get('frontCrach_top')?.setValue(0);
    }
    if (this.report.get('frontCrach_center')?.value == true) {
      this.report.get('frontCrach_center')?.setValue(1);
    } else {
      this.report.get('frontCrach_center')?.setValue(0);
    }
    if (this.report.get('frontCrach_bottom')?.value == true) {
      this.report.get('frontCrach_bottom')?.setValue(1);
    } else {
      this.report.get('frontCrach_bottom')?.setValue(0);
    }
    if (this.report.get('backCrach_top')?.value == true) {
      this.report.get('backCrach_top')?.setValue(1);
    } else {
      this.report.get('backCrach_top')?.setValue(0);
    }
    if (this.report.get('backCrach_center')?.value == true) {
      this.report.get('backCrach_center')?.setValue(1);
    } else {
      this.report.get('backCrach_center')?.setValue(0);
    }
    if (this.report.get('backCrach_bottom')?.value == true) {
      this.report.get('backCrach_bottom')?.setValue(1);
    } else {
      this.report.get('backCrach_bottom')?.setValue(0);
    }

    console.log(this.report.value);

    const formData = new FormData();

    formData.append('devicePicture', this.report.value.devicePicture);
    formData.append('serialNumber', this.report.value.serialNumber);
    formData.append('type', this.report.value.type);
    formData.append('brand', this.report.value.brand);
    formData.append('model', this.report.value.model);
    formData.append('color', this.report.value.color);
    formData.append('RAM', this.report.value.RAM);
    formData.append('ROM', this.report.value.ROM);
    formData.append('frontCrach_top', this.report.value.frontCrach_top);
    formData.append('frontCrach_center', this.report.value.frontCrach_center);
    formData.append('frontCrach_bottom', this.report.value.frontCrach_bottom);
    formData.append('backCrach_top', this.report.value.backCrach_top);
    formData.append('backCrach_center', this.report.value.backCrach_center);
    formData.append('backCrach_bottom', this.report.value.backCrach_bottom);
    formData.append('additional_info', this.report.value.additional_info);

    if (this.report.get('serialNumber')?.value == null) {
      formData.delete('serialNumber');
    }
    this._AuthService.submitReport(formData).subscribe((resp) => {
      
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

  getDevice(event: any) {
    let modelName = event.value;
    console.log(modelName);
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

  constructor(
    private _Router: Router,
    private _AuthService: AuthService,
    private _MessageService: MessageService
  ) {}

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

  ngOnInit(): void {
    this.Type = this._AuthService.Type();

    this.Color = [
      { label: 'black', name: 'black', icon: 'Black' },
      { label: 'white', name: 'white', icon: 'White' },
      { label: 'silver', name: 'silver', icon: 'Silver' },
      { label: 'red', name: 'red', icon: 'Red' },
      { label: 'blue', name: 'blue', icon: 'Blue' },
      { label: 'mint green' ,name: 'mint green', icon: '#A2E4B8' },
      { label: 'purple', name: 'purple', icon: 'Purple' },
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

  devicePicture() {
    const selectedFile = this.convertedFile;
    this.report.get('devicePicture')?.setValue(selectedFile);

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
