import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-edit-ass-att-mapping-code',
  templateUrl: './edit-ass-att-mapping-code.component.html',
  styleUrls: ['./edit-ass-att-mapping-code.component.scss'],
})
export class EditAssAttMappingCodeComponent implements OnInit {
  defaultValueObj: any;
  action: string;
  actionBtn: string;
  private subscriptions: Subscription[] = [];
  financeConceptData = [];
  AssAttMappCodeForm: FormGroup;
  rowId: number;
  row: any;
  probertyData: any;
  params: any;
  pageLoad: boolean = false;
  isDisabled = false;
  languagesNamesData;
  btnAction;
  subscriptionList: Subscription[] = [];
  staticData: any;
  staticTranslation: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAssAttMappingCodeComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.checkStatus();
  }

  checkStatus() {
    if (this.data.status == 'create') {
      this.createAssAttMappCodeForm();
    } else {
      this.staticData = this.data.row;
      this.getAssAttMappCodeForm();
    }
  }

  createAssAttMappCodeForm() {
    this.btnAction = 'Save';
    this.AssAttMappCodeForm = this.fb.group({
      rowkey: [],
      acaDisplayOrder: [],
      acaIntegrationCode: [],
      atributeName: [],
      assetClassName: [],
    });
    this.pageLoad = true;
  }

  getAssAttMappCodeForm() {
    this.ithmaarPortalService.log('1', this.data);

    this.btnAction = 'Update';
    this.AssAttMappCodeForm = this.fb.group({
      rowkey: [this.staticData.rowkey],
      acaKey: [this.staticData.acaKey],
      acaIntegrationCode: [this.staticData.acaIntegrationCode],
      atributeName: [{ value: this.staticData.atributeName, disabled: true }],
      assetClassName: [
        { value: this.staticData.assetClassName, disabled: true },
      ],
      acaDisplayOrder: [
        { value: this.staticData.acaDisplayOrder, disabled: true },
      ],
    });
    this.pageLoad = true;
  }
  onSubmit() {
    this.ithmaarPortalService.log('valid', this.AssAttMappCodeForm.value);

    if (this.data.action == 'Edit') {
      if (this.AssAttMappCodeForm.valid) {
        this.AssAttMappCodeForm.value.atributeName =
          this.staticData.atributeName;
        this.AssAttMappCodeForm.value.acaDisplayOrder =
          this.staticData.acaDisplayOrder;
        this.AssAttMappCodeForm.value.assetClassName =
          this.staticData.assetClassName;
        this.ithmaarPortalService.log('valid', this.AssAttMappCodeForm.value);

        this.subscriptions.push(
          this.httpEndpointService
            .update(
              'ass-att-mapp/update/' + this.staticData.rowkey,
              this.AssAttMappCodeForm.value,
            )
            .subscribe(
              (data: ApiResponse) => {
                if (data.success) {
                  this.toastr.success(
                    this.staticTranslation['UpdatedTranslationSuccessfully'],
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
      }
    } else {
      if (this.AssAttMappCodeForm.valid) {
        this.ithmaarPortalService.log('valid');
        this.subscriptions.push(
          this.httpEndpointService
            .create('ass-att-mapp/add', this.AssAttMappCodeForm.value)
            .subscribe(
              (data: ApiResponse) => {
                if (data.success) {
                  this.toastr.success(
                    this.staticTranslation['TranslationAddedSuccessfully'],
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
    // this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
