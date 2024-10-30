import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { staticData } from 'app/core/constants/StatisticData';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { GenericOffer } from 'app/core/interfaces/genericOffer';
import { UserMenuTree } from 'app/core/interfaces/UserMenuTree';
import { DefaultValues } from 'app/core/interfaces/defaultValues';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FinanceProduct } from 'app/core/interfaces/financeProduct';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { ViewProductInfoComponent } from '../view-product-info/view-product-info.component';

@Component({
  selector: 'app-financial-prog',
  templateUrl: './financial-prog.component.html',
  styleUrls: ['./financial-prog.component.scss'],
})
export class FinancialProgComponent implements OnInit, OnDestroy {
  productName: string;
  selectedLang: string;
  currentLang = 'EN';
  translateBtnToggle: boolean = true;
  staticTranslation: string[] = [];
  defaultValues: DefaultValues;
  requestedAmount: number = 0;
  monthlyInsatllment: number = 0;
  downPayment: number = 0;
  profitRate: number = 0;
  // @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  financeProductsData: FinanceProduct[];
  pageLoad: boolean = false;
  isLogged: boolean = false;
  subscriptions: Subscription[] = [];
  genericOffer: GenericOffer;
  requestStatus = '';
  requestedAmountValidationMSG: string;
  requestedAmountErrFalg: boolean = false;
  downPaymentFlag: boolean = true;
  numOfInstallmentsValidationMSG: string;
  numOfInstallmentsErrFlag: boolean = false;
  downPaymentValidationMSG: string;
  downPaymentErrFalg: boolean = false;
 

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<FinancialProgComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    private transferDataService: TransferDataService,
    private ithmaarPortalService: IthmaarPortalService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getCurrentLang();
    this.transferDataService.languageCanged.next(false);
    this.transferDataService.languageCanged.subscribe((res) => {
      if (res == true) {
        this.onChangingLanguage();
      }
    });
    this.requestStatus = this.data.status;
  }

  disablingArrowa(id) {
    this.ithmaarPortalService.disablingArrows(id);
  }

  getCurrentLang() {
    if (this.localStorageService.getItem('currentLang') == null) {
      this.ithmaarPortalService.log('inside get default lang');
      this.subscriptions.push(
        this.httpEndpointService
          .getAll('languages/all')
          .subscribe((data: ApiResponse) => {
            data.payload.forEach((lang) => {
              if (lang['langIsDefault'] === 'T') {
                this.currentLang = lang['langsShortName'];
                this.localStorageService.setItem(
                  'currentLang',
                  this.currentLang,
                );
                let params = [
                  {
                    langShortName:
                      this.localStorageService.getItem('currentLang'),
                  },
                ];
                this.subscriptions.push(
                  this.httpEndpointService
                    .getBy('language-data', params, 'path')
                    .subscribe((data: ApiResponse) => {
                      this.ithmaarPortalService.log(
                        'static translation data : ',
                        data.payload[0]['jsonObj'],
                      );
                      this.localStorageService.setItem(
                        'static_translation',
                        data.payload[0]['jsonObj'],
                      );
                      this.getFinanceProductsData();
                    }),
                );
              }
            });
          }),
      );
    } else {
      this.getFinanceProductsData();
    }
  }

  // nextSlide(usefulSwiper: SwiperComponent) {
  //   this.usefulSwiper.swiper.slideNext();
  //   let productKey =
  //     this.financeProductsData[usefulSwiper.swiper.realIndex].fcpKey;
  //   this.productName =
  //     this.financeProductsData[usefulSwiper.swiper.realIndex].productName;
  //   let productStatus =
  //     this.financeProductsData[usefulSwiper.swiper.realIndex].fcpItemsStatus;

  //   this.ithmaarPortalService.log(
  //     'fff ',
  //     this.financeProductsData[usefulSwiper.swiper.realIndex]
  //       .fcpDownPaymentAllowed,
  //   );
  //   if (
  //     this.financeProductsData[usefulSwiper.swiper.realIndex]
  //       .fcpDownPaymentAllowed == 'T'
  //   )
  //     this.downPaymentFlag = true;
  //   else this.downPaymentFlag = false;

  //   this.getDefaultValuesOfProduct(
  //     productKey,
  //     this.productName,
  //     productStatus,
  //     this.downPaymentFlag,
  //   );
  // }

  // previousSlide(usefulSwiper: SwiperComponent) {
  //   this.usefulSwiper.swiper.slidePrev();
  //   let productKey =
  //     this.financeProductsData[usefulSwiper.swiper.realIndex].fcpKey;
  //   this.productName =
  //     this.financeProductsData[usefulSwiper.swiper.realIndex].productName;
  //   let productStatus =
  //     this.financeProductsData[usefulSwiper.swiper.realIndex].fcpItemsStatus;
  //   if (
  //     this.financeProductsData[usefulSwiper.swiper.realIndex]
  //       .fcpDownPaymentAllowed == 'T'
  //   )
  //     this.downPaymentFlag = true;
  //   else this.downPaymentFlag = false;
  //   this.getDefaultValuesOfProduct(
  //     productKey,
  //     this.productName,
  //     productStatus,
  //     this.downPaymentFlag,
  //   );
  // }

  getInitialSlide() {
    let productKey = this.financeProductsData[0].fcpKey;
    this.productName = this.financeProductsData[0].productName;
    let productStatus = this.financeProductsData[0].fcpItemsStatus;
    if (this.financeProductsData[0].fcpDownPaymentAllowed == 'T')
      this.downPaymentFlag = true;
    else this.downPaymentFlag = false;
    this.getDefaultValuesOfProduct(
      productKey,
      this.productName,
      productStatus,
      this.downPaymentFlag,
    );
  }

  getStaticTranslation() {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    if (this.sessionStorageService.getItem('access_token'))
      this.isLogged = true;
    this.pageLoad = true;
  }

  onChangingLanguage() {
    this.sessionStorageService.removeItem('fcp_key');
    this.productName = null;
    this.pageLoad = false;
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('finance-products-data/all')
        .subscribe((data) => {
          this.financeProductsData = data.payload;
          this.getStaticTranslation();
        }),
    );
  }

  getFinanceProductsData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('finance-products-data/all')
        .subscribe((data) => {
          this.financeProductsData = data.payload;
          this.ithmaarPortalService.log(
            'financeProductsData ',
            this.financeProductsData,
          );
          this.getStaticTranslation();
          this.getInitialSlide();
        }),
    );
  }

  getDefaultValuesOfProduct(
    productKey,
    productName,
    productStatus,
    downPaymentFlag,
  ) {
    this.nullifyValidationFlagsAndMsg();
    this.sessionStorageService.setItem('fcp_key', productKey);
    this.sessionStorageService.setItem('ur_item_status', productStatus);
    this.sessionStorageService.setItem('downPaymentFlag', downPaymentFlag);

    this.productName = productName;
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`user-request/default-values/${productKey}`)
        .subscribe((data) => {
          this.defaultValues = data.payload;
          this.ithmaarPortalService.log('defaultValues ', this.defaultValues);
          this.requestedAmount = +this.defaultValues.urPrincipal.split('|')[0];
          this.monthlyInsatllment =
            +this.defaultValues.urTenureNo.split('|')[0];
          this.downPayment =
            +this.defaultValues.urDownPaymentPercentage.split('|')[0];
          this.profitRate = +this.defaultValues.urProfitRate.split('|')[0];
          this.generateGenericOffer();
        }),
    );
  }

  generateGenericOffer() {
    let values;
    if (this.downPaymentFlag) {
      values = {
        principal: +this.requestedAmount,
        monthsNo: +this.monthlyInsatllment,
        downPayment: +this.downPayment,
        profitRate: +this.profitRate,
        graceDays: +this.defaultValues.urGraceDays.split('|')[0],
      };
    } else {
      values = {
        principal: +this.requestedAmount,
        monthsNo: +this.monthlyInsatllment,
        downPayment: 0,
        profitRate: +this.profitRate,
        graceDays: +this.defaultValues.urGraceDays.split('|')[0],
      };
    }
    this.subscriptions.push(
      this.httpEndpointService
        .create('user-request/generic-offer', values)
        .subscribe((data) => {
          this.genericOffer = data.payload;
          this.ithmaarPortalService.log('generic offer ', this.genericOffer);
        }),
    );
  }

  goSignIn() {
    if (!this.sessionStorageService.getItem('fcp_key')) {
      this.toastr.warning('please choose product first', 'Warning');
    } else {
      this.overridingDataForRequestDefaultValues();
      if (this.isLogged) {
        this.fillMenu();
      } else {
        this.router.navigate(['login/customer']);
      }
    }
  }

  validateRequestedAmount(value) {
    this.requestedAmountValidationMSG = null;
    this.requestedAmountErrFalg = false;
    if (value > +this.defaultValues.urPrincipal.split('|')[1]) {
      this.requestedAmountErrFalg = true;
      this.requestedAmountValidationMSG =
        '*' +
        this.staticTranslation['requestedAmount'] +
        ' ' +
        this.staticTranslation['forProduct'] +
        ' ' +
        this.productName +
        ' ' +
        this.staticTranslation['notMoreThan'] +
        ' ' +
        +this.defaultValues.urPrincipal.split('|')[1];
    }

    if (value < +this.defaultValues.urPrincipal.split('|')[2]) {
      this.requestedAmountErrFalg = true;
      this.requestedAmountValidationMSG =
        '*' +
        this.staticTranslation['requestedAmount'] +
        ' ' +
        this.staticTranslation['forProduct'] +
        ' ' +
        this.productName +
        ' ' +
        this.staticTranslation['notLessThan'] +
        ' ' +
        +this.defaultValues.urPrincipal.split('|')[2];
    }
  }

  validateInstallemntNo(value) {
    this.numOfInstallmentsValidationMSG = null;
    this.numOfInstallmentsErrFlag = false;
    if (value > +this.defaultValues.urTenureNo.split('|')[1]) {
      this.numOfInstallmentsErrFlag = true;
      this.numOfInstallmentsValidationMSG =
        '*' +
        this.staticTranslation['monthlyInsatllment'] +
        ' ' +
        this.staticTranslation['forProduct'] +
        ' ' +
        this.productName +
        ' ' +
        this.staticTranslation['notMoreThan'] +
        ' ' +
        +this.defaultValues.urTenureNo.split('|')[1];
    }

    if (value < +this.defaultValues.urTenureNo.split('|')[2]) {
      this.numOfInstallmentsErrFlag = true;
      this.numOfInstallmentsValidationMSG =
        '*' +
        this.staticTranslation['monthlyInsatllment'] +
        ' ' +
        this.staticTranslation['forProduct'] +
        ' ' +
        this.productName +
        ' ' +
        this.staticTranslation['notLessThan'] +
        ' ' +
        +this.defaultValues.urTenureNo.split('|')[2];
    }
  }

  validateDownPayment(value) {
    this.downPaymentValidationMSG = null;
    this.downPaymentErrFalg = false;
    if (value > +this.defaultValues.urDownPaymentPercentage.split('|')[1]) {
      this.downPaymentErrFalg = true;
      this.downPaymentValidationMSG =
        '*' +
        this.staticTranslation['downPayment'] +
        ' ' +
        this.staticTranslation['forProduct'] +
        ' ' +
        this.productName +
        ' ' +
        this.staticTranslation['notMoreThan'] +
        ' ' +
        +this.defaultValues.urDownPaymentPercentage.split('|')[1];
    }

    if (value < +this.defaultValues.urDownPaymentPercentage.split('|')[2]) {
      this.downPaymentErrFalg = true;
      this.downPaymentValidationMSG =
        '*' +
        this.staticTranslation['downPayment'] +
        ' ' +
        this.staticTranslation['forProduct'] +
        ' ' +
        this.productName +
        ' ' +
        this.staticTranslation['notLessThan'] +
        ' ' +
        +this.defaultValues.urDownPaymentPercentage.split('|')[2];
    }
  }

  nullifyValidationFlagsAndMsg() {
    this.requestedAmountValidationMSG = null;
    this.numOfInstallmentsValidationMSG = null;
    this.downPaymentValidationMSG = null;
    this.requestedAmountErrFalg = false;
    this.numOfInstallmentsErrFlag = false;
    this.downPaymentErrFalg = false;
  }

  goSignUp() {
    if (!this.sessionStorageService.getItem('fcp_key')) {
      this.toastr.warning('please choose product first', 'Warning');
    } else {
      this.overridingDataForRequestDefaultValues();
      this.router.navigate(['quick-register']);
    }
  }

  overridingDataForRequestDefaultValues() {
    this.sessionStorageService.setItem('requestedAmount', this.requestedAmount);
    this.sessionStorageService.setItem(
      'monthlyInsatllment',
      this.monthlyInsatllment,
    );
    this.sessionStorageService.setItem('downPayment', this.downPayment);
    this.sessionStorageService.setItem('product_name', this.productName);
  }
  modules: UserMenuTree[];
  fillMenu() {
    let fcpKey = this.sessionStorageService.getItem('fcp_key');

    let link = 'dashboard/transactions/my-requests/new';

    // this.router.navigate([link]);
    let userId = Number(this.sessionStorageService.getItem('user_Id'));
    let params = [
      { usrKey: userId, parentMenuId: staticData.myRequest, fcpKey: fcpKey },
    ];
    this.subscriptions.push(
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
          this.router.navigate([link]);

          this.dialogRef.close({ action: 'confirm' });
        }),
    );
  }
  getProductInfo(fcpKey) {
    this.dialog.open(ViewProductInfoComponent, {
      width: '750px',
      data: {
        key: fcpKey,
      },
      panelClass: 'main-popup',
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
