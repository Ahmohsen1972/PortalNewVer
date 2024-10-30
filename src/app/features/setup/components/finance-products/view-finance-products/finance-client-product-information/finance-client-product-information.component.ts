import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { AddEditFinanceClientProductInformationComponent } from './add-edit-finance-client-product/add-edit-finance-client-product-information.component';
import { ViewFinanceClientProductInformationComponent } from './view-finance-client-product-information/view-finance-client-product-information.component';

import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { MatTableDataSource } from '@angular/material/table';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-finance-client-product-information',
  templateUrl: './finance-client-product-information.component.html',
  styleUrls: ['./finance-client-product-information.component.scss'],
})
export class FinanceClientProductInformationComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditFinanceClientProductInformationComponent;
  viewComponent = ViewFinanceClientProductInformationComponent;
  apiUrl = 'finance-client-products';
  rowKey = 'fcpKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'finance-client-products';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
  ) {}

  ngOnInit(): void {
    // this.rowKey="cgKey"+"/"+this.status;

    this.ithmaarPortalService.log('rowKey ><<> ', this.rowKey);
    this.getFinanceClientProduct();
    this.getCustomProperties();
  }

  getFinanceClientProduct() {
    this.transaction = `finance-client-products/finance/${this.row.fnpKey}`;

    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`finance-client-products/finance/${this.row.fnpKey}`)
        .subscribe((result: ApiResponse) => {
          this.ithmaarPortalService.log('here is data', this.row.fnpKey);
          this.ithmaarPortalService.log('here is data', result);

          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.transaction = `finance-client-products/finance/${this.row.fnpKey}`;

            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', result);
          }
        }),
    );
  }

  getCustomProperties() {
    this.columns = [
      { id: 'fcpLName', label: 'Local Name', hideOrder: 0, width: 50 },
      { id: 'fcpFName', label: 'Other Name', hideOrder: 0, width: 50 },
      //{ id: 'orderHint', label:'Order', hideOrder: 0 , width: 50},
      {
        id: 'fcpLDescription',
        label: 'Local Description',
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

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`finance-client-products/finance/${this.row.fnpKey}`)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.transaction = `finance-client-products/finance/${this.row.fnpKey}`;

            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', result);
          }
        }),
    );
  }

  addFinanceClientProducts() {
    const dialogRef = this.dialog.open(this.addEditComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.row.fnpKey,
        action: 'create',
      },
      // direction : this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

/*







}

*/
