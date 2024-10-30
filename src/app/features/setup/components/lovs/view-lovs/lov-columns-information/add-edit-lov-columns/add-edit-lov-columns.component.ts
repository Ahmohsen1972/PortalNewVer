import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HelpersService } from 'app/core/services/helpers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
@Component({
  selector: 'app-add-edit-lov-columns',
  templateUrl: './add-edit-lov-columns.component.html',
  styleUrls: ['./add-edit-lov-columns.component.scss'],
})
export class AddEditLovColumnsComponent implements OnInit {
  lovColumnForm: FormGroup;
  checked = false;
  subscriptions: Subscription[] = [];
  mappedModAttData = [];
  isDisabled = false;
  btnAction: string;
  selectedOperation: string;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helpersService: HelpersService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditLovColumnsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    if (this.data.action === 'create') {
      this.createLovColumnForm();
    } else {
      this.getLovColumnForm();
    }
  }

  getMappedModAttData() {
    this.subscriptions.push(
      this.httpEndPoint
        .getAll(`module-att-lovs/all/${this.data.row.modKey}`)
        .subscribe((data) => (this.mappedModAttData = data.payload)),
    );
  }

  createLovColumnForm() {
    this.btnAction = 'Save';
    this.selectedOperation = 'Add New';
    this.lovColumnForm = this.fb.group({
      lvcColumnName: [''],
      lvcColNumberInSelect: [''],
      mappedMaKey: [''],
    });
  }

  getLovColumnForm() {
    let data = this.data.row;
    this.btnAction = 'Update';
    this.selectedOperation = 'Update';
    this.lovColumnForm = this.fb.group({
      lvcColumnName: [{ value: data.lvcColumnName, disabled: true }],
      lvcColNumberInSelect: [
        this.helpersService.getDotObject(data, 'lvcColNumberInSelect', ''),
      ],
      mappedMaKey: [this.helpersService.getDotObject(data, 'mappedMaKey', '')],
    });
  }

  onSubmit() {
    if (this.lovColumnForm.valid) {
      if (this.data.action === 'create') {
        this.addLovColumn();
      } else {
        this.editLovColumn();
      }
    }
  }

  editLovColumn() {
    this.subscriptions.push(
      this.httpEndPoint
        .update(
          `lov-columns-admin/update/${this.data.row.lriKey}`,
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

  addLovColumn() {
    this.subscriptions.push(
      this.httpEndPoint
        .create('lov-columns-admin/add', this.lovColumnForm.value)
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.isDisabled = true;
            this.toastr.success(
              this.staticTranslation['ListOfValueColumnAddedSuccessfully'],
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
