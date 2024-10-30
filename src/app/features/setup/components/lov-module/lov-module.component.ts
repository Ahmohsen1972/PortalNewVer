import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { ViewLovModuleComponent } from './view-lov-module/view-lov-module.component';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { AddEditLovModuleComponent } from './view-lov-module/lov-module-information/add-edit-lov-module/add-edit-lov-module.component';

@Component({
  selector: 'app-lov-module',
  templateUrl: './lov-module.component.html',
  styleUrls: ['./lov-module.component.scss'],
})
export class LovModuleComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddEditLovModuleComponent;
  viewComponent = ViewLovModuleComponent;

  apiUrl = 'lov-modules';
  rowKey = 'ilmKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'lov-modules';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getLovModuleData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'modLocalName', label: 'Module', hideOrder: 0, width: 80 },
      { id: 'lovName', label: 'Lov Name', hideOrder: 0, width: 80 },
      { id: 'maLocalName', label: 'Module Attribute', hideOrder: 0, width: 80 },
      {
        id: 'ilmAddedWhereCond',
        label: 'Where Condition',
        hideOrder: 0,
        width: 80,
      },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }

  getLovModuleData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('lov-modules/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log('mydataaaaaaaaaaa', result);
          }
        }),
    );
  }

  addLovModule() {
    const dialogRef = this.dialog.open(this.addEditComponent, {
      width: '750px',
      height: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
        status: 'create',
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

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('lov-modules/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            // this.ithmaarPortalService.log('data after refresh in employer : ',this.dataSource.data);
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
