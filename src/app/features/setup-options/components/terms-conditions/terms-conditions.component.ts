import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { TermCondition } from 'app/core/classes/Term-Condition';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { checkRequired } from 'app/features/transactions/components/customer-request/components/create-request/check-custom-validation';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit, OnDestroy {
  termConditions: TermCondition[];
  termConditionObj: any;
  termConditionObjSetter: TermCondition = new TermCondition();
  termConditionForm: FormGroup;
  private subscriptions: Subscription[] = [];
  probertyData: any;
  pageLoad: boolean = false;
  params;
  mainTitle;
  staticTranslation;
  type: string;
  menuId: number;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    @Inject(MAT_DIALOG_DATA) private recievedData: any,
    private transferDataService: TransferDataService,
    private localstorageservice: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,

    public dialogRef: MatDialogRef<TermsConditionsComponent>,
  ) {}
  ngOnInit(): void {
    this.transferDataService.fetchScr = false;
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.transferDataService.languageCanged.subscribe((res) => {
      if (res == true) {
        this.staticTranslation =
          this.localstorageservice.getItem('static_translation');
      }
    });
    this.mainTitle = this.recievedData.title;

    this.menuId = this.recievedData.menuId;
    if (this.menuId == 7) this.type = 'R';
    else this.type = 'G';

    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: this.menuId },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;

          this.createTermsConditionsForm();

          this.updateTermsConditionsForm();
        }),
    );
  }

  createTermsConditionsForm() {
    this.termConditionForm = this.formBuilder.group({
      localName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wtcLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wtcLocalName']['apsRequired'])],
      ),

      foreignName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wtcForeignName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wtcForeignName']['apsRequired'])],
      ),
    });
  }

  updateTermsConditionsForm() {
    let params = [{ wtcType: this.type }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('term-condition/filter', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.termConditionObj = data.payload;
          this.ithmaarPortalService.log(
            'terms and condition is >>>>> ',
            this.termConditionObj,
          );
          this.ithmaarPortalService.log(
            'this.termConditionObj ',
            this.termConditionObj.length,
          );
          if (this.termConditionObj.length != 0) {
            this.ithmaarPortalService.log(
              'this.termConditionObj ',
              this.termConditionObj,
            );

            this.termConditionForm
              .get('localName')
              .setValue(this.termConditionObj.wtcLocalName);
            this.termConditionForm
              .get('foreignName')
              .setValue(this.termConditionObj.wtcForeignName);
          }

          this.pageLoad = true;
        }),
    );
  }

  updateTermsAndConditions() {
    this.ithmaarPortalService.log(
      'this.termConditionForm',
      this.termConditionForm.value,
    );
    this.ithmaarPortalService.log(
      'terms when update ____ >>> ',
      this.termConditionObj,
    );
    if (
      this.termConditionObj.wtcKey != null ||
      this.termConditionObj.wtcKey != undefined
    ) {
      if (this.termConditionForm.valid) {
        this.termConditionObjSetter.setWtcKey(this.termConditionObj.wtcKey);
        this.termConditionObjSetter.setWtcLocalName(
          this.termConditionForm.get('localName').value,
        );
        this.termConditionObjSetter.setWtcForeignName(
          this.termConditionForm.get('foreignName').value,
        );
        this.termConditionObjSetter.setWtcType(this.type);

        this.subscriptions.push(
          this.httpEndpointService
            .update(
              'term-condition/' + this.termConditionObj.wtcKey,
              this.httpEndpointService.createRequestFormat(
                7,
                null,
                this.termConditionObjSetter,
              ),
            )
            .subscribe((data: ApiResponse) => {
              this.dialogRef.close({ updateDate: data.payload.updateDate });
              this.toast.success(
                this.staticTranslation['DataUpdatedSuccessfully'],
                this.staticTranslation['Success'],
              );
            }),
        );
      }
    } else this.saveTermsAndConditions();
  }

  saveTermsAndConditions() {
    if (this.termConditionForm.valid) {
      // this.termConditionObjSetter.setWtcKey(this.termConditionObj[0].wtcKey);
      this.termConditionObjSetter.setWtcLocalName(
        this.termConditionForm.get('localName').value,
      );
      this.termConditionObjSetter.setWtcForeignName(
        this.termConditionForm.get('foreignName').value,
      );
      this.termConditionObjSetter.setWtcType(this.type);
      this.ithmaarPortalService.log(
        'this.termConditionForm',
        this.termConditionObjSetter,
      );

      this.subscriptions.push(
        this.httpEndpointService
          .create(
            'term-condition/new',
            this.httpEndpointService.createRequestFormat(
              7,
              null,
              this.termConditionObjSetter,
            ),
          )
          .subscribe(
            (data: ApiResponse) => {
              this.dialogRef.close({ updateDate: data.payload.updateDate });
              this.toast.success(
                this.staticTranslation['DataSavedSuccessfully'],
                this.staticTranslation['Success'],
              );
            },
            (error) => {},
          ),
      );
    }
  }

  closePopup() {
    this.dialogRef.close({ updateDate: this.termConditionObj.updateDate });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
