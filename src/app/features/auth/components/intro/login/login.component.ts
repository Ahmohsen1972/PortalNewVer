import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/core/classes/User';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserLogin } from 'app/core/classes/UserLogin';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { UserMenuTree } from 'app/core/interfaces/UserMenuTree';
import { HelpersService } from 'app/core/services/helpers.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

import { Meta, Title } from '@angular/platform-browser';
import { ProbertyData } from 'app/core/interfaces/ProbertyData';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  userLogin: UserLogin = new UserLogin();
  token: string;
  keyBoardToggle: boolean = false;
  passwordFlag: boolean = false;
  loginForm: FormGroup;
  passHint: string;
  passHint2: string;
  password: string;
  userType: string;
  subscriptionList: Subscription[] = [];
  imageSrc: string;
  userIsAdmin: string;
  probertyData?: ProbertyData ;
  pageLoad: boolean = false;
  params: any;
  staticTranslation: any;

  currentLang: string;
  clntKey: number;
  clientData: any;
  modules: UserMenuTree[];
  modPagePath: string = '/dashboard/statistics';
  lan: string;

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private helpersService: HelpersService,
    private localStorageService: LocalStorageService,
    private httpEndpointService: HttpEndpointService,
    private formBuilder: FormBuilder,
    private ithmaarPortalService: IthmaarPortalService,
    private sessionStorageService: SessionStorageService,
    private transferDataService: TransferDataService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('ALMulla E-finance');
    this.meta.updateTag({ description: 'Angular SSR Implementing' });
    this.lan = this.localStorageService.getItem('currentLang');
    this.pageLoad = false;
    
    this.loginForm = this.formBuilder.group({
      userName: [{ value: null, disabled: false }],
      password: [{ value: null, disabled: false }],
      remember: [''],
    });

    this.getCustomProperties();

    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (
          changes == true &&
          (this.router.url.includes('login/customer') ||
            this.router.url.endsWith('/'))
        ) {
          this.getCustomPropertiesOnChangeLang();
          this.staticTranslation =
            this.localStorageService.getItem('static_translation');
          this.lan = this.localStorageService.getItem('currentLang');
        }
      });
  }

  getCustomPropertiesOnChangeLang() {
    
    this.params = [{ modKey: 128 }];
    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
        }),
    );
    
  }

  checkBeforeRender() {
    if (this.localStorageService.getItem('remember') !== undefined) {
      if (this.localStorageService.getItem('remember') === 'Yes') {
        this.loginForm
          .get('userName')
          .setValue(this.localStorageService.getItem('username'));
        this.loginForm
          .get('password')
          .setValue(this.localStorageService.getItem('password'));
        this.loginForm.get('remember').setValue(true);
      }
    }

    let cusMode: boolean = this.router.url.endsWith('login/customer');
    if (cusMode) this.sessionStorageService.setItem('user_type', 'CUS');
    else this.sessionStorageService.setItem('user_type', 'BU');

    this.userType = this.sessionStorageService.getItem('user_type');
    this.pageLoad = true;
  }

  createLoginForm() {
    const userNameEnabled = this.probertyData?.['userName']?.['apsEnabled'] === 'F';
    const passwordEnabled = this.probertyData?.['password']?.['apsEnabled'] === 'F';

    // Define fallback values to avoid undefined errors
    //const userNameEnabled = this.probertyData?.['userName']?.['apsEnabled'] === 'F' ?? false;
    //const passwordEnabled = this.probertyData?.['password']?.['apsEnabled'] === 'F' ?? false;

    this.loginForm = this.formBuilder.group({
      userName: [
        {
          value: null,
          disabled: !userNameEnabled //this.probertyData['userName']['apsEnabled'] == 'F',
        },

      ],

      password: [
        {
          value: null,
          disabled: !passwordEnabled  //this.probertyData['password']['apsEnabled'] == 'F',
        },
        
      ],

      remember: [''],
    });
  }

  getCustomProperties() {
    console.log("inside get Customer Property ");
    
    setTimeout(() => {
      this.params = [{ modKey: 128 }];
      this.subscriptionList.push(
        this.httpEndpointService
          .getBy('module-attribute/no-sec', this.params, 'path')
          .subscribe((data: ApiResponse) => {
            this.probertyData = data.payload;
            this.staticTranslation =
              this.localStorageService.getItem('static_translation');
            this.createLoginForm();
            this.checkBeforeRender();
          }),
      );
    }, 100);
    
  }

  submit() {
    if (this.loginForm.valid) {
      if (this.userType == 'ADM') {
        this.userType = 'BU';
      }
      this.authFromPortal();
    }
  }

  authFromPortal() {
    this.userLogin.setUserName(this.loginForm.get('userName').value);

    if (this.userType == 'CUS') {
      this.userLogin.setPassword(
        this.helpersService.SHA256(this.loginForm.get('password').value),
      );
      this.userLogin.setIsBusinessUser('F');
    } else {
      this.userLogin.setPassword(this.loginForm.get('password').value);

      this.userLogin.setIsBusinessUser('T');
    }

    this.subscriptionList.push(
      this.httpEndpointService
        .create('portal/login', this.userLogin)
        .subscribe((res: ApiResponse) => {
          this.token = this.getTokenFromResponse(res.token);
          this.localStorageService.setItem(
            'userIsAdmin',
            res.payload.usrIsAdmin,
          );
          this.sessionStorageService.setItem(
            'userIsCsOfficer',
            res.payload.isCsOfficer,
          );
          this.sessionStorageService.setItem(
            'userIsManager',
            res.payload.isManager,
          );
          if (this.token != null) {
            this.setCookiesAttributes();

            this.sessionStorageService.setItem('access_token', this.token);
            this.sessionStorageService.setItem('user_logged', 'true');
            this.sessionStorageService.setItem('user_Id', res.payload.usrKey);
            this.sessionStorageService.setItem(
              'user_identity',
              res.payload.wppIdentityNumber,
            );
            this.sessionStorageService.setItem(
              'user_profile_Id',
              res.payload.wppKey,
            );
            this.sessionStorageService.setItem(
              'user_full_name',
              (res.payload.wppLFirstName ? res.payload.wppLFirstName : '') +
                ' ' +
                (res.payload.wppLLastName ? res.payload.wppLLastName : ''),
            );
            this.sessionStorageService.setItem(
              'user_foreign_full_name',
              (res.payload.wppFFirstName ? res.payload.wppFFirstName : '') +
                ' ' +
                (res.payload.wppFLastName ? res.payload.wppFLastName : ''),
            );
            this.sessionStorageService.setItem(
              'login_name',
              res.payload.usrLoginName,
            );
            this.sessionStorageService.setItem('clnt_key', res.payload.clntKey);
            this.sessionStorageService.setItem(
              'officer_orig_key',
              res.payload.wppOriginalKey,
            );
            this.getClientData();

            if (
              res.payload.wppImage !== null &&
              res.payload.wppImage !== undefined
            ) {
              this.imageSrc = 'data:image/jpeg;base64,' + res.payload.wppImage;
              this.sessionStorageService.setItem('user_image', this.imageSrc);
            } else {
              this.sessionStorageService.setItem('user_image', null);
            }

            if (this.userType == 'CUS') {
              this.sessionStorageService.setItem('role_key', 2);
              if (!this.sessionStorageService.getItem('fcp_key'))
                this.navigateToDefaultUrl();
              else this.fillMenu();
            } else if (this.userType == 'BU' && res.payload.usrIsAdmin == 'T') {
              this.sessionStorageService.setItem('role_key', 0);
              this.router.navigate(['dashboard/setup']);
            } else {
              this.sessionStorageService.setItem('role_key', 0);
              this.navigateToDefaultUrl();
            }

            this.toast.success(
              this.staticTranslation['LoginCompletedSuccessfully'],
              this.staticTranslation['Success'],
            );
          }
        }),
    );
  }

  fillMenu() {
    let fcpKey = this.sessionStorageService.getItem('fcp_key');

    let link = 'dashboard/transactions/my-requests/new';

    let userId = Number(this.sessionStorageService.getItem('user_Id'));
    let params = [
      { usrKey: userId, parentMenuId: staticData.myRequest, fcpKey: fcpKey },
    ];
    this.subscriptionList.push(
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
          //        skipLocationChange: false,

          // };
          // this.router.navigate([link],  navigationExtras);
          this.router.navigate([link]);
          //this.router.navigate([link]).then(()=>this.ithmaarPortalService.emmiter.emit(this.modules))
        }),
    );
  }

  navigateToDefaultUrl() {
    this.params = [
      { usrKey: Number(this.sessionStorageService.getItem('user_Id')) },
    ];
    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('menu/fetch', this.params, 'req')
        .subscribe((data: ApiResponse) => {
          this.modules = data.payload;
          this.router.navigate([this.modules[0]?.modPagePath]);
        }),
    );
    // this.router.navigate([this.modPagePath]);
  }

  setCookiesAttributes() {
    if (this.loginForm.get('remember').value === true) {
      this.localStorageService.setItem('remember', 'Yes');
      this.localStorageService.setItem(
        'username',
        this.loginForm.get('userName').value,
      );
      this.localStorageService.setItem(
        'password',
        this.loginForm.get('password').value,
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

  getClientData() {
    this.clntKey = +this.sessionStorageService.getItem('clnt_key');
    this.subscriptionList.push(
      this.httpEndpointService
        .getAll(`client/data/${this.clntKey}`)
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
          this.sessionStorageService.setItem('gatewayBpCode', data.payload[2]);
          this.sessionStorageService.setItem('gatewayUrl', data.payload[3]);
        }),
    );
  }

  onApplyWrite(event) {
    this.loginForm.get('password').setValue(event);
  }

  toggleKeyboard() {
    this.transferDataService.virtualKeyboard.next(
      this.loginForm.get('password').value,
    );

    if (this.keyBoardToggle === false) {
      this.keyBoardToggle = true;
    } else {
      this.keyBoardToggle = false;
    }
  }

  onMouseUp(event: any) {
    this.passHint = 'Can not use your keyboard,';
    this.passHint2 = 'Please use virtual keyboard to enter your password';
    this.passwordFlag = true;
  }

  onBlur(event: any) {
    this.passwordFlag = false;
  }

  resetPassword() {
    this.transferDataService.fromResetPass = true;
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
