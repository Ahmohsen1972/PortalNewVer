import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ViewDomainComponent } from './view-domain/view-domain.component';
import { AddNewDomainComponent } from './add-new-domain/add-new-domain.component';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss'],
})
export class DomainsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = ViewDomainComponent;
  viewComponent = ViewDomainComponent;
  createComponent = AddNewDomainComponent;

  apiUrl = 'domains';
  rowKey = 'rvKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'Domains';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getDomainsData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    //  this.params = [{ modKey: 15 }];
    // this.subscriptions.push(this.httpEndpointService.getBy("module-attribute", this.params, "path").subscribe(
    // (data: ApiResponse) => {
    // this.ithmaarPortalService.log('property data in languages all : ',data.payload);
    //  this.probertyData = data.payload;

    this.columns = [
      { id: 'rvDomain', label: 'Domain Name', hideOrder: 0, width: 80 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;

    //}));
  }

  getDomainsData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('domains/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            // this.dataSource.data[3]["system"]="F";
          }
        }),
    );
  }

  addDomains() {
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
      if (result.action === 'confirm') {
        this.refresh();
      }
    });
  }
  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('domains/all')
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
