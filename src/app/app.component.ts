import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Lost';

  ngOnInit(): void {
 
  }
  constructor(private _AuthService: AuthService) {}
}
