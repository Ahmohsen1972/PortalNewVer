import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AddEditCodeComponent } from './add-edit-code/add-edit-code.component';
import { ViewCodesInformationComponent } from './view-codes-information/view-codes-information.component';

import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { MatTableDataSource } from '@angular/material/table';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-codes-information',
  templateUrl: './codes-information.component.html',
  styleUrls: ['./codes-information.component.scss'],
})
export class CodesInformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditCodeComponent;
  viewComponent = ViewCodesInformationComponent;
  apiUrl = 'codes';
  rowKey = 'cgKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'codes/all';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.rowKey = 'cgKey' + '/' + this.status;

    this.ithmaarPortalService.log('rowKey ><<> ', this.rowKey);
    this.getCodes();
    this.getCustomProperties();
  }

  getCodes() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`codes/all/${this.row.rvKey}`)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.transaction = `codes/all/${this.row.rvKey}`;
            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', result);
          }
        }),
    );
  }

  getCustomProperties() {
    this.columns = [
      { id: 'rvLowValue', label: 'Low Value', hideOrder: 0, width: 50 },
      { id: 'rvMeaning', label: 'Value Description', hideOrder: 0, width: 50 },
      //{ id: 'orderHint', label:'Order', hideOrder: 0 , width: 50},
      {
        id: 'rvForeignMeaning',
        label: 'Foreign Value Description',
        hideOrder: 0,
        width: 50,
      },
      //{ id: 'parentName', label:'Parent Name', hideOrder: 0 , width: 50},
      // { id: 'visible', label:'Visible', hideOrder: 0 , width: 50},
      // { id: 'rvDomain', label:'Domain', hideOrder: 0 , width: 50},
      { id: 'action', label: 'Action', hideOrder: 4, width: 50 },
    ];
    this.pageLoad = true;
  }

  addCodes() {
    const dialogRef = this.dialog.open(AddEditCodeComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.row.rvKey,
        status: 'create',
      },
      // direction : this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }
  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`codes/all/${this.row.rvKey}`)
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
