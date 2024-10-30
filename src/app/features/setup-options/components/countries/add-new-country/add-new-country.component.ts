import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Country } from 'app/core/classes/Country';
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
  selector: 'app-add-new-country',
  templateUrl: './add-new-country.component.html',
  styleUrls: ['./add-new-country.component.scss'],
})
export class AddNewCountryComponent implements OnInit, OnDestroy {
  currencies;
  commingData;

  private subscriptions: Subscription[] = [];
  public currenciesFilteredOptions: Observable<any[]>;
  constructor(
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private localstorageservice: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  countryObj: any;
  countyObjSetter: Country = new Country();
  probertyData: any;
  params: any;
  action: string;
  actionBtn: string;
  countryForm: FormGroup;
  rowKey: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupCountry },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.pageLoad = true;

          this.createCountryForm();
          this.updateCountryForm();
          this.callLovServices();
        }),
    );
  }

  updateCountryForm() {
    if (this.receivedData.row) {
      this.action = 'btn.Update';
      this.actionBtn = 'btn.Update';
      let params = [{ id: this.receivedData.row.wcKey }];
      this.subscriptions.push(
        this.httpEndpointService
          .getBy('country', params, 'path')
          .subscribe((data: ApiResponse) => {
            this.countryObj = data.payload;
            this.countryForm
              .get('countryLocalName')
              .setValue(this.countryObj.wcLocalName);
            this.countryForm
              .get('countryForeignName')
              .setValue(this.countryObj.wcForeignName);
            this.countryForm.get('wcrCode').setValue(this.countryObj.wcrCode);
            this.countryForm
              .get('wcrLocalName')
              .setValue(this.countryObj.wcrLocalName);
            this.countryForm.get('wcrKey').setValue(this.countryObj.wcrKey);
          }),
      );
    } else {
      this.action = 'btn.Add';
      this.actionBtn = 'btn.Save';
    }
  }
  createCountryForm() {
    this.countryForm = new FormGroup({
      countryLocalName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wcLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wcLocalName']['apsRequired'])],
      ),
      countryForeignName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wcForeignName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wcForeignName']['apsRequired'])],
      ),
      wcrCode: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wcrCode']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wcrCode']['apsRequired'])],
      ),
      wcrLocalName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['wcrLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['wcrLocalName']['apsRequired'])],
      ),
      wcrKey: new FormControl(''),
    });
  }

  callLovServices() {
    this.params = [
      { lovKey: this.probertyData['wcrLocalName']['lovKey'] },
      { ilmKey: this.probertyData['wcrLocalName']['ilmKey'] },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((result: ApiResponse) => {
          this.currencies = result.payload.data;
          this.currenciesFilterOptions();
        }),
    );
  }

  currenciesFilterOptions() {
    this.currenciesFilteredOptions = this.countryForm
      .get('wcrLocalName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.currencies_filter(value)),
      );
  }
  private currencies_filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.currencies.filter(
      (option) => option.wcrLocalName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  onCurrencySelection(currency) {
    this.currencies.filter((value) => {
      if (value.wcrLocalName === currency.option.value) {
        this.countryForm.patchValue({
          wcrKey: value.wcrKey,
        });
      }
    });
  }
  onSubmit() {
    if (this.receivedData.row != null) {
      this.countyObjSetter.setWcKey(this.countryObj.wcKey);
      this.countyObjSetter.setWcLocalName(
        this.countryForm.get('countryLocalName').value,
      );
      this.countyObjSetter.setWcForeignName(
        this.countryForm.get('countryForeignName').value,
      );
      this.countyObjSetter.setWcrKey(this.countryForm.get('wcrKey').value);

      this.subscriptions.push(
        this.httpEndpointService
          .update(
            'country/' + this.countryObj.wcKey,
            this.httpEndpointService.createRequestFormat(
              staticData.setupCountry,
              null,
              this.countyObjSetter,
            ),
          )
          .subscribe((data: ApiResponse) => {}),
      );
    } else {
      this.countyObjSetter.setWcLocalName(
        this.countryForm.get('countryLocalName').value,
      );
      this.countyObjSetter.setWcForeignName(
        this.countryForm.get('countryForeignName').value,
      );
      this.countyObjSetter.setWcrKey(this.countryForm.get('wcrKey').value);
      this.subscriptions.push(
        this.httpEndpointService
          .create(
            'country/new',
            this.httpEndpointService.createRequestFormat(
              staticData.setupCountry,
              null,
              this.countyObjSetter,
            ),
          )
          .subscribe(
            (data: ApiResponse) => {},
            (err) => {},
          ),
      );
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
