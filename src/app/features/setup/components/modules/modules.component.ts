import { Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ViewModuleComponent } from './view-module/view-module.component';
import { AddNewModuleComponent } from './add-new-module/add-new-module.component';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddNewModuleComponent;
  viewComponent = ViewModuleComponent;
  createComponent = AddNewModuleComponent;

  apiUrl = 'mod-setup';
  rowKey = 'masKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'mod-setup';
  params: any;
  columns = [];
  moduleType;
  userTypeList;
  @Input() queryParams: string;

  MainTitleText;
  constructor(
    public dialog: MatDialog,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private httpEndpointService: HttpEndpointService,
    private transferDataService: TransferDataService,
  ) {}

  ngOnInit(): void {
    this.MainTitleText = this.queryParams;
    //  this.MainTitleText=this.MainUser;

    this.userTypeList = this.sessionStorageService.getItem('userType');
    this.moduleType = this.sessionStorageService.getItem('moduleType');
    this.ithmaarPortalService.log('this.MainTitleText __', this.userTypeList);

    this.ithmaarPortalService.log('this.MainTitleText __', this.moduleType);
    // this.userTypeList=this.transferDataService.userTypeList
    // this.moduleType= this.transferDataService.moduleType
    this.transaction = `mod-setup/all/${this.moduleType}/${this.userTypeList}`;

    this.getModulesData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'masCode', label: 'Code', hideOrder: 0, width: 80 },
      { id: 'mainModLocalName', label: 'Main Module', hideOrder: 0, width: 80 },
      { id: 'modName', label: 'Module', hideOrder: 0, width: 80 },
      { id: 'mainMasCode', label: 'As Of', hideOrder: 0, width: 80 },
      { id: 'processName', label: 'Process', hideOrder: 0, width: 80 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }

  getModulesData() {
    this;
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('mod-setup/all/' + this.moduleType + '/' + this.userTypeList)
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

  addModules() {
    const dialogRef = this.dialog.open(this.createComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
        status: 'create',
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ithmaarPortalService.log('The dialog was closed result', result);
      this.transaction = `mod-setup/all/${this.moduleType}/${this.userTypeList}`;

      this.refresh();
    });
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('mod-setup/all/' + this.moduleType + '/' + this.userTypeList)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log(
              'data after refresh in modsetup : ',
              this.dataSource.data,
            );
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
