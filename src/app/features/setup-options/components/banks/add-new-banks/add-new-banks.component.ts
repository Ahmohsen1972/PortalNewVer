import { Subscription } from 'rxjs';
import { Bank } from 'app/core/classes/Bank';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { checkRequired } from 'app/features/transactions/components/customer-request/components/create-request/check-custom-validation';

@Component({
  selector: 'app-add-new-banks',
  templateUrl: './add-new-banks.component.html',
  styleUrls: ['./add-new-banks.component.scss'],
})
export class AddNewBanksComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
    private sessionStorageService: SessionStorageService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
  ) {}

  bankObj: any;
  bankObjSetter: Bank = new Bank();
  action: string;
  actionBtn: string;
  private subscriptions: Subscription[] = [];
  params: any;
  probertyData: string[];
  pageLoad: boolean = false;
  bankForm: FormGroup;
  staticTranslation: string[];

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupBank },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;

          this.createBankForm();

          this.fillBankForm();

          this.pageLoad = true;
        }),
    );
  }

  createBankForm() {
    this.bankForm = new FormGroup({
      bankCode: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wbCode']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wbCode']['apsRequired'])],
      ),

      bankLocalName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wbLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wbLocalName']['apsRequired'])],
      ),

      bankForeignName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wbForeignName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wbForeignName']['apsRequired'])],
      ),

      RefreshDate: new FormControl(
        {
          value: '',
          disabled: this.probertyData['sbRefreshDate']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['sbRefreshDate']['apsRequired'])],
      ),
    });
  }

  fillBankForm() {
    if (this.receivedData.row) {
      this.action = 'btn.Update';
      this.actionBtn = 'btn.Update';
      let params = [{ id: this.receivedData.row.wbKey }];
      this.subscriptions.push(
        this.httpEndpointService
          .getBy('bank', params, 'path')
          .subscribe((data: ApiResponse) => {
            this.bankObj = data.payload;
            this.bankForm.get('bankCode').setValue(this.bankObj.wbCode);
            this.bankForm
              .get('bankLocalName')
              .setValue(this.bankObj.wbLocalName);
            this.bankForm
              .get('bankForeignName')
              .setValue(this.bankObj.wbForeignName);
            this.bankForm
              .get('RefreshDate')
              .setValue(this.bankObj.sbRefreshDate);
          }),
      );
    } else {
      this.action = 'btn.Add';
      this.actionBtn = 'btn.Save';
    }
  }

  onSubmit() {
    if (this.receivedData.row != null) {
      this.bankObjSetter.setWbKey(this.bankObj.wbKey);
      this.setSharedFields();
      this.subscriptions.push(
        this.httpEndpointService
          .update('bank/' + this.bankObj.wbKey, this.bankObjSetter)
          .subscribe((data: ApiResponse) => {}),
      );
    } else {
      this.setSharedFields();
      this.subscriptions.push(
        this.httpEndpointService
          .create('bank/new', this.bankObjSetter)
          .subscribe((data: ApiResponse) => {}),
      );
    }
  }

  setSharedFields() {
    this.bankObjSetter.setWbCode(this.bankForm.get('bankCode').value);
    this.bankObjSetter.setWbLocalName(this.bankForm.get('bankLocalName').value);
    this.bankObjSetter.setWbForeignName(
      this.bankForm.get('bankForeignName').value,
    );
    this.bankObjSetter.setSbRefreshDate(this.bankForm.get('RefreshDate').value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
