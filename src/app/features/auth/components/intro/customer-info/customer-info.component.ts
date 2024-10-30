import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/core/classes/User';
import { REGEX } from 'app/core/constants/regex';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { UserMenuTree } from 'app/core/interfaces/UserMenuTree';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelpersService } from 'app/core/services/helpers.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private ithmaarPortalService: IthmaarPortalService,
    private route: Router,
    private httpEndpointService: HttpEndpointService,
    private transferDataService: TransferDataService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private helpersService: HelpersService,
    private toast: ToastrService,
  ) {}

  usedUserNameErrorMsg: string;
  customerDataForm: FormGroup;
  identityTypeDomain: { Code: string; local_name: string }[];
  sexDomain: { Code: string; local_name: string }[];
  params: any[];
  idType: number;
  isCustomerDataFormSubmitted: boolean = false;
  captchaValue: boolean = false;
  private subscriptions: Subscription[] = [];
  isQuickSignUp: boolean = false;
  user: User = new User();
  clntKey: number;
  clientData: any;
  probertyData: string[];
  pageLoad: boolean = false;
  staticTranslation: string[];
  lang: string;
  passwordErrorMsg: string;

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.lang = this.localStorageService.getItem('currentLang');
    this.isQuickSignUp = this.localStorageService.getItem('isQuickSignUp');
    if (this.transferDataService.existedCustomerData == null) {
      this.route.navigate(['/login/customer']);
      this.toast.error(
        this.staticTranslation['SomethingWrong'],
        this.staticTranslation['Error'],
      );
    } else {
      this.getCustomProperties();
    }

    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.route.url.includes('customer')) {
          this.lang = this.localStorageService.getItem('currentLang');
          this.getCustomPropertiesOnChangeLang();
          this.staticTranslation =
            this.localStorageService.getItem('static_translation');
        }
      });
  }

  getCustomPropertiesOnChangeLang() {
    this.params = [{ modKey: staticData.customerInfo }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.callIdentityLovService();
          this.callSexLovServices();
        }),
    );
  }

  getCustomProperties() {
    this.params = [{ modKey: staticData.customerInfo }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.callIdentityLovService();
          this.callSexLovServices();
          this.constructCustomerDataForm();
          this.fillDateInForm(this.transferDataService.existedCustomerData);
          this.pageLoad = true;
        }),
    );
  }

  callSexLovServices() {
    this.params = [
      { lovKey: this.probertyData['wppSex']['lovKey'] },
      { ilmKey: this.probertyData['wppSex']['ilmKey'] },
      { whereClauseValues: this.localStorageService.getItem('currentLang') },
    ];

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.sexDomain = data.payload.data;
        }),
    );
  }

  callIdentityLovService() {
    this.params = [
      { lovKey: this.probertyData['wppIdentityType']['lovKey'] },
      { ilmKey: this.probertyData['wppIdentityType']['ilmKey'] },
      { whereClauseValues: this.localStorageService.getItem('currentLang') },
    ];

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.identityTypeDomain = data.payload.data;
        }),
    );
  }

  ngModelChange(event: any) {
    this.usedUserNameErrorMsg = null;
    this.params = [{ loginName: this.customerDataForm.get('userName').value }];

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('registration/unique/login-name', this.params, 'req')
        .subscribe((data: ApiResponse) => {
          if (data.payload === false) {
            this.usedUserNameErrorMsg =
              'this user name is already in use. please try another one';
          }
        }),
    );
  }

  passwordChange(event: any) {
    this.passwordErrorMsg = null;
    let userName: string = this.customerDataForm.get('userName').value;
    let password: string = this.customerDataForm.get('password').value;

    if (password.includes(userName)) {
      this.passwordErrorMsg =
        'Username must be not included as part of the password';
    }
  }

  constructCustomerDataForm() {
    this.customerDataForm = this.formBuilder.group(
      {
        localFirstName: [{ value: '', disabled: true }],
        localLastName: [{ value: '', disabled: true }],
        identityType: [{ value: '', disabled: true }],
        identityNumber: [{ value: '', disabled: true }],
        birthDate: [{ value: '', disabled: true }],
        sex: [{ value: '', disabled: true }],
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

  fillDateInForm(user: any) {
    this.ithmaarPortalService.log('useruser', user);
    this.idType = user.wppIdentityType;
    this.customerDataForm.get('localFirstName').setValue(user.wppLFirstName);
    this.customerDataForm.get('localLastName').setValue(user.wppLLastName);
    this.customerDataForm.get('birthDate').setValue(user.wppBirthDate);
    this.customerDataForm.get('identityType').setValue(this.idType.toString());
    this.customerDataForm
      .get('identityNumber')
      .setValue(user.wppIdentityNumber);
    this.customerDataForm.get('sex').setValue(user.wppSex);

    this.user.setWppOriginalKey(user.wppOriginalKey);
    this.user.setMainMobileNo(this.transferDataService.mobileNo);
  }

  saveUser() {
    this.isCustomerDataFormSubmitted = true;
    if (
      this.customerDataForm.valid &&
      this.captchaValue &&
      this.usedUserNameErrorMsg == null
    ) {
      this.setAttributes();
      this.params = [{ modKey: staticData.cusMainInfo, serviceType: 'FETCH' }];

      this.subscriptions.push(
        this.httpEndpointService
          .create('registration/exsisted', this.user, this.params)
          .subscribe((data: ApiResponse) => {
            this.ithmaarPortalService.log(
              'data.payloaddata.payload',
              data.payload,
            );
            let token = this.getTokenFromResponse(data.token);
            if (token != null) {
              this.sessionStorageService.setItem('access_token', token);
              this.getClientData(data.payload.clntKey);
              this.setCookiesAttributes();
              this.sessionStorageService.setItem('user_logged', 'true');
              this.sessionStorageService.setItem(
                'user_Id',
                data.payload.usrKey,
              );
              this.sessionStorageService.setItem('user_type', 'CUS');
              this.sessionStorageService.setItem(
                'user_profile_Id',
                data.payload.wppKey,
              );
              this.sessionStorageService.setItem(
                'user_full_name',
                (data.payload.wppLFirstName ? data.payload.wppLFirstName : '') +
                  ' ' +
                  (data.payload.wppLLastName ? data.payload.wppLLastName : ''),
              );
              this.sessionStorageService.setItem(
                'user_foreign_full_name',
                (data.payload.wppFFirstName ? data.payload.wppFFirstName : '') +
                  ' ' +
                  (data.payload.wppFLastName ? data.payload.wppFLastName : ''),
              );
              this.sessionStorageService.setItem('role_key', 2);
              this.sessionStorageService.setItem(
                'login_name',
                data.payload.usrLoginName,
              );
              this.sessionStorageService.setItem(
                'clnt_key',
                data.payload.clntKey,
              );
              this.sessionStorageService.setItem(
                'officer_orig_key',
                data.payload.wppOriginalKey,
              );

              if (
                data.payload.wppImage !== null &&
                data.payload.wppImage !== undefined
              ) {
                let imageSrc =
                  'data:image/jpeg;base64,' + data.payload.wppImage;
                this.sessionStorageService.setItem('user_image', imageSrc);
              } else {
                this.sessionStorageService.setItem('user_image', null);
              }

              if (this.isQuickSignUp) {
                this.fillMenu();
                this.localStorageService.setItem('isQuickSignUp', false);
              } else {
                this.route.navigate(['dashboard/statistics']);
              }
            }
          }),
      );
    }
  }
  modules: UserMenuTree[];
  fillMenu() {
    let fcpKey = this.sessionStorageService.getItem('fcp_key');
    let link = 'dashboard/transactions/my-requests/new';
    let userId = Number(this.sessionStorageService.getItem('user_Id'));
    let params = [
      { usrKey: userId, parentMenuId: staticData.myRequest, fcpKey: fcpKey },
    ];
    this.httpEndpointService
      .getBy('menu/fetch', params, 'req')
      .subscribe((data: ApiResponse) => {
        this.modules = data.payload;
        this.transferDataService.modules = this.modules;
        // let navigationExtras: NavigationExtras = {
        //   queryParams: {
        //       "modules": JSON.stringify(this.modules),

        //   }
        //   ,
        //        skipLocationChange: true
        // };
        this.route.navigate([link]);
      });
  }

  setAttributes() {
    this.ithmaarPortalService.log(
      '_____',
      this.transferDataService.existedCustomerData,
    );
    this.user.setClntKey(this.transferDataService.clntKey);
    this.user.setWppLFirstName(
      this.customerDataForm.get('localFirstName').value,
    );
    this.user.setWppLLastName(this.customerDataForm.get('localLastName').value);
    this.user.setWppBirthDate(this.customerDataForm.get('birthDate').value);
    this.user.setWppIdentityType(
      this.customerDataForm.get('identityType').value,
    );
    this.user.setWppIdentityNumber(
      this.customerDataForm.get('identityNumber').value,
    );
    this.user.setWciMobileNo1(
      this.transferDataService.existedCustomerData['wciMobileNo1'],
    );
    this.user.setWppFFirstName(
      this.transferDataService.existedCustomerData['wppFFirstName'],
    );
    this.user.setWppFFirstName(
      this.transferDataService.existedCustomerData['wppFFirstName'],
    );

    this.user.setWppFLastName(
      this.transferDataService.existedCustomerData['wppFLastName'],
    );
    this.user.setWppFMiddleName(
      this.transferDataService.existedCustomerData['wppFMiddleName'],
    );
    this.user.setWppFThirdName(
      this.transferDataService.existedCustomerData['wppFThirdName'],
    );
    this.user.setWppKey(this.transferDataService.existedCustomerData['wppKey']);
    this.user.setWppLFirstName(
      this.transferDataService.existedCustomerData['wppLFirstName'],
    );
    this.user.setWppLLastName(
      this.transferDataService.existedCustomerData['wppLLastName'],
    );
    this.user.setWppLMiddleName(
      this.transferDataService.existedCustomerData['wppLMiddleName'],
    );
    this.user.setWppMaritalStatus(
      this.transferDataService.existedCustomerData['wppMaritalStatus'],
    );
    this.user.setWppOriginalKey(
      this.transferDataService.existedCustomerData['wppOriginalKey'],
    );

    this.user.setWppLThirdName(
      this.transferDataService.existedCustomerData['wppLThirdName'],
    );

    this.user.setApplicationCode(
      this.transferDataService.existedCustomerData['applicationCode'],
    );

    this.user.setMigStatus(
      this.transferDataService.existedCustomerData['migStatus'],
    );
    this.user.setWcKey(this.transferDataService.existedCustomerData['wcKey']);
    this.user.setIdExpiryDate(
      this.transferDataService.existedCustomerData['idExpiryDate'],
    );

    this.user.setWppSex(this.customerDataForm.get('sex').value);
    this.user.setLoginName(this.customerDataForm.get('userName').value);
    this.user.setPasswordHash(
      this.helpersService.SHA256(this.customerDataForm.get('password').value),
    );
    this.user.setActivated('T');
    this.user.setWppPersonType('CUS');
  }

  setCookiesAttributes() {
    if (this.customerDataForm.get('remember').value === true) {
      this.localStorageService.setItem('remember', 'Yes');
      this.localStorageService.setItem(
        'username',
        this.customerDataForm.get('userName').value,
      );
      this.localStorageService.setItem(
        'password',
        this.customerDataForm.get('password').value,
      );
    } else {
      this.localStorageService.setItem('remember', 'No');
      this.localStorageService.setItem('username', '');
      this.localStorageService.setItem('password', '');
    }
  }

  getTokenFromResponse(response: string): string {
    if (response != null) {
      let splitResponse = response.split(' ', 2);
      return splitResponse[1];
    }
    return null;
  }

  getClientData(clntKey) {
    this.clntKey = +this.sessionStorageService.getItem('clnt_key');
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`client/data/${clntKey}`)
        .subscribe((data) => {
          this.clientData = data.payload;
          this.ithmaarPortalService.log(
            'attachment error client data ',
            data.payload,
          );
          this.sessionStorageService.setItem('sessionTimeOut', data.payload[1]);
          this.sessionStorageService.setItem(
            'attachment_path',
            data.payload[0],
          );
          this.sessionStorageService.setItem('gateWayBpCode', data.payload[2]);
          this.sessionStorageService.setItem('gatewayUrl', data.payload[3]);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
