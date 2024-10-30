import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ViewEmployerComponent } from './view-employer/view-employer.component';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { AddNewEmployerComponent } from './add-new-employer/add-new-employer.component';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss'],
})
export class EmployersComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddNewEmployerComponent;
  viewComponent = ViewEmployerComponent;
  apiUrl = 'employer';
  rowKey = 'weKey';
  transaction = 'Employes';
  probertyData: any;
  pageLoad: boolean = false;
  params: any;
  staticTranslation: any;
  capital: string;
  moduleName: string;

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private transferDataService: TransferDataService,
    private ithmaarPortalService: IthmaarPortalService,
    private sessionStorageService: SessionStorageService,
    private localstorageservice: LocalStorageService,
    private route: ActivatedRoute,
    private myRoute: Router,
  ) {}

  columns = [];
  ngOnInit(): void {
    //  moduleName:string;

    this.route.queryParams.subscribe((params) => {
      this.moduleName = params['moduleName'];
    });

    //{{staticTranslation['']}}
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.transferDataService.languageCanged.subscribe((res) => {
      if (res == true) {
        this.staticTranslation =
          this.localstorageservice.getItem('static_translation');
      }
    });
    this.getEmployerData();
    this.getCustomProperties();
    this.transferDataService.fetchScr = true;
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.myRoute.url.includes('setup')) {
          this.ithmaarPortalService.log('within new lang ___________');
          this.pageLoad = false;
          this.getCustomProperties();
        }
      });
  }
  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupEmployer },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.ithmaarPortalService.log(
            'property data in employers all : ',
            data.payload,
          );
          this.probertyData = data.payload;

          this.columns = [
            {
              id: 'weCode',
              label: this.probertyData['weCode']['ahdCaption'],
              hideOrder: 0,
              width: 75,
            },
            {
              id: 'weLocalName',
              label: this.probertyData['weLocalName']['ahdCaption'],
              hideOrder: 1,
            },
            {
              id: 'weForeignName',
              label: this.probertyData['weForeignName']['ahdCaption'],
              hideOrder: 4,
            },
            { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
          ];
          this.pageLoad = true;
        }),
    );
  }
  getEmployerData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('employer/all')
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
  addEmployer(): void {
    const dialogRef = this.dialog.open(AddNewEmployerComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ithmaarPortalService.log('within clos of employer ', result);
      this.refresh();
    });
  }
  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('employer/all')
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
