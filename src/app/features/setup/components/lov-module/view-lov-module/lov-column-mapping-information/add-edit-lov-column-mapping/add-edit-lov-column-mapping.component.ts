import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HelpersService } from 'app/core/services/helpers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-edit-lov-column-mapping',
  templateUrl: './add-edit-lov-column-mapping.component.html',
  styleUrls: ['./add-edit-lov-column-mapping.component.scss'],
})
export class AddEditLovColumnMappingComponent implements OnInit, OnDestroy {
  lovColumnForm: FormGroup;
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
    private ithmaarPortalService: IthmaarPortalService,
    public dialogRef: MatDialogRef<AddEditLovColumnMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.getLovColumnForm();
    this.getMappedModAttData();
  }

  getMappedModAttData() {
    this.subscriptions.push(
      this.httpEndPoint
        .getAll(`module-att-lovs/all/${this.data.row.modKey}`)
        .subscribe((data) => {
          this.mappedModAttData = data.payload;
          this.ithmaarPortalService.log(
            'eldata bta3 el lov column mapping  lov  ',
            this.mappedModAttData,
          );
          this.pageLoad = true;
        }),
    );
  }

  getLovColumnForm() {
    let data = this.data.row;
    this.ithmaarPortalService.log('eldata bta3 el lov column mapping ', data);
    this.btnAction = 'Update';
    this.selectedOperation = 'Update';
    this.lovColumnForm = this.fb.group({
      lvcColumnName: [{ value: data.lvcColumnName, disabled: true }],
      mappedMaKey: [this.helpersService.getDotObject(data, 'mappedMaKey', '')],
      sysKey: [1],
      versionNo: [this.helpersService.getDotObject(data, 'versionNo', '')],
    });
  }

  onSubmit() {
    if (this.lovColumnForm.valid) {
      this.editLovColumn();
    }
  }

  editLovColumn() {
    this.subscriptions.push(
      this.httpEndPoint
        .update(
          `column-mapping-admin/update/${this.data.row.lriKey}`,
          this.lovColumnForm.value,
        )
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.isDisabled = true;
            this.toastr.success(
              this.staticTranslation['ListOfValueColumnUpdatedSuccessfully'],
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
