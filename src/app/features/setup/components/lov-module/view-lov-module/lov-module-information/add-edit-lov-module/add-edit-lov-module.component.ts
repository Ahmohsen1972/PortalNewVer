import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-edit-lov-module',
  templateUrl: './add-edit-lov-module.component.html',
  styleUrls: ['./add-edit-lov-module.component.scss'],
})
export class AddEditLovModuleComponent implements OnInit {
  lovModuleData: any;
  lovModuleForm: FormGroup;
  subscriptions: Subscription[] = [];
  params;
  modNameData = [];
  modAttrData = [];
  lovData = [];
  dependentLov: boolean = false;
  @Input() status: string;
  @Input() row: any;
  staticTranslation: any;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  filteredModKey: number;
  btnAction: string;

  constructor(
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    public dialogRef: MatDialogRef<AddEditLovModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataStatus: any,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.checkStatus();
    this.callModuleLovServices();
  }

  checkStatus() {
    this.ithmaarPortalService.log('el status >>>', this.dataStatus);
    if (this.dataStatus.status == 'create') {
      this.createMainModuleForm();
      this.btnAction = 'save';
    } else {
      this.lovModuleData = this.row;
      this.getMainModuleForm();
      this.btnAction = 'update';
    }
  }

  callModuleLovServices() {
    this.subscriptions.push(
      this.httpEndpointService.getAll('module-lovs/all').subscribe((data) => {
        this.modNameData = data.payload;
        this.subscriptions.push(
          this.httpEndpointService
            .getAll('lov-admin/all')
            .subscribe((data) => (this.lovData = data.payload)),
        );
        if (this.dataStatus.action == 'Edit') {
          this.subscriptions.push(
            this.httpEndpointService
              .getAll(
                `module-att-lovs/all-flex-field/${'D'}/${this.lovModuleData.modKey}`,
              )
              .subscribe((data) => {
                this.modAttrData = data.payload;
                this.dependentLov = true;
              }),
          );
        }
        this.pageLoad = true;
      }),
    );
  }

  getModKey(modKey) {
    this.dependentLov = false;
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`module-att-lovs/all-flex-field/${'D'}/${modKey}`)
        .subscribe((data) => {
          this.ithmaarPortalService.log('matt lov ', data.payload);

          this.modAttrData = data.payload;
          this.dependentLov = true;
        }),
    );

    // this.newDependentLov=true
  }

  getMainModuleForm() {
    this.dependentLov = true;
    this.createMainModuleForm();
    this.lovModuleForm.patchValue({
      modKey: this.lovModuleData.modKey,
      maKey: this.lovModuleData.maKey,
      ilmAddedWhereCond: this.lovModuleData.ilmAddedWhereCond,
      sysKey: 1,
      versionNo: this.lovModuleData.versionNo,
    });
  }

  createMainModuleForm() {
    this.lovModuleForm = new FormGroup({
      modKey: new FormControl(''),
      lovKey: new FormControl({
        value: '',
        disabled: this.dataStatus.action == 'Edit',
      }),
      maKey: new FormControl(''),
      ilmAddedWhereCond: new FormControl(),
      sysKey: new FormControl(1),
    });
  }

  resetForm() {
    this.lovModuleForm.reset();
  }

  onSubmitModuleInfo() {
    if (this.dataStatus.status == 'create') {
      this.addLovModuleInfo();
    } else {
      this.editLovModuleInfo();
    }
  }

  editLovModuleInfo() {
    if (this.lovModuleForm.valid) {
      this.subscriptions.push(
        this.httpEndpointService
          .update(
            `lov-modules/update/${this.row.ilmKey}`,
            this.lovModuleForm.value,
          )
          .subscribe(
            (res: ApiResponse) => {
              this.isDisabled = true;
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation[
                    'ListOfValueModuleUpdatedSuccessfully'
                  ],
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

  addLovModuleInfo() {
    if (this.lovModuleForm.valid) {
      this.ithmaarPortalService.log(
        'el data bt3 elform ',
        this.lovModuleForm.value,
      );
      this.subscriptions.push(
        this.httpEndpointService
          .create('lov-modules/add', this.lovModuleForm.value)
          .subscribe(
            (res: ApiResponse) => {
              this.isDisabled = true;
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['ListOfValueModuleAddedSuccessfully'],
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
