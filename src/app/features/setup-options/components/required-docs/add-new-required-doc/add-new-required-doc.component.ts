import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { RequiredDocument } from 'app/core/classes/RequiredDocument';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { checkRequired } from 'app/features/transactions/components/customer-request/components/create-request/check-custom-validation';

@Component({
  selector: 'app-add-new-required-doc',
  templateUrl: './add-new-required-doc.component.html',
  styleUrls: ['./add-new-required-doc.component.scss'],
})
export class AddNewRequiredDocComponent implements OnInit, OnDestroy {
  pageTitle;
  params;
  editableDocVerion;
  clientId;
  noDataChanged = false;
  subscriptions: Subscription[] = [];
  probertyData: any;
  pageLoad: boolean = false;
  requirdDocObj = new RequiredDocument();
  requiredDocumentForm: FormGroup;
  wrdIsForBp: boolean = false;
  staticTranslation;
  constructor(
    private httpEndpointService: HttpEndpointService,
    private fb: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private transferDataService: TransferDataService,
    private ithmaarPortalService: IthmaarPortalService,

    private localstorageservice: LocalStorageService,

    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    this.transferDataService.fetchScr = false;
    //{{staticTranslation['']}}
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.transferDataService.languageCanged.subscribe((res) => {
      if (res == true) {
        this.staticTranslation =
          this.localstorageservice.getItem('static_translation');
      }
    });

    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupRequiredDocs },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.ithmaarPortalService.log(
            'module attribute for required documents ____ >>> ',
            this.probertyData,
          );

          this.createReqDocForm();

          this.fillReqDocForm();

          this.pageLoad = true;
        }),
    );
  }

  createReqDocForm() {
    this.requiredDocumentForm = this.fb.group({
      requiredDocumentName: [
        {
          value: '',
          disabled: this.probertyData['wrdLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wrdLocalName']['apsRequired'])],
      ],

      requiredDocumentFName: [
        {
          value: '',
          disabled: this.probertyData['wrdForeignName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wrdForeignName']['apsRequired'])],
      ],

      wrdIntegrationCode: [
        {
          value: '',
          disabled:
            this.probertyData['wrdIntegrationCode']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wrdIntegrationCode']['apsRequired'])],
      ],

      wrdIsForBp: new FormControl({ value: 'F' }),
    });
  }

  fillReqDocForm() {
    if (this.receivedData.row == null) {
      this.pageTitle = 'AddRequireDoc';
    } else {
      this.params = [{ id: this.receivedData.row.wrdKey }];
      this.pageTitle = 'UpdateRequireDoc';
      this.subscriptions.push(
        this.httpEndpointService
          .getBy('required-doc', this.params, 'path')
          .subscribe((data: ApiResponse) => {
            this.ithmaarPortalService.log(
              'data for required document ______ >> ',
              data.payload,
            );
            this.requiredDocumentForm.patchValue({
              requiredDocumentName: data.payload.wrdLocalName,
              requiredDocumentFName: data.payload.wrdForeignName,
              wrdIntegrationCode: data.payload.wrdIntegrationCode,
              wrdIsForBp: data.payload.wrdIsForBp,
            });
            if (data.payload.wrdIsForBp == 'T') {
              this.wrdIsForBp = true;
            } else {
              this.wrdIsForBp = false;
            }
          }),
      );
    }
  }

  onSubmit() {
    let bpValue = this.wrdIsForBp ? 'T' : 'F';
    this.requirdDocObj.setWrdLocalName(
      this.requiredDocumentForm.get('requiredDocumentName').value,
    );
    this.requirdDocObj.setWrdForeignName(
      this.requiredDocumentForm.get('requiredDocumentFName').value,
    );
    this.requirdDocObj.setWrdIntegrationCode(
      this.requiredDocumentForm.get('wrdIntegrationCode').value,
    );
    this.requirdDocObj.setWrdIsForBp(bpValue);
    this.requirdDocObj.setClntKey(
      Number(this.sessionStorageService.getItem('clnt_key')),
    );

    this.ithmaarPortalService.log(
      'the required object ____ >> ',
      this.requirdDocObj,
    );

    if (this.receivedData.row == null) {
      this.subscriptions.push(
        this.httpEndpointService
          .create(
            'required-doc/new',
            this.httpEndpointService.createRequestFormat(
              staticData.setupRequiredDocs,
              null,
              this.requirdDocObj,
            ),
          )
          .subscribe((data: ApiResponse) => {}),
      );
    } else {
      this.requirdDocObj.setWrdKey(this.receivedData.row.wrdKey);
      this.subscriptions.push(
        this.httpEndpointService
          .update(
            'required-doc/' + this.receivedData.row.wrdKey,
            this.httpEndpointService.createRequestFormat(
              staticData.setupRequiredDocs,
              null,
              this.requirdDocObj,
            ),
          )
          .subscribe((data: ApiResponse) => {}),
      );
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
