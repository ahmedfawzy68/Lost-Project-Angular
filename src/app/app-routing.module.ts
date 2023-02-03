import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BothLoginGuard } from './both-login.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { OwnerForgetpassComponent } from './owner-forgetpass/owner-forgetpass.component';
import { OwnerLoginGuard } from './owner-login.guard';
import { OwnerNewpassComponent } from './owner-newpass/owner-newpass.component';
import { OwnerPincodeComponent } from './owner-pincode/owner-pincode.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { OwnerReviewsComponent } from './owner-reviews/owner-reviews.component';
import { PolicyComponent } from './policy/policy.component';
import { RegisterComponent } from './register/register.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SearchStoreComponent } from './search-store/search-store.component';
import { SingleReportComponent } from './single-report/single-report.component';
import { SingleReviewComponent } from './single-review/single-review.component';
import { SocialRegisterComponent } from './social-register/social-register.component';
import { SubmitReportComponent } from './submit-report/submit-report.component';
import { TermsComponent } from './terms/terms.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserForgetpassComponent } from './user-forgetpass/user-forgetpass.component';
import { UserLoginGuard } from './user-login.guard';
import { UserNewpassComponent } from './user-newpass/user-newpass.component';
import { UserPincodeComponent } from './user-pincode/user-pincode.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'ownerDashboard', canActivate:[OwnerLoginGuard] , component:OwnerDashboardComponent},
  {path:'userDashboard', canActivate:[UserLoginGuard], component:UserDashboardComponent},
  {path:'home', component:HomeComponent},
  {path:'aboutus', component:AboutComponent},
  {path:'search', canActivate:[OwnerLoginGuard], component:SearchStoreComponent},
  {path:'login', component:LoginComponent},
  {path:'submit-report', canActivate:[UserLoginGuard], component:SubmitReportComponent},
  {path:'userForgetpass', component:UserForgetpassComponent},
  {path:'ownerForgetpass', component:OwnerForgetpassComponent},
  {path:'userPincode', component:UserPincodeComponent},
  {path:'userNewpass', component:UserNewpassComponent},
  {path:'ownerPincode', component:OwnerPincodeComponent},
  {path:'ownerNewpass', component:OwnerNewpassComponent},
  {path:'socialReg', component:SocialRegisterComponent},
  {path:'termsandconditions', component:TermsComponent},
  {path:'privacypolicy', component:PolicyComponent},
  {path:'singleReport/:reportID', component:SingleReportComponent},
  {path:'singleReview/:reviewID', component:SingleReviewComponent},
  {path:'userReviews', canActivate:[BothLoginGuard], component:ReviewsComponent},
  {path:'ownerReviews', canActivate:[BothLoginGuard], component:OwnerReviewsComponent},
  {path:'register', component:RegisterComponent},
  {path:'userProfile', canActivate:[UserLoginGuard], component:UserProfileComponent},
  {path:'ownerProfile', canActivate:[OwnerLoginGuard], component:OwnerProfileComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
