import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HelpersService } from 'app/core/services/helpers.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { AddEditRequiredDocumentComponent } from '../../fin-client-prod-conf/view-fin-client-prod-conf/required-documents/add-edit-required-document/add-edit-required-document.component';

@Component({
  selector: 'app-add-edit-csl-req-doc',
  templateUrl: './add-edit-csl-req-doc.component.html',
  styleUrls: ['./add-edit-csl-req-doc.component.scss'],
})
export class AddEditCslReqDocComponent implements OnInit {
  RequiredDocumentData: any;
  RequiredDocumentForm: FormGroup;
  subscriptions: Subscription[] = [];
  staticTranslation: any;
  pageLoad: boolean = false;
  btnAction: string;
  requiredDoc: any[] = [];
  nationalityStatus: any[] = [];
  cslLovData: any[] = [];

  constructor(
    private toastr: ToastrService,
    private httpEndpointService: HttpEndpointService,
    private helpersService: HelpersService,
    private ithmaarPortalService: IthmaarPortalService,

    public dialogRef: MatDialogRef<AddEditRequiredDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public dataStatus: any,
    private fb: FormBuilder,

    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.callLovService();
  }

  checkStatus() {
    if (this.dataStatus.action == 'create') {
      this.createMainModuleForm();
      this.btnAction = 'Save';
    } else {
      this.RequiredDocumentData = this.dataStatus.row;
      this.ithmaarPortalService.log(
        'required docs data of row in case update ',
        this.dataStatus.row,
      );
      this.getMainModuleForm();
      this.btnAction = 'Update';
    }
  }

  callLovService() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('nationality-status/all')
        .subscribe((data: ApiResponse) => {
          this.nationalityStatus = data.payload;

          // required docs lov
          this.subscriptions.push(
            this.httpEndpointService
              .getAll('required-doc/all')
              .subscribe((data: ApiResponse) => {
                this.requiredDoc = data.payload;
              }),
          );

          // csl lov
          this.subscriptions.push(
            this.httpEndpointService
              .getAll('csl-lov/all')
              .subscribe((data: ApiResponse) => {
                this.cslLovData = data.payload;
                this.checkStatus();
              }),
          );
        }),
    );
  }

  createMainModuleForm() {
    this.RequiredDocumentForm = this.fb.group({
      fcprdKey: [''],
      wrdKey: ['', [Validators.required]],
      fcprdNationalityStatus: ['', [Validators.required]],
      cslKey: ['', [Validators.required]],
    });
    this.pageLoad = true;
  }

  getMainModuleForm() {
    this.btnAction = 'Update';
    let data = this.RequiredDocumentData;
    this.RequiredDocumentForm = this.fb.group({
      fcprdKey: [this.helpersService.getDotObject(data, 'fcprdKey', '')],
      wrdKey: [this.helpersService.getDotObject(data, 'wrdKey', '')],
      fcprdNationalityStatus: [
        this.helpersService.getDotObject(data, 'fcprdNationalityStatus', ''),
      ],
      cslKey: [this.helpersService.getDotObject(data, 'cslKey', '')],
    });
    this.pageLoad = true;
  }

  onSubmitRequiredDocument() {
    if (this.dataStatus.action === 'create') {
      this.addRequiredDocument();
    } else {
      this.editRequiredDocument();
    }
  }

  addRequiredDocument() {
    this.RequiredDocumentForm.value.fcpKey = this.dataStatus.row;
    if (this.RequiredDocumentForm.valid) {
      this.httpEndpointService
        .create(`csl-required-document/add`, this.RequiredDocumentForm.value)
        .subscribe((data: ApiResponse) => {
          if (data.success) {
            this.toastr.success(
              this.staticTranslation['confirmAddDocument'],
              this.staticTranslation['Success'],
            );
            this.dialogRef.close({ action: 'confirm' });
          }
        });
    }
  }

  editRequiredDocument() {
    this.httpEndpointService
      .update(
        `csl-required-document/update/${this.dataStatus.row.fcprdKey}`,
        this.RequiredDocumentForm.value,
      )
      .subscribe((res: ApiResponse) => {
        if (res.success) {
          this.toastr.success(
            this.staticTranslation['confirmUpdateDocument'],
            this.staticTranslation['Success'],
          );
          this.dialogRef.close({ action: 'confirm' });
        }
      });
  }
}
