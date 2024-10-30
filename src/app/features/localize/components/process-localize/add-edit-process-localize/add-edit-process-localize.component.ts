import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-add-edit-process-localize',
  templateUrl: './add-edit-process-localize.component.html',
  styleUrls: ['./add-edit-process-localize.component.scss'],
})
export class AddEditProcessLocalizeComponent implements OnInit {
  processData: any;
  processLocalizeForm: FormGroup;
  subscriptionList: Subscription[] = [];
  processNameData = [];
  languagesNamesData = [];
  params;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  btnAction: string;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditProcessLocalizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.checkStatus();
    this.callLovServices();
  }

  checkStatus() {
    if (this.data.status == 'create') {
      this.createProcessLocalizeForm();
    } else {
      this.processData = this.data.row;
      this.getProcessLocalizeForm();
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

  getProcessLocalizeForm() {
    this.btnAction = 'Update';
    this.processLocalizeForm = this.fb.group({
      langsKey: [this.processData.langsKey],
      prcLocalName: [
        { value: this.transferDataService.processName, disabled: true },
      ],
      prcKey: [this.processData.prcKey],
      plcDescription: [this.processData.plcDescription],
    });
  }

  createProcessLocalizeForm() {
    this.btnAction = 'save';
    this.processLocalizeForm = this.fb.group({
      langsKey: [''],
      prcLocalName: [
        { value: this.transferDataService.processName, disabled: true },
      ],
      prcKey: [this.data.prcKey],
      plcDescription: [''],
    });
  }

  resetForm() {
    this.processLocalizeForm.reset();
  }

  onSubmitProcessLocalize() {
    if (this.data.status == 'create') {
      this.addProcess();
    } else {
      this.editProcess();
    }
  }

  editProcess() {
    if (this.processLocalizeForm.valid) {
      this.subscriptionList.push(
        this.httpEndpointService
          .update(
            `process-localize/update/${this.processData.plcKey}`,
            this.processLocalizeForm.value,
          )
          .subscribe(
            (res: ApiResponse) => {
              this.isDisabled = true;
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['ProcessUpdatedSuccessfully'],
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

  addProcess() {
    this.httpEndpointService
      .create(`process-localize/add`, this.processLocalizeForm.value)
      .subscribe((res: ApiResponse) => {
        this.isDisabled = true;
        if (res.success) {
          this.toastr.success(
            this.staticTranslation['ProcessAddedSuccessfully'],
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
