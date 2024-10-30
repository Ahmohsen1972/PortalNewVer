import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { LoginComponent } from './components/intro/login/login.component';
import { RegisterComponent } from './components/intro/register/register.component';
import { ConfirmOtpComponent } from './components/intro/confirm-otp/confirm-otp.component';
import { QuickSignupComponent } from './components/intro/quick-signup/quick-signup.component';
import { CustomerInfoComponent } from './components/intro/customer-info/customer-info.component';
import { ConfirmNewPasswordComponent } from './components/intro/confirm-new-password/confirm-new-password.component';
import { ConfirmMobileNumberComponent } from './components/intro/confirm-mobile-number/confirm-mobile-number.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login/customer', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'otp', component: ConfirmOtpComponent },
      { path: 'customer', component: CustomerInfoComponent },
      { path: 'new-password', component: ConfirmNewPasswordComponent },
      { path: 'mobile-number', component: ConfirmMobileNumberComponent },
      { path: 'quick-register', component: QuickSignupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
