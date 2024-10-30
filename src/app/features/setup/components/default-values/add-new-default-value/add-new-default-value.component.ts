import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-add-new-default-value',
  templateUrl: './add-new-default-value.component.html',
  styleUrls: ['./add-new-default-value.component.scss'],
})
export class AddNewDefaultValueComponent implements OnInit, OnDestroy {
  defaultValueObj: any;
  action: string;
  actionBtn: string;
  private subscriptions: Subscription[] = [];
  financeConceptData = [];
  defaultValueForm: FormGroup;
  rowId: number;
  row: any;
  probertyData: any;
  params: any;
  pageLoad: boolean = false;
  isDisabled = false;
  staticTranslation: any;

  constructor(
    private toastr: ToastrService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) private recievedData: any,
    private dialogRef: MatDialogRef<AddNewDefaultValueComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getfinanceConceptLovData();
    this.createDefaultValueForm();
    this.updateDefaultValueForm();
  }

  getfinanceConceptLovData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('finance-concept-lov/all')
        .subscribe((data) => {
          this.financeConceptData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  createDefaultValueForm() {
    this.defaultValueForm = new FormGroup({
      rovsFinanceConcept: new FormControl({ value: '' }),

      rovsProfitRate: new FormControl({ value: ' ' }),

      rovsDownPaymentPercentage: new FormControl({ value: '' }),

      rovsGraceDays: new FormControl({ value: '' }),

      rovsTenure: new FormControl({ value: '' }),

      clntKey: new FormControl(1),
    });
  }

  updateDefaultValueForm() {
    this.row = this.recievedData.row;
    if (this.row) {
      this.rowId = this.recievedData.row.rovsKey;

      this.action = 'btn.Update';
      this.actionBtn = 'Update';
      let params = [{ id: this.rowId }];
      this.subscriptions.push(
        this.httpEndpointService
          .getBy('default-values-setup', params, 'path')
          .subscribe((data: ApiResponse) => {
            this.defaultValueObj = data.payload;
            this.defaultValueForm
              .get('rovsFinanceConcept')
              .setValue(this.defaultValueObj.rovsFinanceConcept);
            this.defaultValueForm
              .get('rovsProfitRate')
              .setValue(this.defaultValueObj.rovsProfitRate);
            this.defaultValueForm
              .get('rovsDownPaymentPercentage')
              .setValue(this.defaultValueObj.rovsDownPaymentPercentage);
            this.defaultValueForm
              .get('rovsGraceDays')
              .setValue(this.defaultValueObj.rovsGraceDays);
            this.defaultValueForm
              .get('rovsTenure')
              .setValue(this.defaultValueObj.rovsTenure);
            this.defaultValueForm.get('clntKey').setValue(1);
          }),
      );
    } else {
      this.defaultValueForm.get('rovsFinanceConcept').setValue('');
      this.defaultValueForm.get('rovsProfitRate').setValue('');
      this.defaultValueForm.get('rovsDownPaymentPercentage').setValue('');
      this.defaultValueForm.get('rovsGraceDays').setValue('');
      this.defaultValueForm.get('rovsTenure').setValue('');
      this.defaultValueForm.get('clntKey').setValue(1);
      this.action = 'btn.Add';
      this.actionBtn = 'Save';
    }
  }

  onSubmit() {
    if (this.rowId) {
      this.subscriptions.push(
        this.httpEndpointService
          .update(
            'default-values-setup/update/' + this.defaultValueObj.rovsKey,
            this.defaultValueForm.value,
          )
          .subscribe(
            (data: ApiResponse) => {
              if (data.success) {
                this.toastr.success(
                  this.staticTranslation['DefaultValueUpdatedSuccessfully'],
                  this.staticTranslation['Success'],
                );
                this.isDisabled = true;
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
      this.close();
    } else {
      this.subscriptions.push(
        this.httpEndpointService
          .create('default-values-setup/add', this.defaultValueForm.value)
          .subscribe(
            (data: ApiResponse) => {
              if (data.success) {
                this.toastr.success(
                  this.staticTranslation['DefaultValueAddedSuccessfully'],
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
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
