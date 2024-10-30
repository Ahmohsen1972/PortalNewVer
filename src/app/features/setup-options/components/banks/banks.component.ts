import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ViewBankComponent } from './view-bank/view-bank.component';
import { AddNewBanksComponent } from './add-new-banks/add-new-banks.component';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { BusinessPartyFetchComponent } from 'app/features/business-parties/components/business-party-fetch/business-party-fetch.component';
@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit, OnDestroy {
  addEditComponent = AddNewBanksComponent;
  viewComponent = ViewBankComponent;
  apiUrl = 'bank';
  rowKey = 'wbKey';
  transaction = 'Bank';
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  staticTranslation: any;
  moduleName: string;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private localstorageservice: LocalStorageService,
    private myroute: ActivatedRoute,
    private ithmaarPortalService: IthmaarPortalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.transferDataService.fetchScr = false;

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
    this.getCustomProperties();
    this.transferDataService.fetchScr = true;
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.router.url.includes('setup')) {
          this.pageLoad = false;
          this.getCustomProperties();
        }
      });

    this.getBankData();
    this.pageLoad = false;
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

          this.columns = [
            {
              id: 'wbCode',
              label: this.probertyData['wbCode']['ahdCaption'],
              hideOrder: 4,
            },
            {
              id: 'wbLocalName',
              label: this.probertyData['wbLocalName']['ahdCaption'],
              hideOrder: 0,
              width: 75,
            },
            {
              id: 'wbForeignName',
              label: this.probertyData['wbForeignName']['ahdCaption'],
              hideOrder: 1,
            },
            { id: 'action', label: 'Actions', hideOrder: 0, width: 80 },
          ];

          this.pageLoad = true;
        }),
    );
  }

  addBank(): void {
    const dialogRef = this.dialog.open(AddNewBanksComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getBankData();
    });
  }

  getBankData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('bank/all')
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

  fetchData() {
    let params = [
      { clntKey: this.sessionStorageService.getItem('clnt_key') },
      { modKey: staticData.setupBank },
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
            this.fetchAllBank();
          } else if (status === 'ROW') {
            this.openFetchPopup();
          } else {
            this.toastr.error('You Cant Fetch Bank', 'error');
          }
        }),
    );
  }
  fetchAllBank() {
    let params = [
      { modKey: staticData.setupBank },
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
      { modKey: staticData.setupBank },
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
      data: 'Bank',
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'confirm') {
        this.getBankData();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
