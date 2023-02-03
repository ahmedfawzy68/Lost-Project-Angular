import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  success: any;
  error: any;
  type: any;
  socialData: any;
  provider_name: any;
  access_token: any;
  hide = true;

  constructor(
    private _AuthService: AuthService,
    private _MessageService: MessageService,
    private _Router: Router,
    private _SocialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {}

  userLogin: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
  });

  ownerLogin: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
  });

  submitUserLogin(userLogin: FormGroup) {
    if (userLogin.valid) {
      this._AuthService.userLogin(userLogin.value).subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          localStorage.setItem('userToken', resp.Data.token);
          this._AuthService.saveUserData();
          setTimeout(() => {
            this._Router.navigate(['/userDashboard']);
          }, 1500);
        } else {
          this.error = resp.msg;
          this.showError();
        }
      });
    }
  }

  submitOwnerLogin(ownerLogin: FormGroup) {
    if (ownerLogin.valid) {
      this._AuthService.ownerLogin(ownerLogin.value).subscribe((resp) => {
        if (resp.status == true) {
          this.success = resp.msg;
          this.showSuccess();
          localStorage.setItem('ownerToken', resp.Data.token);
          this._AuthService.saveOwnerData();
          setTimeout(() => {
            this._Router.navigate(['/ownerDashboard']);
          }, 1500);
        } else {
          this.error = resp.msg;
          this.showError();
        }
      });
    }
  }

  userGoogleLogin(): void {
    this._SocialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((resp) => {
        this.success = 'Login Successful';
        this.showSuccess();
        this.access_token = resp.authToken;
        this.type = 'user';
        this.provider_name = 'google';
        this.socialData = {
          provider_name: this.provider_name,
          access_token: this.access_token,
          type: this.type,
        };
        this.socialLogin();
      });
  }

  userFacebookLogin(): void {
    this._SocialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((resp) => {
        this.access_token = resp.authToken;
        this.type = 'user';
        this.provider_name = 'facebook';
        this.socialData = {
          provider_name: this.provider_name,
          access_token: this.access_token,
          type: this.type,
        };
        this.socialLogin();
      });
  }
  ownerGoogleLogin(): void {
    this._SocialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((resp) => {
        this.access_token = resp.authToken;
        this.type = 'owner';
        this.provider_name = 'google';
        this.socialData = {
          provider_name: this.provider_name,
          access_token: this.access_token,
          type: this.type,
        };
        this.socialLogin();
      });
  }
  ownerFacebookLogin(): void {
    this._SocialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((resp) => {
        this.access_token = resp.authToken;
        this.type = 'owner';
        this.provider_name = 'facebook';
        this.socialData = {
          provider_name: this.provider_name,
          access_token: this.access_token,
          type: this.type,
        };
        this.socialLogin();
      });
  }

  socialLogin() {
    this._AuthService.socialLogin(this.socialData).subscribe((resp) => {
      if (resp.status == true && resp.Data.fullInfo == false) {
        localStorage.setItem(this.socialData.type + 'Token', resp.Data.token);
        this._Router.navigate(['/socialReg']);
      }
      if (resp.status == true && resp.Data.fullInfo == true) {
        localStorage.setItem(this.socialData.type + 'Token', resp.Data.token);
        if (localStorage.getItem('userToken') != null) {
          this._AuthService.saveUserData();
        }
        if (localStorage.getItem('ownerToken') != null) {
          this._AuthService.saveOwnerData();
        }
        this._Router.navigate([this.socialData.type + 'Dashboard']);
      } else {
        this.error = 'Something Went Wrong';
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
}
