import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-add-edit-module-info',
  templateUrl: './add-edit-module-info.component.html',
  styleUrls: ['./add-edit-module-info.component.scss'],
})
export class AddEditModuleInfoComponent implements OnInit {
  moduleData: any;
  moduleForm: FormGroup;
  subscriptions: Subscription[] = [];
  params;
  modNameData = [];
  mainModLocalnameData = [];
  subModuleData = [];
  roleNameData = [];
  asOfData = [];
  processNameData = [];
  dependentLov: boolean = false;
  newDependentLov: boolean = false;
  userType: number;
  moduleType: string;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  filteredModKey: number;
  updateDisabled: boolean = false;
  staticTranslation: any;

  constructor(
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    public dialogRef: MatDialogRef<AddEditModuleInfoComponent>,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.checkIsUpdatable();
    this.getMainModuleForm();
    this.callLovServices();
  }

  checkIsUpdatable() {
    this.moduleData = this.row;
    this.ithmaarPortalService.log('el row ', this.row);
    if (this.moduleData.masKeyAsOf != null) {
      this.updateDisabled = true;
      this.localStorageService.setItem('updateDisabled', true);
    } else {
      this.updateDisabled = false;
      this.localStorageService.setItem('updateDisabled', false);
      this.pageLoad = true;
    }
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

          this.subscriptions.push(
            this.httpEndpointService
              .getAll(`module-localize/all/${this.row.modKeyParent}`)
              .subscribe((data: ApiResponse) => {
                this.ithmaarPortalService.log('el data bta3 elmodule ', data);
                this.subModuleData = data.payload;
                this.ithmaarPortalService.log(
                  'subModuleData  ',
                  this.subModuleData,
                );

                let asOfParams = [{ modKey: this.row.modKey }];
                this.subscriptions.push(
                  this.httpEndpointService
                    .getBy('mod-setup/mas-lov', asOfParams, 'path')
                    .subscribe((data) => {
                      this.asOfData = data.payload;
                      this.ithmaarPortalService.log(
                        'as of list > ',
                        this.asOfData,
                      );

                      this.params = [{ lovKey: 32 }, { ilmKey: 90 }];
                      this.subscriptions.push(
                        this.httpEndpointService
                          .getBy('lov/fetch', this.params, 'path')
                          .subscribe((data: ApiResponse) => {
                            this.processNameData = data.payload.data;

                            this.pageLoad = true;
                          }),
                      ); //brackets for processNameData
                    }),
                ); //brackets for asOfData
              }),
          ); // brackets for subModuleData
        }),
    ); // brackets for mainModuleData
  }

  getModKey(modKey) {
    this.dependentLov = false;
    let asOfParams = [{ modKey: modKey }];
    this.ithmaarPortalService.log('asOfParams  ', asOfParams);
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('mod-setup/mas-lov', asOfParams, 'path')
        .subscribe((data) => {
          this.asOfData = data.payload;
          this.ithmaarPortalService.log('as of list > ', this.asOfData);
          this.dependentLov = true;
          // this.newDependentLov=true
        }),
    );
  }

  getMainModuleForm() {
    this.userType = this.sessionStorageService.getItem('userType');
    this.moduleType = this.sessionStorageService.getItem('moduleType');
    this.dependentLov = true;
    this.createMainModuleForm();
    this.moduleForm.patchValue({
      masCode: this.moduleData.masCode,
      modKey: this.moduleData.modKey,
      modKeyParent: this.moduleData.modKeyParent,
      rolKey: this.moduleData.rolKey,
      prcKey: this.moduleData.prcKey,
      masKeyAsOf: this.moduleData.masKeyAsOf,
      sysKey: 1,
    });
  }

  createMainModuleForm() {
    this.moduleForm = new FormGroup({
      masCode: new FormControl({ value: '', disabled: true }),

      modKey: new FormControl({ value: '' }),

      modKeyParent: new FormControl({ value: '' }),

      rolKey: new FormControl({ value: +this.userType, disabled: true }),

      prcKey: new FormControl(),

      masKeyAsOf: new FormControl({ value: '' }),

      sysKey: new FormControl({ value: 1 }),
    });
  }

  resetForm() {
    this.moduleForm.reset();
  }

  onSubmitModuleInfo() {
    this.editModuleInfo();
  }

  editModuleInfo() {
    if (this.moduleForm.valid) {
      this.ithmaarPortalService.log(
        'el data bt3 el module setup update ',
        this.moduleForm.value,
      );
      this.subscriptions.push(
        this.httpEndpointService
          .update(`mod-setup/update/${this.row.masKey}`, this.moduleForm.value)
          .subscribe(
            (res: ApiResponse) => {
              this.isDisabled = true;
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['ModuleUpdatedSuccessfully'],
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
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
