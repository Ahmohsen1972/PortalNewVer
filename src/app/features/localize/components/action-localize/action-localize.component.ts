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
import { AddEditActionLocalizeComponent } from './add-edit-action-localize/add-edit-action-localize.component';

@Component({
  selector: 'app-action-localize',
  templateUrl: './action-localize.component.html',
  styleUrls: ['./action-localize.component.scss'],
})
export class ActionLocalizeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddEditActionLocalizeComponent;
  apiUrl = 'action-localize';
  rowKey = 'acKey';
  probertyData: string[];
  pageLoad: boolean = false;
  transaction = 'action-localize';
  params: any;
  columns = [];
  processActionNameData = [];
  filterForm;
  isDisabled: boolean = true;

  get ipaKey() {
    return this.filterForm.get('ipaKey').value;
  }

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private trasferDataService: TransferDataService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getCustomProperties();
    this.callLovServices();
    this.createFilterForm();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'mainActionName', label: 'Action Name', hideOrder: 4 },
      { id: 'langLocalName', label: 'Language', hideOrder: 4 },
      { id: 'acDescription', label: 'Description', hideOrder: 4 },
      { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
    ];
  }

  callLovServices() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('action-names-lov/all')
        .subscribe((data: ApiResponse) => {
          this.processActionNameData = data.payload;
          this.ithmaarPortalService.log(
            'el process action name ',
            this.processActionNameData,
          );
        }),
    );
    this.pageLoad = true;
  }

  getActionName(actionName) {
    this.trasferDataService.processActionName = actionName;
  }

  processActionLocalizeData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`action-localize/all/${this.ipaKey}`)
        .subscribe((result: ApiResponse) => {
          this.isDisabled = false;
          this.transaction = `action-localize/all/${this.ipaKey}`;
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

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`action-localize/all/${this.ipaKey}`)
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
      ipaKey: ['', [Validators.required]],
    });
  }

  addAction() {
    const dialogRef = this.dialog.open(AddEditActionLocalizeComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
        status: 'create',
        ipaKey: this.ipaKey,
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
