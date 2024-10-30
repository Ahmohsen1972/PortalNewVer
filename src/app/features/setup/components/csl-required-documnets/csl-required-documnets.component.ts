import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { AddEditCslReqDocComponent } from './add-edit-csl-req-doc/add-edit-csl-req-doc.component';
import { ViewCslReqDocComponent } from './view-csl-req-doc/view-csl-req-doc.component';

@Component({
  selector: 'app-csl-required-documnets',
  templateUrl: './csl-required-documnets.component.html',
  styleUrls: ['./csl-required-documnets.component.scss'],
})
export class CslRequiredDocumnetsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditCslReqDocComponent;
  viewComponent = ViewCslReqDocComponent;
  apiUrl = 'csl-required-document';
  rowKey = 'fcprdKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'required-documents';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
  ) {}

  ngOnInit(): void {
    this.getCslRequiredDocument();
    this.getCustomProperties();
  }

  getCslRequiredDocument() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`csl-required-document/all`)
        .subscribe((result: ApiResponse) => {
          this.ithmaarPortalService.log('here is data', result.payload);
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', this.dataSource.data);
          }
        }),
    );
  }

  getCustomProperties() {
    this.columns = [
      { id: 'wrdLocalName', label: 'Word Name', hideOrder: 0, width: 40 },
      {
        id: 'fcprdNationalityStatusName',
        label: 'Nationality',
        hideOrder: 0,
        width: 40,
      },
      { id: 'cslLocalName', label: 'Letter Name', hideOrder: 0, width: 40 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 50 },
    ];
    this.pageLoad = true;
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`csl-required-document/all`)
        .subscribe((result: ApiResponse) => {
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

  addFinanceClientProducts() {
    const dialogRef = this.dialog.open(this.addEditComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        action: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
