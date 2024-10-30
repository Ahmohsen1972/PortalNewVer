import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserMenuTree } from 'app/core/interfaces/UserMenuTree';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss'],
})
export class ConfirmOtpComponent implements OnInit, OnDestroy {
  verificationForm: FormGroup;
  params: any[];
  private subscriptions: Subscription[] = [];
  clientData: any;
  clntKey: number;
  probertyData: string[];
  pageLoad: boolean = false;
  staticTranslation: string[];
  lang: string;
  counter: number = 120;
  duration: number = 120;
  countDownVisible: boolean = true;
  countDownFun: any;
  isQuickSignUp: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private sessionStorageService: SessionStorageService,
    private httpEndpointService: HttpEndpointService,
    private transferDataService: TransferDataService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private ithmaarPortalService: IthmaarPortalService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');

    this.lang = this.localStorageService.getItem('currentLang');
    this.isQuickSignUp = this.localStorageService.getItem('isQuickSignUp');

    if (this.transferDataService.newCustomer == null) {
      this.route.navigate(['/login/customer']);

      this.toast.error(
        this.staticTranslation['SomethingWrong'],
        this.staticTranslation['Error'],
      );
    }

    this.createVerificationForm();
    this.getCustomProperties();

    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.route.url.includes('otp')) {
          this.lang = this.localStorageService.getItem('currentLang');
          this.getCustomPropertiesOnChangeLang();
        }
      });
  }

  getCustomPropertiesOnChangeLang() {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.params = [{ modKey: staticData.confirmOtp }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
        }),
    );
  }

  createVerificationForm() {
    this.verificationForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required]],
    });
    this.countDown();
  }

  getCustomProperties() {
    this.params = [{ modKey: staticData.confirmOtp }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  registerAfterOtp() {
    clearInterval(this.countDownFun);
    this.localStorageService.setItem('userForResendOTP', null);
    this.localStorageService.setItem('existedUserForResendOTP', null);
    if (this.verificationForm.valid) {
      this.callTermsCondition();
    }
  }

  callTermsCondition() {
    /*
    let newCustomer = this.transferDataService.newCustomer;
    const dialogRef = this.dialog.open(TermsConditionsComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        type: 'G',
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (newCustomer) {
          this.newCustomerVerifyCode();
        } else {
          this.existedCustomerVerifyCode();
        }
      }
    });*/
  }

  existedCustomerVerifyCode() {
    let verificationCode = this.verificationForm.get('verificationCode').value;
    let idNumber = this.sessionStorageService.getItem('id_number');

    this.params = [{ key: idNumber, code: verificationCode }];

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('registration/otp/verify-exsisted', this.params, 'req')
        .subscribe((data: ApiResponse) => {
          this.transferDataService.existedCustomerData = data.payload;
          this.route.navigate(['/customer']);
        }),
    );
  }

  newCustomerVerifyCode() {
    let verificationCode = this.verificationForm.get('verificationCode').value;
    let loginName = this.sessionStorageService.getItem('login_name');

    this.params = [{ key: loginName, code: verificationCode }];

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('registration/otp/verify-new', this.params, 'req')
        .subscribe((data: ApiResponse) => {
          let token = this.getTokenFromResponse(data.token);

          if (token != null) {
            this.sessionStorageService.setItem('access_token', token);
            this.sessionStorageService.setItem('user_logged', 'true');
            this.sessionStorageService.setItem('user_Id', data.payload.usrKey);
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
            this.getClientData();

            if (
              data.payload.wppImage !== null &&
              data.payload.wppImage !== undefined
            ) {
              let imageSrc = 'data:image/jpeg;base64,' + data.payload.wppImage;
              this.sessionStorageService.setItem('user_image', imageSrc);
            } else {
              this.sessionStorageService.setItem('user_image', null);
            }

            if (this.isQuickSignUp) {
              this.fillMenu();
              //  this.route.navigate(['dashboard/transactions/my-requests/new']);
              this.localStorageService.setItem('isQuickSignUp', false);
            } else {
              this.route.navigate(['dashboard/statistics']);
            }
          }
        }),
    );
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
        this.ithmaarPortalService.log('test entry ', this.modules);
        this.transferDataService.modules = this.modules;
        //    let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //       "modules": JSON.stringify(this.modules),

        //   }
        //   ,
        //        skipLocationChange: false
        // };
        this.route.navigate([link]);
      });
  }
  getTokenFromResponse(response: string): string {
    if (response != null) {
      let splitResponse = response.split(' ', 2);
      return splitResponse[1];
    }
    return null;
  }

  resendOtpCode() {
    clearInterval(this.countDownFun);
    this.counter = 120;
    this.countDownVisible = false;
    this.duration = 120;
    let params = [{ modKey: staticData.cusMainInfo, serviceType: 'FETCH' }];
    let user = this.localStorageService.getItem('userForResendOTP');
    let existedUser = this.localStorageService.getItem(
      'existedUserForResendOTP',
    );
    if (user != null) {
      this.subscriptions.push(
        this.httpEndpointService
          .create('registration/new', user)
          .subscribe((data) => {
            this.ithmaarPortalService.log('otp :  ', data.payload);
            this.countDown();
          }),
      );
    }
    if (existedUser != null) {
      this.subscriptions.push(
        this.httpEndpointService
          .create('registration/pull-customer-data', existedUser, params)
          .subscribe((data) => {
            this.ithmaarPortalService.log('otp :  ', data.payload);
            this.countDown();
          }),
      );
    }
  }

  countDown() {
    this.countDownVisible = true;
    this.countDownFun = setInterval(() => {
      this.duration = this.duration - 1;
      this.counter = this.duration;
      if (this.duration < 1 || this.countDownVisible == false) {
        this.countDownVisible = false;
        clearInterval(this.countDownFun);
        this.route.navigate(['register']);
      }
    }, 1000);
  }

  getClientData() {
    this.clntKey = +this.sessionStorageService.getItem('clnt_key');
    this.subscriptions.push(
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
