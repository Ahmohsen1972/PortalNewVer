import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { ViewModuleServicesComponent } from './view-module-services/view-module-services.component';
import { AddNewModuleServicesComponent } from './add-new-module-services/add-new-module-services.component';

@Component({
  selector: 'app-module-services',
  templateUrl: './module-services.component.html',
  styleUrls: ['./module-services.component.scss'],
})
export class ModuleServicesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = ViewModuleServicesComponent;
  viewComponent = ViewModuleServicesComponent;
  createComponent = AddNewModuleServicesComponent;

  apiUrl = 'ModuleService';
  rowKey = 'imsKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'ModuleService';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    private myRoute: Router,
  ) {}

  ngOnInit(): void {
    this.getServiceData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'imsKey', label: 'Service Code', hideOrder: 0, width: 75 },
      { id: 'description', label: ' Description', hideOrder: 0, width: 80 },
      { id: 'parentSrvDescription', label: 'Ser Parent ', hideOrder: 4 },
      { id: 'modLocalName', label: 'Module ', hideOrder: 4 },
      { id: 'serviceURL', label: 'Service URL ', hideOrder: 4, width: 80 },
      { id: 'serviceType', label: 'Service Type ', hideOrder: 4, width: 80 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;

    //}));
  }
  getServiceData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('ModuleService/all')
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

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('ModuleService/all')
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
