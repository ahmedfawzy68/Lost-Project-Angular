import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Faq1 = true;
  Faq2 = true;
  Faq3 = true;
  Faq4 = true;
  Faq5 = true;
  Faq6 = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      $('.bg-video').fadeOut(1000);
      $('.mainBG').fadeIn(2000);
    }, 5000);

    setTimeout(function () {
      $('.dots-container').fadeIn(1000);
    }, 3000);
  }

  popup() {
    $('.parentPopup').fadeIn(500);
    $('.parentPopup').css('display', 'flex');
  }
  close() {
    $('.parentPopup').fadeOut(500);
  }

  open1() {
    this.Faq1 = !this.Faq1;
  }
  open2() {
    this.Faq2 = !this.Faq2;
  }
  open3() {
    this.Faq3 = !this.Faq3;
  }
  open4() {
    this.Faq4 = !this.Faq4;
  }
  open5() {
    this.Faq5 = !this.Faq5;
  }
  open6() {
    this.Faq6 = !this.Faq6;
  }
}
