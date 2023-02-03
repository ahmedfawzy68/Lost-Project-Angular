import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';

declare const $:any;


@Component({
  selector: 'app-navbar3',
  templateUrl: './navbar3.component.html',
  styleUrls: ['./navbar3.component.scss'],
})
export class Navbar3Component implements OnInit {
  
  userIsLogin:boolean = false;
  ownerIsLogin:boolean = false;
  ownerInfo:any;
  userInfo:any;

  constructor(private _AuthService: AuthService , private _Router:Router,private _DashboardService:DashboardService) {}

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue()!= null){
        this.userIsLogin = true;
      }
      else{
        this.userIsLogin = false;
      }
    })

    this._AuthService.ownerData.subscribe(()=>{
      if(this._AuthService.ownerData.getValue()!= null){
        this.ownerIsLogin = true;
      }
      else{
        this.ownerIsLogin = false;
      }
    })

    this.getOwnerInfo();
    this.getUserInfo();
  }

  ownerLogout() {
    this._AuthService.ownerLogout().subscribe((resp) => {
      if (resp.status == true) {
        localStorage.clear();
        this._AuthService.ownerData.next(null);
        this._Router.navigate(['/login']);
      } else {
        console.log(resp.msg);
        console.log(resp.status);
      }
    });
  }

  userLogout() {
    this._AuthService.userLogout().subscribe((resp) => {
      if (resp.status == true) {
       localStorage.clear();
        this._AuthService.userData.next(null);
        this._Router.navigate(['/login']);
      } else {
        console.log(resp.msg);
        console.log(resp.status);
      }
    });
  }

  getOwnerInfo() {
    this._DashboardService.getOwnerInfo().subscribe((resp) => {
      if (resp.status == true) {
        this.ownerInfo = resp.Data;
        $('.loader').fadeOut(400);
      }
    });
  }

  getUserInfo(){
    this._DashboardService.getUserInfo().subscribe((resp)=>{
      if(resp.status == true){
        this.userInfo = resp.Data;
        $('.loader').fadeOut(400);
      }
    })
  }

}
