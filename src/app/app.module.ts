import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoCompleteModule } from 'primeng/autocomplete'
import {SidebarModule} from 'primeng/sidebar';
import {CarouselModule} from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';



import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SubmitReportComponent } from './submit-report/submit-report.component';
import { SearchStoreComponent } from './search-store/search-store.component';
import { FooterComponent } from './footer/footer.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { Navbar3Component } from './navbar3/navbar3.component';
import { SocialRegisterComponent } from './social-register/social-register.component';
import { SmallfooterComponent } from './smallfooter/smallfooter.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { UserForgetpassComponent } from './user-forgetpass/user-forgetpass.component';
import { UserPincodeComponent } from './user-pincode/user-pincode.component';
import { UserNewpassComponent } from './user-newpass/user-newpass.component';
import { OwnerForgetpassComponent } from './owner-forgetpass/owner-forgetpass.component';
import { OwnerPincodeComponent } from './owner-pincode/owner-pincode.component';
import { OwnerNewpassComponent } from './owner-newpass/owner-newpass.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SingleReportComponent } from './single-report/single-report.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SingleReviewComponent } from './single-review/single-review.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { TermsComponent } from './terms/terms.component';
import { PolicyComponent } from './policy/policy.component';
import { OwnerReviewsComponent } from './owner-reviews/owner-reviews.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    NotfoundComponent,
    SubmitReportComponent,
    SearchStoreComponent,
    FooterComponent,
    Navbar2Component,
    Navbar3Component,
    SocialRegisterComponent,
    SmallfooterComponent,
    UserDashboardComponent,
    OwnerDashboardComponent,
    UserForgetpassComponent,
    UserPincodeComponent,
    UserNewpassComponent,
    OwnerForgetpassComponent,
    OwnerPincodeComponent,
    OwnerNewpassComponent,
    LoginComponent,
    RegisterComponent,
    SingleReportComponent,
    UserProfileComponent,
    ReviewsComponent,
    SingleReviewComponent,
    OwnerProfileComponent,
    TermsComponent,
    PolicyComponent,
    OwnerReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollPanelModule,
    ButtonModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    DropdownModule,
    MatIconModule,
    AccordionModule,
    ToastModule,
    RippleModule,
    MatTabsModule,
    SocialLoginModule,
    AutoCompleteModule,
    SidebarModule,
    CarouselModule,
    CommonModule,
    ImageCropperModule,
    FormsModule,
    CheckboxModule,
    MultiSelectModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('5110374669024301'),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("1047895875505-t9es3tir10s8nou95fb2op3u0nbgufhd.apps.googleusercontent.com"),
          },
          
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
