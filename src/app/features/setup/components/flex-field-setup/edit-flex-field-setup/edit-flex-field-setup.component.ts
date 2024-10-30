import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-edit-flex-field-setup',
  templateUrl: './edit-flex-field-setup.component.html',
  styleUrls: ['./edit-flex-field-setup.component.scss'],
})
export class EditFlexFieldSetupComponent implements OnInit, OnDestroy {
  trueAndFalseData = [
    { label: 'True', value: 'T' },
    { label: 'False', value: 'F' },
  ];
  controlTypeData = [
    { label: 'Text Field', value: 'TF' },
    { label: 'Drop Down List', value: 'D' },
  ];
  dataTypeData = [
    { label: 'Date', value: 'Z' },
    { label: 'Text', value: 'C' },
    { label: 'Number', value: 'N' },
  ];
  flexFieldData: any;
  flexFieldSetupForm: FormGroup;
  subscriptionList: Subscription[] = [];
  params;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<EditFlexFieldSetupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.getFlexFieldSetupForm();
  }

  getFlexFieldSetupForm() {
    this.flexFieldData = this.data.row;
    this.flexFieldSetupForm = this.fb.group({
      modKey: [this.flexFieldData.modKey],
      modLocalName: [this.flexFieldData.modLocalName],
      maKey: [this.flexFieldData.maKey],
      maLocalName: [this.flexFieldData.maLocalName],
      maSourceType: [
        this.flexFieldData.maSourceType == ''
          ? 'TF'
          : this.flexFieldData.maSourceType,
      ],
      maDataType: [
        this.flexFieldData.maDataType == ''
          ? 'C'
          : this.flexFieldData.maDataType,
      ],
      maEnabled: [this.flexFieldData.maEnabled],
      maVisible: [this.flexFieldData.maVisible],
      maRequired: [this.flexFieldData.maRequired],
    });
    this.flexFieldSetupForm.get('modLocalName').disable();
    this.pageLoad = true;
  }

  resetForm() {
    this.flexFieldSetupForm.reset();
  }

  onSubmit() {
    if (this.flexFieldSetupForm.valid) {
      this.subscriptionList.push(
        this.httpEndpointService
          .update(
            `flex-field-setup/update/${this.flexFieldData.maKey}`,
            this.flexFieldSetupForm.value,
          )
          .subscribe(
            (res: ApiResponse) => {
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['FlexFieldUpdatedSuccessfully'],
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
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
