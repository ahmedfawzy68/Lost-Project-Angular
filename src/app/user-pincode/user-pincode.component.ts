import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NewpassService } from '../newpass.service';

declare const $: any;

@Component({
  selector: 'app-user-pincode',
  templateUrl: './user-pincode.component.html',
  styleUrls: ['./user-pincode.component.scss'],
  providers: [MessageService],
})
export class UserPincodeComponent implements OnInit {
  error: any;
  success: any;

  pincode: FormGroup = new FormGroup({
    number1: new FormControl(null, [Validators.required]),
    number2: new FormControl(null, [Validators.required]),
    number3: new FormControl(null, [Validators.required]),
    number4: new FormControl(null, [Validators.required]),
    number5: new FormControl(null, [Validators.required]),
    number6: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _NewpassService: NewpassService,
    private _Router: Router,
    private _MessageService: MessageService
  ) {}

  ngOnInit(): void {
    $(document).ready(function () {
      $('.complete').on('keyup', function (e: any) {
        if (e.keyCode == 8 || e.keyCode == 48) {
          $(e.currentTarget).prev().select();
          $(e.currentTarget).prev().focus();
        } else {
          if ($(e.currentTarget).val() != '') {
            $(e.currentTarget).next().select();
            $(e.currentTarget).next().focus();
          }
        }
      });
    });
  }

  verify(pincode: FormGroup) {
    let newPincode = {
      pinCode:
        pincode.value.number1 +
        pincode.value.number2 +
        pincode.value.number3 +
        pincode.value.number4 +
        pincode.value.number5 +
        pincode.value.number6,
    };

    if (pincode.valid) {
      this._NewpassService.userPincode(newPincode).subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          setTimeout(() => {
            this._Router.navigate(['userNewpass']);
          }, 1500);
          localStorage.setItem('userPincode', newPincode.pinCode);
        } else {
          this.error = resp.msg;
          this.showError();
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
