import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { AddEditModuleAttributesInfoComponent } from './add-edit-module-attributes-info/add-edit-module-attributes-info.component';

@Component({
  selector: 'app-module-attributes-information',
  templateUrl: './module-attributes-information.component.html',
  styleUrls: ['./module-attributes-information.component.scss'],
})
export class ModuleAttributesInformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditModuleAttributesInfoComponent;
  createComponent = AddEditModuleAttributesInfoComponent;

  apiUrl = 'mod-att-setup';
  rowKey = 'apsKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'mod-att-setup';
  params: any;
  columns = [];
  updateDisabled: boolean = false;

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getModulesData();
    this.getCustomProperties();
  }
  getCustomProperties() {
    this.columns = [
      { id: 'maLocalName', label: 'Name', hideOrder: 0, width: 80 },
      { id: 'apsEnabled', label: 'Enabled', hideOrder: 0, width: 80 },
      { id: 'apsRequired', label: 'Required', hideOrder: 0, width: 80 },
      { id: 'apsVisible', label: 'Visible', hideOrder: 0, width: 80 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }

  getModulesData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`mod-att-setup/all/${this.row.masKey}`)
        .subscribe((result: ApiResponse) => {
          this.transaction = `mod-att-setup/all/${this.row.masKey}`;
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

  addModuleAttributesSetup() {
    const dialogRef = this.dialog.open(this.createComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
        status: 'create',
        modKey: this.row.modKey,
        masKey: this.row.masKey,
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ithmaarPortalService.log('The dialog was closed result', result);
      this.refresh();
    });
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`mod-att-setup/all/${this.row.masKey}`)
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
