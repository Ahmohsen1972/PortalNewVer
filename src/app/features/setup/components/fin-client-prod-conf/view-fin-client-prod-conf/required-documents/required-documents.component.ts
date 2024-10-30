import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { ViewRequiredDocumentComponent } from './view-required-document/view-required-document.component';
import { AddEditRequiredDocumentComponent } from './add-edit-required-document/add-edit-required-document.component';

@Component({
  selector: 'app-required-documents',
  templateUrl: './required-documents.component.html',
  styleUrls: ['./required-documents.component.scss'],
})
export class RequiredDocumentsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditRequiredDocumentComponent;
  viewComponent = ViewRequiredDocumentComponent;
  apiUrl = 'required-documents';
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
    // this.rowKey="cgKey"+"/"+this.status;

    this.ithmaarPortalService.log('rowKey ><<> ', this.rowKey);
    this.getFinanceRequiredDocument();
    this.getCustomProperties();
  }

  getFinanceRequiredDocument() {
    this.transaction = `required-documents/finance/${this.row.fcpKey}`;

    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`required-documents/finance/${this.row.fcpKey}`)
        .subscribe((result: ApiResponse) => {
          this.ithmaarPortalService.log('here is data', this.row.fnpKey);
          this.ithmaarPortalService.log('here is data', result);

          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            // this.transaction =`finance-client-products/finance/${this.row.fnpKey}`;

            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', this.dataSource.data);
          }
        }),
    );
  }

  getCustomProperties() {
    this.columns = [
      { id: 'wrdLocalName', label: 'Word Name', hideOrder: 0, width: 40 },
      { id: 'fcprdUsedForName', label: 'Purpose', hideOrder: 0, width: 40 },
      {
        id: 'fcprdNationalityStatusName',
        label: 'Nationality',
        hideOrder: 0,
        width: 40,
      },
      //   { id: 'fcprdRequiredOrginalityName', label:'Originality', hideOrder: 0 , width: 40},
      { id: 'action', label: 'Action', hideOrder: 4, width: 50 },
    ];
    this.pageLoad = true;
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`required-documents/finance/${this.row.fcpKey}`)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            //   this.transaction =`finance-client-products/finance/${this.row.fnpKey}`;

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
        row: this.row.fcpKey,
        action: 'create',
      },
      // direction : this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
