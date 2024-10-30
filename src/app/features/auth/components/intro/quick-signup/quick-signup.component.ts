import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'app/core/classes/User';
import { Component, OnInit } from '@angular/core';
import { REGEX } from 'app/core/constants/regex';
import { ExistedUser } from 'app/core/classes/ExistedUser';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HelpersService } from 'app/core/services/helpers.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { GenericPopupComponent } from 'app/shared/components/generic-popup/generic-popup.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quick-signup',
  templateUrl: './quick-signup.component.html',
  styleUrls: ['./quick-signup.component.scss'],
})
export class QuickSignupComponent implements OnInit {
  civilIdErrorMessage: string;
  isWrongId: boolean = false;
  tempFlag: boolean = false;
  existed: boolean = false;

  showNewCustomer = true;
  showAlreadyCustomer = false;
  registerationForm: FormGroup;
  isRegisterationFormSubmitted: boolean = false;
  captchaValue: boolean = false;
  usedUserNameErrorMsg: string;
  user: User = new User();
  existedUser: ExistedUser = new ExistedUser();
  params: any[];
  sexDomain: { Code: string; local_name: string }[];
  identityTypeDomain: { Code: string; local_name: string }[];
  clients: string[];
  staticTranslation: string[];
  private subscriptions: Subscription[] = [];
  probertyData: string[];
  pageLoad: boolean = false;
  lang: string;
  passwordErrorMsg: string;

  constructor(
    private ithmaarPortalService: IthmaarPortalService,
    private route: Router,
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private formBuilder: FormBuilder,
    private helpersService: HelpersService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private transferDataService: TransferDataService,
  ) {}

