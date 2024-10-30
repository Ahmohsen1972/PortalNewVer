import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-edit-module-localize',
  templateUrl: './edit-module-localize.component.html',
  styleUrls: ['./edit-module-localize.component.scss'],
})
export class EditModuleLocalizeComponent implements OnInit, OnDestroy {
  moduleLocalizeData: any;
  moduleLocalizeForm;
  subscriptions: Subscription[] = [];
  params;
  modNameData = [];
  mainModLocalnameData = [];
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  get modKey() {
    return this.moduleLocalizeForm.get('modKey');
  }

  get parentModKey() {
    return this.moduleLocalizeForm.get('parentModKey');
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    public dialogRef: MatDialogRef<EditModuleLocalizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getModuleLocalizeForm();
  }

  getModuleLocalizeForm() {
    this.moduleLocalizeData = this.data.row;
    this.moduleLocalizeForm = this.fb.group({
      parentModuleLocalName: [this.moduleLocalizeData.parentModuleLocalName],
      moduleLocalName: [this.moduleLocalizeData.moduleLocalName],
      mlCaption: [this.moduleLocalizeData.mlCaption],
      langShortName: [this.moduleLocalizeData.langShortName],
      mainLangKey: [this.moduleLocalizeData.mainLangKey],
      modKey: [this.moduleLocalizeData.modKey],
      parentModKey: [this.moduleLocalizeData.parentModKey],
    });
    this.moduleLocalizeForm.get('parentModuleLocalName').disable();
    this.moduleLocalizeForm.get('moduleLocalName').disable();
    this.moduleLocalizeForm.get('langShortName').disable();
    this.pageLoad = true;
  }

  resetForm() {
    this.moduleLocalizeForm.reset();
  }

  onSubmitAttributeDetails() {
    this.editAttributeDetailsInfo();
  }

  editAttributeDetailsInfo() {
    if (this.moduleLocalizeForm.valid) {
      this.subscriptions.push(
        this.httpEndpointService
          .update(
            `module-localize/update/${this.data.row.mlKey}`,
            this.moduleLocalizeForm.value,
          )
          .subscribe(
            (res: ApiResponse) => {
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['ModuleLocalizeUpdatedSuccessfully'],
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

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(
          `module-localize/all/${this.moduleLocalizeData.parentModKey}${'/'}${this.moduleLocalizeData.modKey}`,
        )
        .subscribe((result: ApiResponse) => {
          if (result.success) {
            const rows = [];
            rows.push(result.payload);
            this.data.row = rows;
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
