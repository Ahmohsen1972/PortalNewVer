import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { EditClintInfoComponent } from './edit-clint-info/edit-clint-info.component';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { ViewClientInfoComponent } from './view-client-info/view-client-info.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = EditClintInfoComponent;
  viewComponent = ViewClientInfoComponent;
  apiUrl = 'client';
  rowKey = 'clntKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'client';
  columns = [];
  clientKey: number;

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    private sessionStorageService: SessionStorageService,
  ) {}

  ngOnInit(): void {
    this.getCustomProperties();
    this.clientData();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'clntLocalName', label: 'Local Name', hideOrder: 4 },
      { id: 'clntForeignName', label: 'Foreign Name', hideOrder: 4 },
      { id: 'clntLocalAddress', label: 'Address', hideOrder: 4 },
      { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
    ];
  }

  clientData() {
    this.clientKey = +this.sessionStorageService.getItem('clnt_key');
    let params = [{ id: this.clientKey }];
    this.transaction = `client/${this.clientKey}`;
    this.subscriptions.push(
      this.httpEndpointService
        .getBy(`client`, params, 'path')
        .subscribe((result: ApiResponse) => {
          this.ithmaarPortalService.log('el client ', result.payload);
          if (result.success) {
            const rows = [];
            rows.push(result.payload);
            this.dataSource.data = rows;
            this.pageLoad = true;
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
