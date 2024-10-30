import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-add-edit-action-localize',
  templateUrl: './add-edit-action-localize.component.html',
  styleUrls: ['./add-edit-action-localize.component.scss'],
})
export class AddEditActionLocalizeComponent implements OnInit {
  languagesNamesData: string[];
  actionData: any;
  processActionLocalizeForm: FormGroup;
  subscriptionList: Subscription[] = [];
  params: any;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: string[];
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  btnAction: string;
  staticTranslation: string[];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditActionLocalizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    if (this.data.status === 'create') {
      this.createProcessActionLocalizeForm();
      this.callLovServices();
    } else {
      this.actionData = this.data.row;
      this.getProcessActionLocalizeForm();
      this.callLovServices();
    }
  }

  callLovServices() {
    this.subscriptionList.push(
      this.httpEndpointService.getAll('languages/all').subscribe((data) => {
        this.languagesNamesData = data.payload;
        this.pageLoad = true;
      }),
    );
  }

  getProcessActionLocalizeForm() {
    this.btnAction = 'Update';
    this.processActionLocalizeForm = this.fb.group({
      langsKey: [this.actionData.langsKey],
      acDescription: [this.actionData.acDescription],
      ipaLocalName: [
        { value: this.transferDataService.processActionName, disabled: true },
      ],
      ipaKey: [this.actionData.ipaKey],
    });
    this.processActionLocalizeForm.get('langsKey').disable();
  }

  createProcessActionLocalizeForm() {
    this.pageLoad = true;
    this.btnAction = 'Save';
    this.processActionLocalizeForm = this.fb.group({
      langsKey: [''],
      acDescription: [''],
      ipaLocalName: [
        { value: this.transferDataService.processActionName, disabled: true },
      ],
      ipaKey: [this.data.ipaKey],
    });
  }

  resetForm() {
    this.processActionLocalizeForm.reset();
  }

  onSubmitProcessActionLocalize() {
    if (this.data.status === 'create') {
      this.addAction();
    } else {
      this.editAction();
    }
  }

  editAction() {
    if (this.processActionLocalizeForm.valid) {
      this.subscriptionList.push(
        this.httpEndpointService
          .update(
            `action-localize/update/${this.actionData.acKey}`,
            this.processActionLocalizeForm.value,
          )
          .subscribe(
            (res: ApiResponse) => {
              this.isDisabled = true;
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['ActionUpdatedSuccessfully'],
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

  addAction() {
    this.httpEndpointService
      .create(`action-localize/add`, this.processActionLocalizeForm.value)
      .subscribe((res: ApiResponse) => {
        this.isDisabled = true;
        if (res.success) {
          this.toastr.success(
            this.staticTranslation['ActionAddedSuccessfully'],
            this.staticTranslation['Success'],
          );
          this.dialogRef.close({ action: 'confirm' });
        }
      });
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
