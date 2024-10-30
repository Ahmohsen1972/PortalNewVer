import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-add-new-module',
  templateUrl: './add-new-module.component.html',
  styleUrls: ['./add-new-module.component.scss'],
})
export class AddNewModuleComponent implements OnInit, OnDestroy {
  moduleObj: any;
  modNameData = [];
  mainModLocalnameData = [];
  subModuleData = [];
  roleNameData = [];
  processNameData = [];
  asOfData = [];
  userType: number;
  moduleType: string;
  dependentLovModule: boolean = false;
  dependentLovAsOf: boolean = false;
  action: string;
  actionBtn: string;
  filteredModKey: number;
  private subscriptions: Subscription[] = [];
  moduleForm: FormGroup;
  rowId: number;
  row: any;
  probertyData: any;
  params: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  staticTranslation: any;

  constructor(
    private toastr: ToastrService,
    private httpEndpointService: HttpEndpointService,
    @Inject(MAT_DIALOG_DATA) private recievedData: any,
    private transferDataService: TransferDataService,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorgeService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private dialogRef: MatDialogRef<AddNewModuleComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorgeService.getItem('static_translation');
    this.createModuleForm();
    this.callLovServices();
  }

  getModKeyParent(modKey) {
    this.dependentLovModule = false;
    this.filteredModKey = modKey;
    this.ithmaarPortalService.log('filteredModKey  ', this.filteredModKey);
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`module-localize/all/${this.filteredModKey}`)
        .subscribe((data: ApiResponse) => {
          this.ithmaarPortalService.log('el data bta3 elmodule ', data);
          this.subModuleData = data.payload;
          this.ithmaarPortalService.log('subModuleData  ', this.subModuleData);
          this.dependentLovModule = true;
        }),
    );
  }

  getModKey(modKey) {
    this.dependentLovAsOf = false;
    let asOfParams = [{ modKey: modKey }];
    this.ithmaarPortalService.log('asOfParams  ', asOfParams);
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('mod-setup/mas-lov', asOfParams, 'path')
        .subscribe((data) => {
          this.asOfData = data.payload;
          this.ithmaarPortalService.log('as of list > ', this.asOfData);
          this.dependentLovAsOf = true;
          // this.newDependentLov=true
        }),
    );
  }

  createModuleForm() {
    this.userType = this.sessionStorageService.getItem('userType');
    this.moduleType = this.sessionStorageService.getItem('moduleType');
    this.ithmaarPortalService.log('el syorage user type ', this.userType);
    this.moduleForm = new FormGroup({
      modKey: new FormControl(),

      modKeyParent: new FormControl(),

      roleName: new FormControl({ value: '', disabled: true }),

      rolKey: new FormControl(this.userType),

      prcKey: new FormControl(),

      masKeyAsOf: new FormControl(),

      sysKey: new FormControl(1),

      reqNon: new FormControl(this.moduleType),
    });
  }

  callLovServices() {
    this.params = [
      { lovKey: 29 },
      { ilmKey: 88 },
      { whereClauseValues: [+this.userType, this.moduleType] },
    ];

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.mainModLocalnameData = data.payload.data;
          this.ithmaarPortalService.log(
            'el main mod local name ',
            this.mainModLocalnameData,
          );

          this.params = [{ lovKey: 32 }, { ilmKey: 90 }];
          this.subscriptions.push(
            this.httpEndpointService
              .getBy('lov/fetch', this.params, 'path')
              .subscribe((data: ApiResponse) => {
                this.processNameData = data.payload.data;
                this.pageLoad = true;
              }),
          );
        }),
    );
  }

  onSubmit() {
    this.moduleObj = this.moduleForm.value;
    this.moduleForm
      .get('modKeyParent')
      .setValue(+this.moduleForm.get('modKeyParent').value);
    this.moduleForm
      .get('modKey')
      .setValue(+this.moduleForm.get('modKey').value);
    this.moduleForm
      .get('rolKey')
      .setValue(+this.moduleForm.get('rolKey').value);
    this.moduleForm
      .get('prcKey')
      .setValue(+this.moduleForm.get('prcKey').value);
    this.moduleForm
      .get('masKeyAsOf')
      .setValue(+this.moduleForm.get('masKeyAsOf').value);

    this.ithmaarPortalService.log(
      'el data bta3 el talent >>>',
      this.moduleForm.value,
    );
    this.subscriptions.push(
      this.httpEndpointService
        .create('mod-setup/add', this.moduleForm.value)
        .subscribe(
          (data: ApiResponse) => {
            this.isDisabled = true;
            if (data.success) {
              this.toastr.success(
                this.staticTranslation['ModuleAddedSuccessfully'],
                this.staticTranslation['Success'],
              );
              this.dialogRef.close({ action: 'confirm' });
            } else {
              this.toastr.error('try again later', 'Error');
            }
          },
          (error) => {
            if (error) {
              this.toastr.error('try again later', 'Error');
            }
          },
        ),
    );
    //}

    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
