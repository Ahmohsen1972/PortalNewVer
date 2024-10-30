import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { ViewFinanceProductsComponent } from './view-finance-products/view-finance-products.component';
import { AddEditFinanceProductInformationComponent } from './view-finance-products/finance-product-information/add-edit-finance-product-information/add-edit-finance-product-information.component';

@Component({
  selector: 'app-finance-products',
  templateUrl: './finance-products.component.html',
  styleUrls: ['./finance-products.component.scss'],
})
export class FinanceProductsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddEditFinanceProductInformationComponent;
  viewComponent = ViewFinanceProductsComponent;
  createComponent = AddEditFinanceProductInformationComponent;

  apiUrl = 'finance-products';
  rowKey = 'fnpKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'finance-products';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getFinanceProductsData();
    this.getCustomProperties();
  }
  getCustomProperties() {
    this.columns = [
      { id: 'fnpLName', label: 'Local Name', hideOrder: 0, width: 80 },
      { id: 'fnpFName', label: 'Other Name', hideOrder: 0, width: 80 },

      { id: 'fnpDescription', label: 'Description', hideOrder: 0, width: 80 },

      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }
  getFinanceProductsData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('finance-products/all')
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

  addFinanceProduct() {
    const dialogRef = this.dialog.open(
      AddEditFinanceProductInformationComponent,
      {
        width: '750px',
        panelClass: 'main-popup',
        data: {
          row: null,
          status: 'create',
        },
        direction:
          this.localStorageService.getItem('currentLang') == 'AR'
            ? 'rtl'
            : 'ltr',
      },
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  refresh() {
    this.getFinanceProductsData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
