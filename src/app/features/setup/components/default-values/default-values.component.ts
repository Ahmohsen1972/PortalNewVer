import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { ViewDefaultvaluesComponent } from './view-defaultvalues/view-defaultvalues.component';
import { AddNewDefaultValueComponent } from './add-new-default-value/add-new-default-value.component';

@Component({
  selector: 'app-default-values',
  templateUrl: './default-values.component.html',
  styleUrls: ['./default-values.component.scss'],
})
export class DefaultValuesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddNewDefaultValueComponent;
  viewComponent = ViewDefaultvaluesComponent;
  apiUrl = 'default-values-setup';
  rowKey = 'rovsKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'default-values-setup';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getDefaultValuesData();
  }

  getDefaultValuesData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('default-values-setup/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.columns = [
              {
                id: 'rovsFinanceConceptName',
                label: 'Finance Concept',
                hideOrder: 0,
                width: 75,
              },
              { id: 'rovsProfitRate', label: 'Profit Rate', hideOrder: 1 },
              {
                id: 'rovsDownPaymentPercentage',
                label: 'Down Payment %',
                hideOrder: 4,
              },
              { id: 'rovsGraceDays', label: 'Grace Days', hideOrder: 4 },
              { id: 'rovsTenure', label: 'Tenure', hideOrder: 4 },
              { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
            ];

            this.dataSource.data = rows;
            this.ithmaarPortalService.log('el result ', result);
            this.pageLoad = true;
          }
        }),
    );
  }

  addDefaultValue() {
    const dialogRef = this.dialog.open(AddNewDefaultValueComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('default-values-setup/all')
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
