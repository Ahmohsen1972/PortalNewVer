import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { ViewFinanceModuleComponent } from './view-finance-module/view-finance-module.component';
import { AddEditFinanceModuleComponent } from './add-edit-finance-module/add-edit-finance-module.component';

@Component({
  selector: 'app-finance-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class FinanceModulesComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditFinanceModuleComponent;
  viewComponent = ViewFinanceModuleComponent;
  apiUrl = 'fcp-modules';
  rowKey = 'fcpmKey';
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
    this.transaction = `fcp-modules/finance/${this.row.fcpKey}`;

    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`fcp-modules/finance/${this.row.fcpKey}`)
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
      { id: 'rolLocalName', label: 'Role', hideOrder: 0, width: 40 },
      { id: 'modLocalName', label: 'Module', hideOrder: 0, width: 40 },
      //   { id: 'fcprdRequiredOrginalityName', label:'Originality', hideOrder: 0 , width: 40},
      { id: 'action', label: 'Action', hideOrder: 4, width: 50 },
    ];
    this.pageLoad = true;
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`fcp-modules/finance/${this.row.fcpKey}`)
        .subscribe((result: ApiResponse) => {
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

  addModules() {
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