  ngOnInit(): void {
    this.getCustomProperties();
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.lang = this.localStorageService.getItem('currentLang');

    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.route.url.includes('register')) {
          this.staticTranslation =
            this.localStorageService.getItem('static_translation');
          this.lang = this.localStorageService.getItem('currentLang');

          this.getCustomPropertiesOnChangeLang();
        }
      });
  }

  getCustomProperties() {
    // this.params = [{ modKey: staticData.register , rolKey: staticData.customerRolKey , prcKey:staticData.genericPrcKey }];
    this.params = [{ modKey: staticData.register }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.ithmaarPortalService.log(
            'property data for register ________ >> ',
            this.probertyData,
          );

          this.createRegisterationForm();
          this.pageLoad = true;
        }),
    );
  }

  disablingArrowa(id) {
    this.ithmaarPortalService.disablingArrows(id);
  }

  getCustomPropertiesOnChangeLang() {
    this.params = [{ modKey: staticData.register }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe(
          (data: ApiResponse) => {
            this.probertyData = data.payload;
          },
          (err) => {},
        ),
    );
  }

  createRegisterationForm() {
    this.registerationForm = this.formBuilder.group(
      {
        clientType: 1,
        localFirstName: [
          '',
          [Validators.required, Validators.pattern(REGEX.patternName)],
        ],
        localLastName: [
          '',
          [Validators.required, Validators.pattern(REGEX.patternName)],
        ],
        identityType: '1',
        identityNumber: ['', [Validators.required]],
        mobileNumber1: ['', [Validators.required, Validators.min(0)]],
        userName: ['', [Validators.required]],
        password: [
          '',
          [Validators.required, Validators.pattern(REGEX.password)],
        ],
        confirmPassword: ['', [Validators.required]],
        remember: [''],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      },
    );
    this.showForm({ checked: true });
  }

  passwordChange(event: any) {
    this.passwordErrorMsg = null;
    let userName: string = this.registerationForm.get('userName').value;
    let password: string = this.registerationForm.get('password').value;

    if (password.includes(userName)) {
      this.passwordErrorMsg =
        'Username must be not included as part of the password';
    }
  }

  showForm(e) {
    let value = e.checked;
    this.isRegisterationFormSubmitted = false;
    this.captchaValue = false;

    if (value === true) {
      this.showAlreadyCustomer = true;
      this.showNewCustomer = false;
      this.registerationForm.clearValidators();
      this.registerationForm.get('localFirstName').clearValidators();
      this.registerationForm.get('localLastName').clearValidators();
      this.registerationForm.get('userName').clearValidators();
      this.registerationForm.get('password').clearValidators();
      this.registerationForm.get('confirmPassword').clearValidators();

      this.updateValueAndValidity();
    } else {
      this.showAlreadyCustomer = false;
      this.showNewCustomer = true;

      this.registerationForm
        .get('localFirstName')
        .setValidators([Validators.required]);
      this.registerationForm
        .get('localLastName')
        .setValidators([Validators.required]);
      this.registerationForm
        .get('userName')
        .setValidators([Validators.required]);
      this.registerationForm
        .get('password')
        .setValidators([
          Validators.required,
          Validators.pattern(REGEX.password),
        ]);
      this.registerationForm
        .get('confirmPassword')
        .setValidators([Validators.required]);
      this.registerationForm.setValidators(
        this.mustMatchNew('password', 'confirmPassword'),
      );

      this.updateValueAndValidity();
    }
  }

  updateValueAndValidity() {
    this.registerationForm.get('localFirstName').updateValueAndValidity();
    this.registerationForm.get('localLastName').updateValueAndValidity();
    this.registerationForm.get('userName').updateValueAndValidity();
    this.registerationForm.get('password').updateValueAndValidity();
    this.registerationForm.get('confirmPassword').updateValueAndValidity();
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  mustMatchNew(controlName: string, matchingControlName: string): ValidatorFn {
    const control = this.registerationForm.controls[controlName];
    const matchingControl =
      this.registerationForm.controls[matchingControlName];
    return (
      abstractControl: AbstractControl,
    ): { [key: string]: any } | null => {
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {

      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return control.value !== matchingControl.value
        ? { mustMatch: true }
        : null;
    };
  }

  verifyDataBeforeRegister() {
    this.isRegisterationFormSubmitted = true;
    if (this.showAlreadyCustomer == false) {
      this.ithmaarPortalService.log('register button issue new user ');
      let UserDataVerfying = {
        modKey: 148,
        serviceType: 'MIGRATE',
        clntKey: 1,
        loginName: this.registerationForm.get('userName').value,
        civilId: this.registerationForm.get('identityNumber').value.toString(),
        isoCode: 'KW',
        checkCivilId: 'T',
        requestedPage: 'registration',
      };
      this.subscriptions.push(
        this.httpEndpointService
          .create('verify-data', UserDataVerfying)
          .subscribe((data) => {
            if (
              data.payload.loginNameVerifyResult == true &&
              data.payload.verifiedCivilId == true &&
              data.payload.existedCivilId == false
            ) {
              this.register();
            } else {
              if (data.payload.loginNameVerifyResult == false)
                this.usedUserNameErrorMsg =
                  'this user name is already in use. please try another one';
              if (data.payload.verifiedCivilId == false) {
                this.isWrongId = true;
                this.civilIdErrorMessage = this.staticTranslation['wrongId'];
              }
              if (data.payload.existedCivilId == true) {
                const dialogRef = this.dialog.open(GenericPopupComponent, {
                  width: '500px',
                  panelClass: 'delete-popup',
                  data: {
                    message: this.staticTranslation['Identity_Number'],
                    title: 'error',
                  },
                  direction:
                    this.localStorageService.getItem('currentLang') == 'AR'
                      ? 'rtl'
                      : 'ltr',
                });
                dialogRef.afterClosed().subscribe((result) => {
                  // window.location.reload();
                });
              }
            }
          }),
      );
    } else {
      this.ithmaarPortalService.log('register button issue existed');
      let UserDataVerfying = {
        modKey: 148,
        serviceType: 'MIGRATE',
        clntKey: 1,
        civilId: this.registerationForm.get('identityNumber').value.toString(),
        isoCode: 'KW',
        checkCivilId: 'F',
        requestedPage: 'registrationExisted',
      };
      this.subscriptions.push(
        this.httpEndpointService
          .create('verify-data', UserDataVerfying)
          .subscribe((data) => {
            if (
              data.payload.verifiedCivilId == true &&
              data.payload.existedCivilId == false
            ) {
              this.register();
            } else {
              if (data.payload.verifiedCivilId == false) {
                this.isWrongId = true;
                this.civilIdErrorMessage = this.staticTranslation['wrongId'];
              }
              if (data.payload.existedCivilId == true) {
                const dialogRef = this.dialog.open(GenericPopupComponent, {
                  width: '500px',
                  panelClass: 'delete-popup',
                  data: {
                    message: this.staticTranslation['Identity_Number'],
                    title: 'error',
                  },
                  direction:
                    this.localStorageService.getItem('currentLang') == 'AR'
                      ? 'rtl'
                      : 'ltr',
                });
                dialogRef.afterClosed().subscribe((result) => {
                  // window.location.reload();
                });
              }
            }
          }),
      );
    }
  }

  register() {
    this.isRegisterationFormSubmitted = true;

    if (this.registerationForm.valid) {
      if (this.showNewCustomer) {
        if (this.captchaValue && this.usedUserNameErrorMsg == null)
          this.newCustomerRegister();
      } else this.pullCustomerData();
    }
  }
  startWriting(fromWhere) {
    this.isRegisterationFormSubmitted = false;
    if (fromWhere == 'id') {
      this.civilIdErrorMessage = null;
      this.isWrongId = false;
    } else if (fromWhere == 'name') {
      this.usedUserNameErrorMsg = null;
    }
  }

  verifyingCivilId(fromForm: string) {
    this.tempFlag = false;

    this.civilIdErrorMessage = null;
    this.isWrongId = false;
    this.params = [
      {
        modKey: 148,
        serviceType: 'MIGRATE',
        clntKey: 1,
      },
    ];
    let bodyObject;
    if (fromForm === 'New')
      bodyObject = {
        civilId: this.registerationForm.get('identityNumber').value.toString(),
        isoCode: 'KW',
        checkCivilId: 'T',
      };
    else
      bodyObject = {
        civilId: this.registerationForm.get('identityNumber').value.toString(),
        isoCode: 'KW',
        checkCivilId: 'F',
      };

    this.subscriptions.push(
      this.httpEndpointService
        .create('registration/verify-civilID', bodyObject, this.params)
        .subscribe(
          (data: ApiResponse) => {
            this.existed = data.payload.existed;
            //data.payload.verified=true;
            if (data.payload.verified === false) {
              this.isWrongId = true;

              this.civilIdErrorMessage = this.staticTranslation['wrongId'];
              this.registerationForm.get('identityNumber').setValue('');
            }
            if (this.existed) {
              const dialogRef = this.dialog.open(GenericPopupComponent, {
                width: '500px',
                panelClass: 'delete-popup',
                data: {
                  message: this.staticTranslation['Identity_Number'],
                  title: 'error',
                },
                direction:
                  this.localStorageService.getItem('currentLang') == 'AR'
                    ? 'rtl'
                    : 'ltr',
              });
              dialogRef.afterClosed().subscribe((result) => {
                // window.location.reload();
              });
            }
          },
          (error) => {
            this.ithmaarPortalService.log(error);
          },
        ),
    );
  }
  newCustomerRegister() {
    this.setAttributes();

    this.subscriptions.push(
      this.httpEndpointService.create('registration/new', this.user).subscribe(
        (data: ApiResponse) => {
          if (data.success) {
            this.ithmaarPortalService.log('otp :  ', data.payload);
            this.localStorageService.setItem('userForResendOTP', this.user);
            this.sessionStorageService.setItem(
              'login_name',
              this.registerationForm.get('userName').value,
            );
            this.transferDataService.newCustomer = true;
            this.setCookiesAttributes();
            this.localStorageService.setItem('isQuickSignUp', true);
            this.route.navigate(['/otp']);
          }
        },
        (error) => {},
      ),
    );
  }

  pullCustomerData() {
    this.existedUser.setIdType(
      this.registerationForm.get('identityType').value,
    );
    this.existedUser.setIdNumber(
      this.registerationForm.get('identityNumber').value,
    );
    this.existedUser.setMobileNo(
      this.registerationForm.get('mobileNumber1').value,
    );
    this.existedUser.setClntKey(this.registerationForm.get('clientType').value);
    this.transferDataService.clntKey =
      this.registerationForm.get('clientType').value;

    this.params = [{ modKey: staticData.cusMainInfo, serviceType: 'FETCH' }];

    this.subscriptions.push(
      this.httpEndpointService
        .create(
          'registration/pull-customer-data',
          this.existedUser,
          this.params,
        )
        .subscribe((data: ApiResponse) => {
          this.ithmaarPortalService.log('otp :  ', data.payload);
          this.localStorageService.setItem(
            'existedUserForResendOTP',
            this.existedUser,
          );
          this.sessionStorageService.setItem(
            'id_number',
            this.registerationForm.get('identityNumber').value,
          );
          this.transferDataService.newCustomer = false;
          this.transferDataService.mobileNo =
            this.registerationForm.get('mobileNumber1').value;
          this.localStorageService.setItem('isQuickSignUp', true);
          this.route.navigate(['/otp']);
        }),
    );
  }

  setAttributes() {
    this.user.setClntKey(this.registerationForm.get('clientType').value);
    this.user.setWppLFirstName(
      this.registerationForm.get('localFirstName').value,
    );
    this.user.setWppLLastName(
      this.registerationForm.get('localLastName').value,
    );
    this.user.setMainMobileNo(
      this.registerationForm.get('mobileNumber1').value,
    );
    this.user.setWppIdentityType(
      this.registerationForm.get('identityType').value,
    );
    this.user.setWppIdentityNumber(
      this.registerationForm.get('identityNumber').value,
    );
    this.user.setWppPersonType('CUS');
    this.user.setLoginName(this.registerationForm.get('userName').value);
    this.user.setPasswordHash(
      this.helpersService.SHA256(this.registerationForm.get('password').value),
    );
    this.user.setActivated('T');
  }

  ngModelChange(event: any) {
    this.tempFlag = false;
    this.usedUserNameErrorMsg = null;
    this.params = [{ loginName: this.registerationForm.get('userName').value }];

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('registration/unique/login-name', this.params, 'req')
        .subscribe(
          (data: ApiResponse) => {
            if (data.payload === false) {
              this.usedUserNameErrorMsg =
                'this user name is already in use. please try another one';
            }
          },
          (error) => {
            this.ithmaarPortalService.log(error);
          },
        ),
    );
  }

  setCookiesAttributes() {
    if (this.registerationForm.get('remember').value === true) {
      this.localStorageService.setItem('remember', 'Yes');
      this.localStorageService.setItem(
        'username',
        this.registerationForm.get('userName').value,
      );
      this.localStorageService.setItem(
        'password',
        this.registerationForm.get('password').value,
      );
    } else {
      this.localStorageService.setItem('remember', 'No');
      this.localStorageService.setItem('username', '');
      this.localStorageService.setItem('password', '');
    }
  }

  resolved(captchaResponse: string) {
    if (captchaResponse === null) {
      this.captchaValue = false;
    } else {
      this.captchaValue = true;
    }
    this.ithmaarPortalService.log(
      `Resolved captcha with response: ${captchaResponse}`,
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
