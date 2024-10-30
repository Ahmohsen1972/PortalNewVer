import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ViewCountryComponent } from './view-country/view-country.component';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { AddNewCountryComponent } from './add-new-country/add-new-country.component';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { BusinessPartyFetchComponent } from 'app/features/business-parties/components/business-party-fetch/business-party-fetch.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  addEditComponent = AddNewCountryComponent;
  viewComponent = ViewCountryComponent;
  apiUrl = 'country';
  rowKey = 'wcKey';
  transaction = 'Country';
  moduleKey: any;
  fromFetch: boolean;
  params: any;
  pageLoad: any;
  probertyData: any;
  subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  state$: Observable<object>;
  id;
  columns = [];
  staticTranslation;
  moduleName: string;
  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private ithmaarPortalService: IthmaarPortalService,
    private transferDataService: TransferDataService,
    private route: Router,
    private localstorageservice: LocalStorageService,
    private myroute: ActivatedRoute,

    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.transferDataService.fetchScr = false;
    //  moduleName:string;

    this.myroute.queryParams.subscribe((params) => {
      this.moduleName = params['moduleName'];
    });
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.transferDataService.languageCanged.subscribe((res) => {
      if (res == true) {
        this.staticTranslation =
          this.localstorageservice.getItem('static_translation');
      }
    });

    this.getCountryData();
    this.getCustomProperties();
    this.transferDataService.fetchScr = true;
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.route.url.includes('setup')) {
          this.pageLoad = false;
          this.getCustomProperties();
        }
      });
  }

  getCountryData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('country/all')
        .subscribe((result: ApiResponse) => {
          this.ithmaarPortalService.log('Results ', result.payload);
          if (result.payload.length > 0) {
            const rows = [];

            result.payload.forEach((element: any, index: number) => {
              element['Id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
          }
        }),
    );
  }

  currName: string = '';
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
          this.currName = this.probertyData['wcrLocalName']['ahdCaption'];

          this.columns = [
            {
              id: 'wcLocalName',
              label: this.probertyData['wcLocalName']['ahdCaption'],
              hideOrder: 0,
              width: 75,
            },
            {
              id: 'wcForeignName',
              label: this.probertyData['wcForeignName']['ahdCaption'],
              hideOrder: 1,
            },
            //  { id: 'wcrCode', label: this.probertyData['wcrCode']['ahdCaption'], hideOrder: 5 },
            //  { id: 'wcrLocalName', label: this.currName, hideOrder: 4 },
            { id: 'action', label: 'Actions', hideOrder: 0, width: 80 },
          ];
          this.pageLoad = true;
        }),
    );
  }

  addCountry(): void {
    const dialogRef = this.dialog.open(AddNewCountryComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.subscriptions.push(
        this.httpEndpointService
          .getAll('country/all')
          .subscribe((result: ApiResponse) => {
            if (result.payload.length > 0) {
              const rows = [];

              result.payload.forEach((element: any, index: number) => {
                element['Id'] = index + 1;
                rows.push(element);
              });

              this.dataSource.data = rows;
            }
          }),
      );
    });
  }

  fetchData() {
    let params = [
      { clntKey: this.sessionStorageService.getItem('clnt_key') },
      { modKey: staticData.setupCountry },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('fetch-status', params, 'path')
        .subscribe((res: ApiResponse) => {
          let status = res.payload;
          this.ithmaarPortalService.log(
            'transaction status ________ >> ',
            status,
          );
          if (status === 'ALL') {
            this.fetchAllCountry();
          } else if (status === 'ROW') {
            this.openFetchPopup();
          } else {
            this.toastr.error('You Cant Fetch Country', 'error');
          }
        }),
    );
  }

  fetchAllCountry() {
    let params = [
      { modKey: staticData.setupCountry },
      { serviceType: 'FETCH' },
      { code: 'ALL' },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('setup/fetch', params, 'path')
        .subscribe((res: ApiResponse) => {
          this.dataSource.data = res.payload;
          this.updateFetchStatus();
        }),
    );
  }
  updateFetchStatus() {
    let params = [
      { clntKey: this.sessionStorageService.getItem('clnt_key') },
      { modKey: staticData.setupCountry },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('fetch-status/update', params, 'path')
        .subscribe((res: ApiResponse) => {
          this.ithmaarPortalService.log(
            'status updated succefully __________ ',
          );
        }),
    );
  }
  openFetchPopup() {
    const dialogRef = this.dialog.open(BusinessPartyFetchComponent, {
      width: '700px',
      panelClass: 'main-popup',
      data: 'Country',
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'confirm') {
        this.getCountryData();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
