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
import { ViewCustomerServiceLetterComponent } from './view-customer-service-letter/view-customer-service-letter.component';
import { AddNewCustomerServiceLetterComponent } from './add-new-customer-service-letter/add-new-customer-service-letter.component';
import { BusinessPartyFetchComponent } from 'app/features/business-parties/components/business-party-fetch/business-party-fetch.component';

@Component({
  selector: 'app-customer-service-letters',
  templateUrl: './customer-service-letters.component.html',
  styleUrls: ['./customer-service-letters.component.scss'],
})
export class CustomerServiceLettersComponent implements OnInit, OnDestroy {
  addEditComponent = AddNewCustomerServiceLetterComponent;
  viewComponent = ViewCustomerServiceLetterComponent;
  apiUrl = 'customer-service-letters';
  rowKey = 'cslKey';
  transaction = 'Customer Service Letters';
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
    private ithmaarPortalService: IthmaarPortalService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
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
          this.staticTranslation =
            this.localstorageservice.getItem('static_translation');
          this.getCustomProperties();
        }
      });

    this.getCustomerServiceLettersData();
    this.pageLoad = false;
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
          this.ithmaarPortalService.log(
            'cusservprobertyData___>',
            this.probertyData,
          );

          this.columns = [
            {
              id: 'cslCode',
              label: this.probertyData['cslCode']['ahdCaption'],
              hideOrder: 4,
            },
            {
              id: 'cslLocalName',
              label: this.probertyData['cslLocalName']['ahdCaption'],
              hideOrder: 0,
              width: 75,
            },
            {
              id: 'fees',
              label: this.probertyData['fees']['ahdCaption'],
              hideOrder: 1,
            },
            {
              id: 'firstTimeFees',
              label: this.probertyData['firstTimeFees']['ahdCaption'],
              hideOrder: 1,
            },
            {
              id: 'active',
              label: this.probertyData['active']['ahdCaption'],
              hideOrder: 1,
            },
            {
              id: 'isDownloadable',
              label: this.probertyData['isDownloadable']['ahdCaption'],
              hideOrder: 1,
            },
            { id: 'action', label: 'Actions', hideOrder: 0, width: 80 },
          ];

          this.pageLoad = true;
        }),
    );
  }

  getCustomerServiceLettersData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('customer-service-letters/all')
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
    const dialogRef = this.dialog.open(BusinessPartyFetchComponent, {
      width: '700px',
      panelClass: 'main-popup',
      data: 'CustomerServiceLetter',
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'confirm') {
        this.getCustomerServiceLettersData();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
