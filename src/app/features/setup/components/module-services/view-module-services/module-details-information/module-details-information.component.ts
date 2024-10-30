import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { AddEditDetailsComponent } from './add-edit-details/add-edit-details.component';
import { ViewDetailsInformationComponent } from './view-details-information/view-details-information.component';

@Component({
  selector: 'app-module-details-information',
  templateUrl: './module-details-information.component.html',
  styleUrls: ['./module-details-information.component.scss'],
})
export class ModuleDetailsInformationComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditDetailsComponent;
  createComponent = AddEditDetailsComponent;
  viewComponent = ViewDetailsInformationComponent;
  apiUrl = 'column-service';
  rowKey = 'scmKey';
  probertyData: any;
  pageLoad: boolean = false;
  // transaction = "ModuleService/Parent";
  transaction = 'column-service/module';

  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorageService: LocalStorageService,
    private myRoute: Router,
  ) {}

  ngOnInit(): void {
    this.rowKey = 'scmKey' + '/' + this.status;
    this.ithmaarPortalService.log('el rowKey aho  ', this.status);

    this.ithmaarPortalService.log('el imsKey aho  ', this.row.imsKey);
    this.getModulesData();
    this.getCustomProperties();
  }
  getCustomProperties() {
    this.columns = [
      // { id: 'imsKey', label: 'Serv Code', hideOrder: 4, width: 80 },
      { id: 'source', label: 'Source', hideOrder: 0, width: 80 },
      //{ id: 'modLocalName', label:'Module	', hideOrder: 0 , width: 80},
      //{ id: 'serviceURL', label:'Serv URL', hideOrder: 0 , width: 80},
      { id: 'distination', label: 'Distination', hideOrder: 0, width: 80 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }
  getModulesData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`column-service/module/${this.row.imsKey}`)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            //  this.transaction =`ModuleService/Parent/${this.row.imsKey}`
            this.transaction = `column-service/module/${this.row.imsKey}`;

            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', result.payload);
          }
        }),
    );
  }

  addColumn() {
    const dialogRef = this.dialog.open(this.createComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.row,

        status: 'create',
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ithmaarPortalService.log('The dialog was closed result', result);
      if (result.action === 'confirm') {
        this.ngOnInit();
      }
    });
  }
  addModuleDetails() {}

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`column-service/module/${this.row.modKey}`)
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
