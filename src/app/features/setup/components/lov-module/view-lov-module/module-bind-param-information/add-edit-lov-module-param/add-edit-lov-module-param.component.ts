import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HelpersService } from 'app/core/services/helpers.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-add-edit-lov-module-param',
  templateUrl: './add-edit-lov-module-param.component.html',
  styleUrls: ['./add-edit-lov-module-param.component.scss'],
})
export class AddEditLovModuleParamComponent implements OnInit, OnDestroy {
  moduleBindParamForm: FormGroup;
  checked = false;
  subscriptions: Subscription[] = [];
  mappedModAttData = [];
  isDisabled = false;
  btnAction: string;
  selectedOperation: string;
  pageLoad: boolean = false;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helpersService: HelpersService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditLovModuleParamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.getModuleBindParamForm();
    this.getMappedModAttData();
  }

  getMappedModAttData() {
    this.subscriptions.push(
      this.httpEndPoint.getAll(`module-att-lovs/all/`).subscribe((data) => {
        this.mappedModAttData = data.payload;
        this.ithmaarPortalService.log(
          'eldata bta3 el lov column mapping  lov  ',
          this.mappedModAttData,
        );
        this.pageLoad = true;
      }),
    );
  }

  getModuleBindParamForm() {
    let data = this.data.row;
    this.ithmaarPortalService.log('eldata bta3 el lov column mapping ', data);
    this.btnAction = 'Update';
    this.selectedOperation = 'Update';
    this.moduleBindParamForm = this.fb.group({
      maKey: [this.helpersService.getDotObject(data, 'maKey', '')],
      lmbpOrder: [this.helpersService.getDotObject(data, 'lmbpOrder', '')],
    });
  }

  onSubmit() {
    if (this.moduleBindParamForm.valid) {
      this.editModuleBindParam();
    }
  }

  editModuleBindParam() {
    this.subscriptions.push(
      this.httpEndPoint
        .update(
          `lov-mod-bind-param/update/${this.data.row.lmbpKey}`,
          this.moduleBindParamForm.value,
        )
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.isDisabled = true;
            this.toastr.success(
              this.staticTranslation['ModuleBindParamUpdatedSuccessfully'],
              this.staticTranslation['Success'],
            );
            this.dialogRef.close({ action: 'confirm' });
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
