import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { EditModuleLocalizeComponent } from './edit-module-localize/edit-module-localize.component';

@Component({
  selector: 'app-module-localize',
  templateUrl: './module-localize.component.html',
  styleUrls: ['./module-localize.component.scss'],
})
export class ModuleLocalizeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = EditModuleLocalizeComponent;
  apiUrl = 'module-localize';
  rowKey = 'mlKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'module-localize';
  moduleLocalizeResponse: any;
  params: any;
  columns = [];
  modNameData = [];
  mainModLocalnameData = [];
  tableIsHidden: boolean = true;
  module: number;
  mainModule: number;
  filterForm;
  dependentLov: boolean = false;

  get modKey() {
    return this.filterForm.get('modKey');
  }

  get parentModKey() {
    return this.filterForm.get('parentModKey');
  }

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getCustomProperties();
    this.callLovServices();
    this.createFilterForm();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'parentModuleLocalName', label: 'Parent Module', hideOrder: 1 },
      { id: 'moduleLocalName', label: 'Module', hideOrder: 0, width: 75 },
      { id: 'mlCaption', label: 'Caption', hideOrder: 4 },
      { id: 'langShortName', label: 'Language', hideOrder: 4 },
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

  getModKey(modKey) {
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

  moduleLocalizeData(mainModule, module) {
    this.module = module;
    this.mainModule = mainModule;
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`module-localize/all/${this.mainModule}${'/'}${this.module}`)
        .subscribe((result: ApiResponse) => {
          this.transaction = `module-localize/all/${this.mainModule}${'/'}${this.module}`;
          if (result.success) {
            const rows = [];
            rows.push(result.payload);
            this.dataSource.data = rows;
          }
        }),
    );
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`module-localize/all/${this.mainModule}${'/'}${this.module}`)
        .subscribe((result: ApiResponse) => {
          if (result.success) {
            const rows = [];
            rows.push(result.payload);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
