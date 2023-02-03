import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NewpassService } from '../newpass.service';


@Component({
  selector: 'app-owner-forgetpass',
  templateUrl: './owner-forgetpass.component.html',
  styleUrls: ['./owner-forgetpass.component.scss'],
  providers:[MessageService]
})
export class OwnerForgetpassComponent implements OnInit {
  success: any;
  error: any;

  ownerForgetPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private _NewpassService: NewpassService,
    private _Router: Router,
    private _MessageService:MessageService
  ) {}

  ngOnInit(): void {}

  reset(ownerForgetPass: FormGroup) {
    if (ownerForgetPass.valid) {
      this._NewpassService
        .ownerForgetpass(ownerForgetPass.value)
        .subscribe((resp) => {
          if (resp.status == true) {
            this.success = resp.msg;
            this.showSuccess();
            this._Router.navigate(['ownerPincode']);
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
