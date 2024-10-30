import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from 'app/core/services/helpers.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-edit-finance-module',
  templateUrl: './add-edit-finance-module.component.html',
  styleUrls: ['./add-edit-finance-module.component.scss'],
})
export class AddEditFinanceModuleComponent implements OnInit {
  //RequiredDocumentData: any;
  ModulesForm: FormGroup;
  subscriptions: Subscription[] = [];
  params;

  lovData = [];
  dependentLov: boolean = false;
  ModuleData;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  filteredModKey: number;
  btnAction: string;
  roles: any;
  modules: any;
  modKeyRoot;
  public rolesFilteredOptions: Observable<any[]>;
  public modulesFilteredOptions: Observable<any[]>;
  modKey;
  role;
  staticTranslation: any;

  constructor(
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private helpersService: HelpersService,

    public dialogRef: MatDialogRef<AddEditFinanceModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataStatus: any,
    private ithmaarPortalService: IthmaarPortalService,
    private fb: FormBuilder,

    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.checkStatus();
    this.getRole();

    //  this.callModuleLovServices()
  }
  getRole() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('infra-roles/all')
        .subscribe((data: ApiResponse) => {
          this.roles = data.payload;
          this.ithmaarPortalService.log('this.roles ', this.roles);

          //  this.rolesFilterOptions();
        }),
    );
  }

  getModKey(rolKey) {
    this.ithmaarPortalService.log('this.rolKey ', rolKey);

    this.dependentLov = false;
    if (rolKey == 2) {
      this.subscriptions.push(
        this.httpEndpointService
          .getAll(`modules-with-roots/modules/${8}`)
          .subscribe((data: ApiResponse) => {
            this.modules = data.payload;
            this.ithmaarPortalService.log('this.module ', this.modules);
            this.dependentLov = true;
            this.moduleFilterOptions();
          }),
      );
    } else {
      this.subscriptions.push(
        this.httpEndpointService
          .getAll(`modules-with-roots/modules/${9}`)
          .subscribe((data: ApiResponse) => {
            this.modules = data.payload;
            this.ithmaarPortalService.log('this.module ', this.modules);
            this.dependentLov = true;
            this.moduleFilterOptions();
          }),
      );
    }
  }

  checkStatus() {
    this.ithmaarPortalService.log('this.clientsData ', this.dataStatus);

    if (this.dataStatus.action == 'create') {
      this.createMainModuleForm();
      this.btnAction = 'Save';
    } else {
      this.ModuleData = this.dataStatus.row;
      this.getModKey(this.dataStatus.row.rolKey);
      this.getMainModuleForm();
      this.btnAction = 'Update';
    }
  }
  createMainModuleForm() {
    this.ModulesForm = this.fb.group({
      modKey: [''],
      rolKey: ['', [Validators.required]],
      modLocalName: ['', [Validators.required]],
      rolLocalName: [''],
      fcpKey: [''],
    });
    this.pageLoad = true;
  }

  getMainModuleForm() {
    this.btnAction = 'Update';
    let data = this.ModuleData;
    this.ModulesForm = this.fb.group({
      rolKey: [this.helpersService.getDotObject(data, 'rolKey', '')],
      modKey: [this.helpersService.getDotObject(data, 'modKey', '')],
      modLocalName: [
        this.helpersService.getDotObject(data, 'modLocalName', ''),
      ],
      rolLocalName: [
        this.helpersService.getDotObject(data, 'rolLocalName', ''),
      ],
      fcpKey: [this.helpersService.getDotObject(data, 'fcpKey', '')],
    });
    this.pageLoad = true;
  }

  //   rolesFilterOptions() {
  //     this.rolesFilteredOptions = this.ModulesForm?.get('rolLocalName').valueChanges.pipe(
  //       startWith(''),
  //       map((value) => this.roles_filter(value))
  //     );

  //   }
  //   private roles_filter(value: string): string[] {

  //     const filterValue = value.toLowerCase();
  //     return this.roles.filter(
  //       //clentLocalName
  //       (option) => option.rolLocalName.toLowerCase().indexOf(filterValue) === 0
  //     );
  //   }

  //   onRoleSelection(module) {
  // this.ithmaarPortalService.log("rol ",module.option)
  //     this.roles.filter(
  //       value => {

  //         if (value.rolLocalName === module.option.value) {

  //           this.role=value.rolKey
  //           this.ModulesForm.value.rolKey=value.rolKey
  //           this.moduleFilterOptions();
  //         }
  //       })

  //   }

  moduleFilterOptions() {
    this.modulesFilteredOptions = this.ModulesForm?.get(
      'modLocalName',
    ).valueChanges.pipe(
      startWith(''),
      map((value) => this.module_filter(value)),
    );
  }
  private module_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.modules.filter(
      //clentLocalName
      (option) => option.modLocalName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  onModuleSelection(module) {
    this.ithmaarPortalService.log('modKey ', module.option);
    this.modules.filter((value) => {
      if (value.modLocalName === module.option.value) {
        this.modKey = value.modKey;

        this.ModulesForm.value.modKey = value.modKey;
        // this.rolesFilterOptions();
      }
    });
  }

  onSubmitRequiredDocument() {
    // this.assetAttForm.value.acaRequired = this.checked ? 'T':'F';
    if (this.dataStatus.action === 'create') {
      this.addModule();
    } else {
      this.editModule();
    }
  }
  addModule() {
    this.ModulesForm.value.modKey = this.modKey;
    //   this.ModulesForm.value.rolKey=this.role
    this.ModulesForm.value.fcpKey = this.dataStatus.row;

    if (this.ModulesForm.valid) {
      this.httpEndpointService
        .create(`fcp-modules/add`, this.ModulesForm.value)
        .subscribe(
          (data: ApiResponse) => {
            if (data.success) {
              data.payload.wppKey;
              this.toastr.success(
                this.staticTranslation['AddedAssetAttributeSuccessfully'],
                this.staticTranslation['Success'],
              );

              this.dialogRef.close({ action: 'confirm' });
            }
          },
          (err) => {},
        );
    }
  }
  editModule() {
    //  this.RequiredDocumentForm.value.modifiedClientKey=this.clntKey
    this.ModulesForm.value.modKey = this.modKey;
    //  this.ModulesForm.value.rolKey=this.role

    this.httpEndpointService
      .update(
        `fcp-modules/update/${this.dataStatus.row.fcpmKey}`,
        this.ModulesForm.value,
      )
      .subscribe((res: ApiResponse) => {
        if (res.success) {
          this.toastr.success(
            this.staticTranslation['FinanceProductUpdatedSuccessfully'],
            this.staticTranslation['Success'],
          );
          this.dialogRef.close({ action: 'confirm' });
        }
      });
  }
}
