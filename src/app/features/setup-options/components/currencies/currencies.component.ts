import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { ViewCurrencyComponent } from './view-currency/view-currency.component';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { AddNewCurrencyComponent } from './add-new-currency/add-new-currency.component';
import { BusinessPartyFetchComponent } from 'app/features/business-parties/components/business-party-fetch/business-party-fetch.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddNewCurrencyComponent;
  viewComponent = ViewCurrencyComponent;
  apiUrl = 'currency';
  rowKey = 'wcrKey';
  transaction = 'Currency';

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private transferDataService: TransferDataService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private ithmaarPortalService: IthmaarPortalService,
    private localstorageservice: LocalStorageService,
    private route: ActivatedRoute,
    private myRoute: Router,
  ) {}

  columns = [];
  probertyData: any;
  pageLoad: boolean = false;
  params: any;
  staticTranslation: any;
  moduleName: string;
  ngOnInit(): void {
    this.transferDataService.fetchScr = false;
    //  moduleName:string;

    this.route.queryParams.subscribe((params) => {
      this.moduleName = params['moduleName'];
      this.ithmaarPortalService.log(
        'moduleNamemoduleNamemoduleName___________',
      );
    });
    //{{staticTranslation['']}}
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.transferDataService.languageCanged.subscribe((res) => {
      if (res == true) {
        this.staticTranslation =
          this.localstorageservice.getItem('static_translation');
      }
    });
    this.getCurrencyData();
    this.getCustomProperties();
    this.transferDataService.fetchScr = true;
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.myRoute.url.includes('setup')) {
          this.ithmaarPortalService.log('within new lang ___________');
          this.pageLoad = false;
          this.getCustomProperties();
        }
      });
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
          this.ithmaarPortalService.log(
            'property data in currencies all : ',
            data.payload,
          );
          this.probertyData = data.payload;

          this.columns = [
            {
              id: 'wcrCode',
              label: this.probertyData['wcrCode']['ahdCaption'],
              hideOrder: 0,
              width: 75,
            },
            {
              id: 'wcrLocalName',
              label: this.probertyData['wcrLocalName']['ahdCaption'],
              hideOrder: 1,
            },
            {
              id: 'wcrForeignName',
              label: this.probertyData['wcrForeignName']['ahdCaption'],
              hideOrder: 4,
            },
            { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
          ];
          this.pageLoad = true;
        }),
    );
  }

  getCurrencyData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('currency/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];

            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
          }
        }),
    );
  }

  addCurrency(): void {
    const dialogRef = this.dialog.open(AddNewCurrencyComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }
  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('currency/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];

            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
          }
        }),
    );
  }
  fetchData() {
    let params = [
      { clntKey: this.sessionStorageService.getItem('clnt_key') },
      { modKey: staticData.setupCurrency },
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
            this.fetchAllCurrency();
          } else if (status === 'ROW') {
            this.openFetchPopup();
          } else {
            this.toastr.error('You Cant Fetch Currency', 'error');
          }
        }),
    );
  }

  fetchAllCurrency() {
    let params = [
      { modKey: staticData.setupCurrency },
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
      { modKey: staticData.setupCurrency },
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
      data: 'Currency',
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'confirm') {
        this.refresh();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
