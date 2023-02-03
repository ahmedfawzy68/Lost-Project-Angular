import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NewpassService } from '../newpass.service';

@Component({
  selector: 'app-user-forgetpass',
  templateUrl: './user-forgetpass.component.html',
  styleUrls: ['./user-forgetpass.component.scss'],
  providers: [MessageService],
})
export class UserForgetpassComponent implements OnInit {
  error: any;
  success: any;

  userForgetPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private _NewpassService: NewpassService,
    private _Router: Router,
    private _MessageService: MessageService
  ) {}

  ngOnInit(): void {}

  reset(userForgetPass: FormGroup) {
    if (userForgetPass.valid) {
      this._NewpassService
        .userForgetpass(userForgetPass.value)
        .subscribe((resp) => {
          if (resp.status == true) {
            this.success = resp.msg;
            this.showSuccess;
            // setTimeout(() => {
              this._Router.navigate(['/userPincode']);
            // }, 1500);
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
