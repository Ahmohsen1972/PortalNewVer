import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { REGEX } from 'app/core/constants/regex';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelpersService } from 'app/core/services/helpers.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';

@Component({
  selector: 'app-confirm-new-password',
  templateUrl: './confirm-new-password.component.html',
  styleUrls: ['./confirm-new-password.component.scss'],
})
export class ConfirmNewPasswordComponent implements OnInit, OnDestroy {
  verificationForm: FormGroup;
  params: any[];
  private subscriptions: Subscription[] = [];
  userKey: number;

  probertyData: string[];
  pageLoad: boolean = false;
  staticTranslation: string[];
  lang: string;
  passwordErrorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private helpersService: HelpersService,
    private toast: ToastrService,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    private transferDataService: TransferDataService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.userKey = this.transferDataService.userKey;
    this.lang = this.localStorageService.getItem('currentLang');

    if (this.userKey == null) {
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
        if (changes == true && this.route.url.includes('new-password')) {
          this.staticTranslation =
            this.localStorageService.getItem('static_translation');

          this.lang = this.localStorageService.getItem('currentLang');
          this.getCustomPropertiesOnChangeLang();
        }
      });
  }

  getCustomPropertiesOnChangeLang() {
    this.params = [{ modKey: staticData.confirmNewPassword }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
        }),
    );
  }

  createVerificationForm() {
    this.verificationForm = this.formBuilder.group(
      {
        verificationCode: ['', [Validators.required]],
        newPassword: [
          '',
          [Validators.required, Validators.pattern(REGEX.password)],
        ],
        confirmNewPassword: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('newPassword', 'confirmNewPassword'),
      },
    );
  }

  passwordChange(event: any) {
    this.passwordErrorMsg = null;
    let userName: string = this.transferDataService.userName;
    let password: string = this.verificationForm.get('newPassword').value;

    if (password.includes(userName)) {
      this.passwordErrorMsg =
        'Username must be not included as part of the password';
    }
  }

  getCustomProperties() {
    this.params = [{ modKey: staticData.confirmNewPassword }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute/no-sec', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.pageLoad = true;
        }),
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

  resetPassword() {
    if (this.verificationForm.valid) {
      this.params = [
        { code: this.verificationForm.get('verificationCode').value },
      ];
      let newPassword = this.helpersService.SHA256(
        this.verificationForm.get('newPassword').value,
      );

      this.subscriptions.push(
        this.httpEndpointService
          .create('reset-password/' + this.userKey, newPassword, this.params)
          .subscribe((data: ApiResponse) => {
            if (data.success) {
              this.route.navigate(['/login/customer']);
              this.toast.success(
                this.staticTranslation['PasswordChangedSuccessfully'],
                this.staticTranslation['Success'],
              );
            }
          }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
