import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NewpassService } from '../newpass.service';


@Component({
  selector: 'app-owner-newpass',
  templateUrl: './owner-newpass.component.html',
  styleUrls: ['./owner-newpass.component.scss'],
  providers:[MessageService]
})
export class OwnerNewpassComponent implements OnInit {
  

  success:any;
  error:any;
  

  ownerNewpass: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null,[Validators.required])
  });

  constructor(private _NewpassService:NewpassService , private _Router:Router, private _MessageService:MessageService) {}

  ngOnInit(): void {}

  change(ownerNewpass:any){

    let ownerNewpassData  = {
      password: ownerNewpass.value.password,
      confirmPassword:ownerNewpass.value.confirmPassword,
      pinCode : localStorage.getItem('ownerPincode')
    }
    
    if(ownerNewpass.valid){
      this._NewpassService.ownerNewpass(ownerNewpassData).subscribe((resp)=>{
        if(resp.status == true){
          this.success = resp.msg;
          this.showSuccess();
          setTimeout(() => {
            this._Router.navigate(['login']);
          }, 1500);
          localStorage.removeItem('ownerPincode');
        }
        else{
          this.error = resp.msg
          this.showError();
        }
      })
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
