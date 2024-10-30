import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { ViewFinClientProdConfComponent } from './view-fin-client-prod-conf/view-fin-client-prod-conf.component';

@Component({
  selector: 'app-fin-client-prod-conf',
  templateUrl: './fin-client-prod-conf.component.html',
  styleUrls: ['./fin-client-prod-conf.component.scss'],
})
export class FinClientProdConfComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  // @Input() status: string;
  // @Input() row: any;
  addEditComponent = ViewFinClientProdConfComponent;
  viewComponent = ViewFinClientProdConfComponent;
  apiUrl = 'finance-client-products';
  rowKey = 'fcpKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'finance-client-products/master';
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
    //    this.transaction =`finance-client-products/finance/${this.row.fnpKey}`

    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`finance-client-products/all`)
        .subscribe((result: ApiResponse) => {
          //  this.ithmaarPortalService.log("here is data",">>>>>",this.row.fnpKey)

          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            //   this.transaction =`finance-client-products/finance/${this.row.fnpKey}`;

            this.dataSource.data = rows;
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
        .getAll(`finance-client-products/all`)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            // this.transaction =`finance-client-products/finance/${this.row.fnpKey}`;

            this.dataSource.data = rows;
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
