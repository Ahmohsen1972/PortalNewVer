import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ViewLovsComponent } from './view-lovs/view-lovs.component';
import { AddNewLovComponent } from './add-new-lov/add-new-lov.component';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-lovs',
  templateUrl: './lovs.component.html',
  styleUrls: ['./lovs.component.scss'],
})
export class LovsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddNewLovComponent;
  viewComponent = ViewLovsComponent;
  createComponent = AddNewLovComponent;

  apiUrl = 'lov-admin';
  rowKey = 'lovKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'lov-admin';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getLovsData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'lovName', label: 'Name', hideOrder: 0, width: 80 },
      { id: 'lovQuery', label: 'Query', hideOrder: 0, width: 80 },
      { id: 'lovType', label: 'Type', hideOrder: 0, width: 80 },
      { id: 'rvDomain', label: 'Domain', hideOrder: 0, width: 80 },
      { id: 'lovIsValid', label: 'Validation', hideOrder: 0, width: 80 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }

  getLovsData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('lov-admin/all')
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

  addLov() {
    const dialogRef = this.dialog.open(this.createComponent, {
      width: '750px',
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

      this.refresh();
    });
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('lov-admin/all')
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
