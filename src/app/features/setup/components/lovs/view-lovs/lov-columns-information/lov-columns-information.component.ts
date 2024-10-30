import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { AddEditLovColumnsComponent } from './add-edit-lov-columns/add-edit-lov-columns.component';
@Component({
  selector: 'app-lov-columns-information',
  templateUrl: './lov-columns-information.component.html',
  styleUrls: ['./lov-columns-information.component.scss'],
})
export class LovColumnsInformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditLovColumnsComponent;
  createComponent = AddEditLovColumnsComponent;
  apiUrl = 'column-mapping-admin';
  rowKey = 'lriKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'column-mapping-admin';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getLovColumnsData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'lvcColumnName', label: 'Column Name', hideOrder: 0, width: 80 },
      {
        id: 'lvcColNumberInSelect',
        label: 'Order Number',
        hideOrder: 0,
        width: 80,
      },
      {
        id: 'mappedItemName',
        label: 'Module Attribute Name',
        hideOrder: 0,
        width: 80,
      },
      //   { id: 'action', label: 'Action', hideOrder: 4, width: 80 }
    ];
    this.pageLoad = true;
  }

  getLovColumnsData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`lov-columns-admin/all/${this.row.lovKey}`)
        .subscribe((result: ApiResponse) => {
          this.transaction = `lov-columns-admin/all/${this.row.lovKey}`;
          this.ithmaarPortalService.log('el lov column data ', result.payload);
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', result);
          }
        }),
    );
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`lov-columns-admin/all/${this.row.lovKey}`)
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

  addColumn() {
    const dialogRef = this.dialog.open(this.createComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
        action: 'create',
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ithmaarPortalService.log('The dialog was closed result', result);
      if (result.action === 'confirm') {
        this.refresh();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
