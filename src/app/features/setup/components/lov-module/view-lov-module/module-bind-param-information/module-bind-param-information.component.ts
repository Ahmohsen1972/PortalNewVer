import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { AddEditLovModuleParamComponent } from './add-edit-lov-module-param/add-edit-lov-module-param.component';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-module-bind-param-information',
  templateUrl: './module-bind-param-information.component.html',
  styleUrls: ['./module-bind-param-information.component.scss'],
})
export class ModuleBindParamInformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditLovModuleParamComponent;

  apiUrl = 'lov-mod-bind-param';
  rowKey = 'lmbpKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'lov-mod-bind-param';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getLovModuleBindParamData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.rowKey = this.rowKey + '/' + this.status;
    this.ithmaarPortalService.log('el row key ', this.rowKey);
    this.columns = [
      {
        id: 'maLocalName',
        label: 'Module Attribute Name',
        hideOrder: 0,
        width: 80,
      },
      { id: 'lmbpOrder', label: 'Order', hideOrder: 0, width: 80 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }

  getLovModuleBindParamData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`lov-mod-bind-param/all/${this.row.ilmKey}`)
        .subscribe((result: ApiResponse) => {
          this.transaction = `lov-mod-bind-param/all/${this.row.ilmKey}`;
          this.ithmaarPortalService.log('bind params data ', result.payload);
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', result);
          }
        }),
    );
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`lov-mod-bind-param/all/${this.row.ilmKey}`)
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
