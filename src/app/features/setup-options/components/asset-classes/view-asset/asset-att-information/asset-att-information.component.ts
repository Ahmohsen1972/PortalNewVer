import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ViewAssetAttComponent } from './view-asset-att/view-asset-att.component';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { AddEditAssetAttComponent } from './add-edit-asset-att/add-edit-asset-att.component';

@Component({
  selector: 'app-asset-att-information',
  templateUrl: './asset-att-information.component.html',
  styleUrls: ['./asset-att-information.component.scss'],
})
export class AssetAttInformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  params: any;
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditAssetAttComponent;
  viewComponent = ViewAssetAttComponent;
  apiUrl = 'asset-class-attributes';
  rowKey = 'acaKey';
  probertyData: string[];
  pageLoad: boolean = false;
  staticTranslation: string[];
  transaction = 'asset-class-attributes';

  columns = [];

  constructor(
    public dialog: MatDialog,
    private localstorageservice: LocalStorageService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private ithmaarPortalService: IthmaarPortalService,

    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ithmaarPortalService.log('rowKey ><<> ', this.status);
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getCustomProperties();
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (
          changes == true &&
          this.router.url.includes('setup/asset-classes')
        ) {
          this.pageLoad = false;
          this.getCustomProperties();
          this.staticTranslation =
            this.localstorageservice.getItem('static_translation');
        }
      });
    this.getCustomProperties();
    this.getAssetClassAttributes();
  }

  getCustomProperties() {
    this.params = [
      { modKey: 152 },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.ithmaarPortalService.log('33332', this.params);
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.columns = [
            {
              id: 'acaDisplayOrder',
              label: this.probertyData['acaDisplayOrder']['ahdCaption'],
              hideOrder: 4,
            },
            {
              id: 'attributeLocalName',
              label: this.probertyData['attributeLocalName']['ahdCaption'],
              hideOrder: 0,
              width: 75,
            },
            {
              id: 'acaRequired',
              label: this.probertyData['acaRequired']['ahdCaption'],
              hideOrder: 1,
            },
            { id: 'action', label: 'Actions', hideOrder: 0, width: 80 },
          ];

          this.pageLoad = true;
        }),
    );
  }

  getAssetClassAttributes() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`asset-class-attributes/asset/${this.row.wacKey}`)
        .subscribe((result: ApiResponse) => {
          this.transaction = `asset-class-attributes/asset/${this.row.wacKey}`;

          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log(
              ' this.dataSource.data ',
              this.dataSource.data,
            );
          }
        }),
    );
  }

  addAssetAtt() {
    const dialogRef = this.dialog.open(AddEditAssetAttComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.row.wacKey,
        status: 'create',
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
        .getAll(`asset-class-attributes/asset/${this.row.wacKey}`)
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
