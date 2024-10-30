import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Currency } from 'app/core/classes/Currency';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { checkRequired } from 'app/features/transactions/components/customer-request/components/create-request/check-custom-validation';

@Component({
  selector: 'app-add-new-currency',
  templateUrl: './add-new-currency.component.html',
  styleUrls: ['./add-new-currency.component.scss'],
})
export class AddNewCurrencyComponent implements OnInit, OnDestroy {
  constructor(
    private httpEndpointService: HttpEndpointService,
    private route: Router,
    private sessionStorageService: SessionStorageService,
    private localstorageservice: LocalStorageService,
    private navRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
    private dialogRef: MatDialogRef<AddNewCurrencyComponent>,
  ) {}
  action: string;
  actionBtn: string;
  currencyObj: any;
  currencyObjSetter: Currency = new Currency();
  private subscriptions: Subscription[] = [];
  currencyForm: FormGroup;
  rowKey: number;
  row: any;
  probertyData: any;
  params: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupCurrency },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.createCurrencyForm();
          this.updateCurrencyForm();
          this.pageLoad = true;
        }),
    );
  }
  createCurrencyForm() {
    this.currencyForm = new FormGroup({
      currencyCode: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wcrCode']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wcrCode']['apsRequired'])],
      ),
      currencyLName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wcrLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wcrLocalName']['apsRequired'])],
      ),
      currencyFName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wcrForeignName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wcrForeignName']['apsRequired'])],
      ),
    });
  }
  updateCurrencyForm() {
    this.row = this.receivedData.row;
    if (this.row) {
      //debugger
      this.rowKey = this.receivedData.row.wcrKey;
      this.action = 'btn.Update';
      this.actionBtn = 'btn.Update';
      let params = [{ id: this.rowKey }];
      this.subscriptions.push(
        this.httpEndpointService
          .getBy('currency', params, 'path')
          .subscribe((data: ApiResponse) => {
            this.currencyObj = data.payload;
            this.currencyForm
              .get('currencyCode')
              .setValue(this.currencyObj.wcrCode);
            this.currencyForm
              .get('currencyLName')
              .setValue(this.currencyObj.wcrLocalName);
            this.currencyForm
              .get('currencyFName')
              .setValue(this.currencyObj.wcrForeignName);
          }),
      );
    } else {
      this.action = 'btn.Add';
      this.actionBtn = 'btn.Save';
    }
  }

  onSubmit() {
    if (this.rowKey) {
      this.currencyObjSetter.setWcrKey(this.currencyObj.wcrKey);
      this.setSharedFields();
      this.subscriptions.push(
        this.httpEndpointService
          .update('currency/' + this.currencyObj.wcrKey, this.currencyObjSetter)
          .subscribe((data: ApiResponse) => {}),
      );
    } else {
      this.setSharedFields();
      this.subscriptions.push(
        this.httpEndpointService
          .create('currency/new', this.currencyObjSetter)
          .subscribe((data: ApiResponse) => {}),
      );
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }

  setSharedFields() {
    this.currencyObjSetter.setWcrCode(
      this.currencyForm.get('currencyCode').value,
    );
    this.currencyObjSetter.setWcrLocalName(
      this.currencyForm.get('currencyLName').value,
    );
    this.currencyObjSetter.setWcrForeignName(
      this.currencyForm.get('currencyFName').value,
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
