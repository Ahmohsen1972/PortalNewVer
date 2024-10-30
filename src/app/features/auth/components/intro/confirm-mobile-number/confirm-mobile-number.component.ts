import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-confirm-mobile-number',
  templateUrl: './confirm-mobile-number.component.html',
  styleUrls: ['./confirm-mobile-number.component.scss'],
})
export class ConfirmMobileNumberComponent implements OnInit, OnDestroy {
  verificationForm: FormGroup;
  params: any[];
  private subscriptions: Subscription[] = [];
  lan: string;
  probertyData: string[];
  pageLoad: boolean = false;
  staticTranslation: string[];

  constructor(
    private formBuilder: FormBuilder,
    private transferDataService: TransferDataService,
    private route: Router,
    private toast: ToastrService,
    private localStorageService: LocalStorageService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.lan = this.localStorageService.getItem('currentLang');

    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    if (this.transferDataService.fromResetPass == null) {
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
        if (changes == true && this.route.url.includes('mobile-number')) {
          this.lan = this.localStorageService.getItem('currentLang');
          this.staticTranslation =
            this.localStorageService.getItem('static_translation');

          this.getCustomPropertiesOnChangeLang();
        }
      });
  }

  getCustomPropertiesOnChangeLang() {
    this.params = [{ modKey: staticData.confirmMobileNo }];
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
      mobileNumber: ['', [Validators.required, Validators.min(0)]],
    });
  }

  getCustomProperties() {
    this.params = [{ modKey: staticData.confirmMobileNo }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  verifyNumber() {
    if (this.verificationForm.valid) {
      this.params = [
        { mobileNo: this.verificationForm.get('mobileNumber').value },
      ];

      this.subscriptions.push(
        this.httpEndpointService
          .getBy('reset-password/check', this.params, 'req')
          .subscribe((data) => {
            this.transferDataService.userKey = data.payload.wppKey;
            this.transferDataService.userName = data.payload.usrLoginName;
            this.route.navigate(['/new-password']);
          }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
