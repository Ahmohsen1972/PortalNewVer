import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { IntroComponent } from './components/intro/intro.component';
import { LoginComponent } from './components/intro/login/login.component';
import { RegisterComponent } from './components/intro/register/register.component';
import { UserTypeComponent } from './components/intro/user-type/user-type.component';
import { ConfirmOtpComponent } from './components/intro/confirm-otp/confirm-otp.component';
import { QuickSignupComponent } from './components/intro/quick-signup/quick-signup.component';
import { CustomerInfoComponent } from './components/intro/customer-info/customer-info.component';
import { ConfirmNewPasswordComponent } from './components/intro/confirm-new-password/confirm-new-password.component';
import { ConfirmMobileNumberComponent } from './components/intro/confirm-mobile-number/confirm-mobile-number.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LoginComponent,
    IntroComponent,
    RegisterComponent,
    UserTypeComponent,
    ConfirmOtpComponent,
    QuickSignupComponent,
    CustomerInfoComponent,
    ConfirmNewPasswordComponent,
    ConfirmMobileNumberComponent
  ],
  imports: [CommonModule, AuthRoutingModule,  SharedModule,MatIcon ,MatIconModule],
})
export class AuthModule {}
