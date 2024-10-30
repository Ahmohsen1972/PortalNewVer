import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { checkRequired } from 'app/features/transactions/components/customer-request/components/create-request/check-custom-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-customer-service-letter',
  templateUrl: './add-new-customer-service-letter.component.html',
  styleUrls: ['./add-new-customer-service-letter.component.scss'],
})
export class AddNewCustomerServiceLetterComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
    private sessionStorageService: SessionStorageService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    private toastr: ToastrService,
  ) {}

  private subscriptions: Subscription[] = [];
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  customerServiceLetterForm: FormGroup;
  rowKey: any;
  active: boolean = false;
  staticTranslation: any;
  ngOnInit(): void {
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupCustomerServiceLetters },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: staticData.genericPrcKey },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.staticTranslation =
            this.localstorageservice.getItem('static_translation');
          this.createcustomerServiceLetterForm();

          this.fillCustomerServiceLetterForm();

          this.pageLoad = true;
        }),
    );
  }

  createcustomerServiceLetterForm() {
    this.customerServiceLetterForm = new FormGroup({
      cslCode: new FormControl(
        {
          value: '',
          disabled: this.probertyData['cslCode']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['cslCode']['apsRequired'])],
      ),

      cslLocalName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['cslLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['cslLocalName']['apsRequired'])],
      ),

      active: new FormControl('F'),
    });
  }

  fillCustomerServiceLetterForm() {
    this.params = [{ id: this.receivedData.row.cslKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('customer-service-letters', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.customerServiceLetterForm
            .get('cslCode')
            .setValue(data.payload.cslCode);
          this.customerServiceLetterForm
            .get('cslLocalName')
            .setValue(data.payload.cslLocalName);
          this.customerServiceLetterForm
            .get('active')
            .setValue(data.payload.active);

          if (data.payload.active == 'T') {
            this.active = true;
          } else {
            this.active = false;
          }
        }),
    );
  }

  onSubmit() {
    this.customerServiceLetterForm
      .get('active')
      .setValue(this.active == true ? 'T' : 'F');
    this.subscriptions.push(
      this.httpEndpointService
        .update(
          'customer-service-letters/update/' + this.receivedData.row.cslKey,
          this.customerServiceLetterForm.value,
        )
        .subscribe((data: ApiResponse) => {
          this.toastr.success(
            this.staticTranslation['CustomerServiceLettersUpdatedSuccessfully'],
            this.staticTranslation['Success'],
          );
          this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
          );
        }),
    );
  }
}
