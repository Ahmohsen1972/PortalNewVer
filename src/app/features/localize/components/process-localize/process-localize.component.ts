import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { AddEditProcessLocalizeComponent } from './add-edit-process-localize/add-edit-process-localize.component';

@Component({
  selector: 'app-process-localize',
  templateUrl: './process-localize.component.html',
  styleUrls: ['./process-localize.component.scss'],
})
export class ProcessLocalizeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddEditProcessLocalizeComponent;
  apiUrl = 'process-localize';
  rowKey = 'plcKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'process-localize';
  params: any;
  columns = [];
  processNameData = [];
  filterForm;
  isDisabled: boolean = true;

  get prcKey() {
    return this.filterForm.get('prcKey').value;
  }

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    private tranferDataService: TransferDataService,
    private ithmaarPortalService: IthmaarPortalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.ithmaarPortalService.log('Iam Here');
    this.getCustomProperties();
    this.callLovServices();
    this.createFilterForm();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'mainPrcName', label: 'Process Name', hideOrder: 4 },
      { id: 'langLocalName', label: 'Language', hideOrder: 4 },
      { id: 'plcDescription', label: 'Description', hideOrder: 4 },
      { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
    ];
  }

  callLovServices() {
    this.params = [{ lovKey: 32 }, { ilmKey: 93 }];

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.processNameData = data.payload.data;
        }),
    );
    this.pageLoad = true;
  }

  getProcessName(processName) {
    this.tranferDataService.processName = processName;
  }

  processLocalizeData() {
    this.isDisabled = false;
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`process-localize/all/${this.prcKey}`)
        .subscribe((result: ApiResponse) => {
          this.transaction = `process-localize/all/${this.prcKey}`;
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;

            this.ithmaarPortalService.log('why we are here', result);
          }
        }),
    );
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`process-localize/all/${this.prcKey}`)
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

  createFilterForm() {
    this.filterForm = this.fb.group({
      prcKey: ['', [Validators.required]],
    });
  }

  addProcess() {
    const dialogRef = this.dialog.open(AddEditProcessLocalizeComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
        status: 'create',
        prcKey: this.filterForm.get('prcKey').value,
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
