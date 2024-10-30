import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { EditAssAttMappingCodeComponent } from './edit-ass-att-mapping-code/edit-ass-att-mapping-code.component';
import { ViewAssAttMappingCodeComponent } from './view-ass-att-mapping-code/view-ass-att-mapping-code.component';

@Component({
  selector: 'app-asset-att-mapping-code',
  templateUrl: './asset-att-mapping-code.component.html',
  styleUrls: ['./asset-att-mapping-code.component.scss'],
})
export class AssetAttMappingCodeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = EditAssAttMappingCodeComponent;
  viewComponent = ViewAssAttMappingCodeComponent;

  apiUrl = 'ass-att-mapp';
  rowKey = 'rowkey';
  pageLoad: boolean = false;
  transaction = 'ass-att-mapp';
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getAssetAttributesMappingCodeData();
    this.createColumns();
  }

  createColumns() {
    this.columns = [
      {
        id: 'assetClassName',
        label: 'Asset Class Name',
        hideOrder: 0,
        width: 80,
      },
      { id: 'atributeName', label: 'Attribute Name', hideOrder: 0, width: 80 },

      { id: 'acaDisplayOrder', label: 'Order', hideOrder: 0, width: 80 },

      { id: 'acaIntegrationCode', label: 'Code', hideOrder: 0, width: 80 },

      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }

  getAssetAttributesMappingCodeData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('ass-att-mapp/all')
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
  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('ass-att-mapp/all')
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
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
