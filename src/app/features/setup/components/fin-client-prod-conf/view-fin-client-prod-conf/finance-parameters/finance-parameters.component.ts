import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { ViewFinanceParametersModuleComponent } from './view-finance-parameters-module/view-finance-parameters-module.component';
import { AddEditFinanceParametersModuleComponent } from './add-edit-finance-parameters-module/add-edit-finance-parameters-module.component';

@Component({
  selector: 'app-finance-parameters',
  templateUrl: './finance-parameters.component.html',
  styleUrls: ['./finance-parameters.component.scss'],
})
export class FinanceParametersComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditFinanceParametersModuleComponent;
  viewComponent = ViewFinanceParametersModuleComponent;
  apiUrl = 'finance-client-product-params';
  rowKey = 'fcppKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'fcp-modules';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    // this.rowKey="cgKey"+"/"+this.status;

    this.getFinanceRequiredDocument();
    this.getCustomProperties();
  }

  getFinanceRequiredDocument() {
    this.transaction = `finance-client-product-params/finance/${this.row.fcpKey}`;

    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`finance-client-product-params/finance/${this.row.fcpKey}`)
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

  getCustomProperties() {
    this.columns = [
      {
        id: 'assetAtttribteDesc',
        label: 'Attribute Name',
        hideOrder: 0,
        width: 40,
      },
      { id: 'fcppDataType', label: 'Data Type', hideOrder: 0, width: 40 },
      { id: 'fcppLName', label: 'Local Name', hideOrder: 0, width: 40 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 50 },
    ];
    this.pageLoad = true;
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`finance-client-product-params/finance/${this.row.fcpKey}`)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            //   this.transaction =`finance-client-product-params/finance/${this.row.fnpKey}`;

            this.dataSource.data = rows;
          }
        }),
    );
  }

  addParameters() {
    const dialogRef = this.dialog.open(this.addEditComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.row.fcpKey,
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
