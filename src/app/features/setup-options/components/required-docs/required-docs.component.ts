import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { ViewRequiredDocComponent } from './view-required-doc/view-required-doc.component';
import { AddNewRequiredDocComponent } from './add-new-required-doc/add-new-required-doc.component';

@Component({
  selector: 'app-required-docs',
  templateUrl: './required-docs.component.html',
  styleUrls: ['./required-docs.component.scss'],
})
export class RequiredDocsComponent implements OnInit, OnDestroy {
  addEditComponent = AddNewRequiredDocComponent;
  viewComponent = ViewRequiredDocComponent;
  apiUrl = 'required-doc';
  rowKey = 'wrdKey';
  transaction = 'Required document';
  subscriptions: Subscription[] = [];
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  public dataSource = new MatTableDataSource();
  columns = [];
  moduleName: string;
  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private transferDataService: TransferDataService,
    private router: Router,
    private route: ActivatedRoute,

    private sessionStorageService: SessionStorageService,
    private localstorageservice: LocalStorageService,
  ) {}

  ngOnInit(): void {
    //  moduleName:string;
    this.transferDataService.fetchScr = false;
    this.route.queryParams.subscribe((params) => {
      this.moduleName = params['moduleName'];
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

    this.getCustomProperties();

    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.router.url.includes('setup')) {
          this.pageLoad = false;
          this.getCustomProperties();
        }
      });

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('required-doc/all')
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

    this.pageLoad = false;
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

          this.columns = [
            {
              id: 'wrdLocalName',
              label: this.probertyData['wrdLocalName']['ahdCaption'],
              hideOrder: 0,
              width: 75,
            },
            {
              id: 'wrdForeignName',
              label: this.probertyData['wrdForeignName']['ahdCaption'],
              hideOrder: 1,
            },
            {
              id: 'wrdIntegrationCode',
              label: this.probertyData['wrdIntegrationCode']['ahdCaption'],
              hideOrder: 1,
            },
            {
              id: 'wrdIsForBp',
              label: this.probertyData['wrdIsForBp']['ahdCaption'],
              hideOrder: 1,
            },
            { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
          ];

          this.pageLoad = true;
        }),
    );
  }

  addReqDoc(): void {
    const dialogRef = this.dialog.open(AddNewRequiredDocComponent, {
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
          .getAll('required-doc/all')
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
