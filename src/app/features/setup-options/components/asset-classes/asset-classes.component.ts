import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { ViewAssetClassComponent } from './view-asset/view-asset-class/view-asset-class.component';
import { BusinessPartyFetchComponent } from 'app/features/business-parties/components/business-party-fetch/business-party-fetch.component';

@Component({
  selector: 'app-asset-classes',
  templateUrl: './asset-classes.component.html',
  styleUrls: ['./asset-classes.component.scss'],
})
export class AssetClassesComponent implements OnInit, OnDestroy {
  viewComponent = ViewAssetClassComponent;
  addEditComponent = '';
  apiUrl = 'asset-classes';
  rowKey = 'wacKey';
  transaction = 'AssetClass';
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  params: any;
  probertyData: string[];
  pageLoad: boolean = false;
  staticTranslation: string[];
  moduleName: string;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private ithmaarPortalService: IthmaarPortalService,
    private localstorageservice: LocalStorageService,
    private myroute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.myroute.queryParams.subscribe((params) => {
      this.moduleName = params['moduleName'];
    });

    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getCustomProperties();
    this.transferDataService.fetchScr = true;
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.router.url.includes('setup')) {
          this.pageLoad = false;
          this.getCustomProperties();
          this.staticTranslation =
            this.localstorageservice.getItem('static_translation');
        }
      });

    this.getAssetClasses();
  }

  getAssetClasses() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('asset-classes/all')
        .subscribe((result: ApiResponse) => {
          this.ithmaarPortalService.log('here is data', result.payload);

          if (result.payload.length > 0) {
            const rows = [];
            this.ithmaarPortalService.log('here is data', result.payload);

            result.payload.forEach((element: any, index: number) => {
              element['Id'] = index + 1;
              rows.push(element);
            });

            this.dataSource.data = rows;
          }
        }),
    );
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupAssetClass },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: staticData.genericPrcKey },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.columns = [
            {
              id: 'wacCode',
              label: this.probertyData['wacCode']['ahdCaption'],
              hideOrder: 4,
            },
            {
              id: 'wacLocalName',
              label: this.probertyData['wacLocalName']['ahdCaption'],
              hideOrder: 0,
              width: 75,
            },
            {
              id: 'wacForeignName',
              label: this.probertyData['wacForeignName']['ahdCaption'],
              hideOrder: 1,
            },
            { id: 'action', label: 'Actions', hideOrder: 0, width: 80 },
          ];

          this.pageLoad = true;
        }),
    );
  }

  fetchData() {
    let params = [
      { clntKey: this.sessionStorageService.getItem('clnt_key') },
      { modKey: staticData.setupAssetClass },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('fetch-status', params, 'path')
        .subscribe((res: ApiResponse) => {
          let status = res.payload;
          if (status === 'ALL') {
            this.fetchAllAssetClasses();
          } else if (status === 'ROW') {
            this.openFetchPopup();
          } else {
            this.toastr.error('You Cant Fetch Asset Classes', 'error');
          }
        }),
    );
  }

  fetchAllAssetClasses() {
    let params = [
      { modKey: staticData.setupAssetClass },
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

  openFetchPopup() {
    const dialogRef = this.dialog.open(BusinessPartyFetchComponent, {
      width: '700px',
      panelClass: 'main-popup',
      data: 'AssetClass',
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'confirm') {
        this.getAssetClasses();
      }
    });
  }

  updateFetchStatus() {
    let params = [
      { clntKey: this.sessionStorageService.getItem('clnt_key') },
      { modKey: staticData.setupAssetClass },
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
