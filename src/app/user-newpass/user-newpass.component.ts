import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NewpassService } from '../newpass.service';

@Component({
  selector: 'app-user-newpass',
  templateUrl: './user-newpass.component.html',
  styleUrls: ['./user-newpass.component.scss'],
  providers: [MessageService],
})
export class UserNewpassComponent implements OnInit {
  success: any;
  error: any;

  userNewpass: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _NewpassService: NewpassService,
    private _Router: Router,
    private _MessageService: MessageService
  ) {}

  ngOnInit(): void {}

  change(userNewpass: any) {
    let userNewpassData = {
      password: userNewpass.value.password,
      confirmPassword: userNewpass.value.confirmPassword,
      pinCode: localStorage.getItem('userPincode'),
    };

    if (userNewpass.valid) {
      this._NewpassService.userNewpass(userNewpassData).subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          setTimeout(() => {
            this._Router.navigate(['login']);
          }, 1500);
          localStorage.removeItem('userPincode');
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
