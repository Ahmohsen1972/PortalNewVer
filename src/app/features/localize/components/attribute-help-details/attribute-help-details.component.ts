import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { EditAttributeDetailsComponent } from './edit-attribute-details/edit-attribute-details.component';
@Component({
  selector: 'app-attribute-help-details',
  templateUrl: './attribute-help-details.component.html',
  styleUrls: ['./attribute-help-details.component.scss'],
})
export class AttributeHelpDetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = EditAttributeDetailsComponent;
  apiUrl = 'att-help-details';
  rowKey = 'ahdKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'att-help-details';
  params: any;
  columns = [];
  modNameData = [];
  mainModLocalnameData = [];
  module: number;
  mainModule: number;
  mainModLocalName: string;
  modLocalName: string;
  filterForm;
  dependentLov: boolean = false;
  isDisabled: boolean = true;

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private fb: FormBuilder,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorageService: LocalStorageService,
  ) {}

  get modKey() {
    return this.filterForm.get('modKey');
  }

  get parentModKey() {
    return this.filterForm.get('parentModKey');
  }

  ngOnInit(): void {
    this.getCustomProperties();
    this.callLovServices();
    this.createFilterForm();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'parentModule', label: 'Parent Module', hideOrder: 4 },
      { id: 'mainModule', label: 'Module', hideOrder: 4 },
      { id: 'maLocalName', label: 'Module Attribute', hideOrder: 4 },
      { id: 'langLocalName', label: 'Language', hideOrder: 4 },
      { id: 'ahdHelp', label: 'Help', hideOrder: 0, width: 75 },
      { id: 'ahdTooltip', label: 'Tooltip', hideOrder: 1 },
      { id: 'ahdCaption', label: 'Caption', hideOrder: 4 },
      { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
    ];
  }

  callLovServices() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('module-lovs/all-non-parent')
        .subscribe((data: ApiResponse) => {
          this.mainModLocalnameData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  getParentModKey(modKey, modLocalName) {
    this.mainModLocalName = modLocalName;
    this.dependentLov = false;
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`module-lovs/filtered-modules/${modKey}`)
        .subscribe((data) => {
          this.modNameData = data.payload;
          this.dependentLov = true;
        }),
    );

    // this.newDependentLov=true
  }

  getModLocalName(name) {
    this.modLocalName = name;
  }

  attributeDetailsData(module, mainModule) {
    this.module = module;
    this.mainModule = mainModule;
    this.isDisabled = false;
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`att-help-details/all/${this.module}${'/'}${this.mainModule}`)
        .subscribe((result: ApiResponse) => {
          this.transaction = `att-help-details/all/${this.module}${'/'}${this.mainModule}`;
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
        .getAll(`att-help-details/all/${this.module}${'/'}${this.mainModule}`)
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
      parentModKey: ['', [Validators.required]],
      modKey: ['', [Validators.required]],
    });
  }

  addAttribute() {
    const dialogRef = this.dialog.open(this.addEditComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
        status: 'create',
        parentModKey: this.mainModule,
        mainModLocalName: this.mainModLocalName,
        modKey: this.module,
        modLocalName: this.modLocalName,
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ithmaarPortalService.log('The dialog was closed result', result);
      // this.transaction=`mod-setup/all/${this.moduleType}/${this.userTypeList}`

      this.refresh();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
