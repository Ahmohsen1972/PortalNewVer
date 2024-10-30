import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from 'app/core/services/helpers.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-edit-required-document',
  templateUrl: './add-edit-required-document.component.html',
  styleUrls: ['./add-edit-required-document.component.scss'],
})
export class AddEditRequiredDocumentComponent implements OnInit {
  RequiredDocumentData: any;
  RequiredDocumentForm: FormGroup;
  subscriptions: Subscription[] = [];
  params;
  modNameData = [];
  modAttrData = [];
  lovData = [];
  dependentLov: boolean = false;
  staticTranslation: any;
  wrdKey;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  isDisabledUserLevel: boolean = false;
  filteredModKey: number;
  btnAction: string;
  requiredDoc;
  documentPurpose;
  public requiredDocFilteredOptions: Observable<any[]>;
  public documentPurposeFilteredOptions: Observable<any[]>;
  requiredOrginality;
  nationalityStatus;

  constructor(
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
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
    this.checkStatus();
  }

  checkStatus() {
    if (this.dataStatus.action == 'create') {
      this.createMainModuleForm();
      this.btnAction = 'Save';
    } else {
      this.RequiredDocumentData = this.dataStatus.row;

      this.getMainModuleForm();
      this.btnAction = 'Update';
    }
  }
  getRequiredDoc() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('required-doc/all')
        .subscribe((data: ApiResponse) => {
          this.requiredDoc = data.payload;
        }),
    );
  }

  handleDynamicLov(gender: any) {
    if (gender.wrdIsForBp == 'T') this.isDisabledUserLevel = true;
    else this.isDisabledUserLevel = false;
  }

  getNationalityStatus() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('nationality-status/all')
        .subscribe((data: ApiResponse) => {
          this.nationalityStatus = data.payload;
          //this.ithmaarPortalService.log("this.nationalityStatus ",this.nationalityStatus)
        }),
    );
  }

  getRequiredOrginality() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('originality-typed/all')
        .subscribe((data: ApiResponse) => {
          this.requiredOrginality = data.payload;
          //this.ithmaarPortalService.log("this.requiredOrginality ",this.requiredOrginality)
        }),
    );
  }

  getDocumentPurpose() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('document-purpose/all')
        .subscribe((data: ApiResponse) => {
          this.documentPurpose = data.payload;
          //this.ithmaarPortalService.log("this.documentPurpose ",this.documentPurpose)
        }),
    );
  }

  createMainModuleForm() {
    this.RequiredDocumentForm = this.fb.group({
      fcprdUsedFor: [''],
      wrdKey: ['', [Validators.required]],
      fcprdNationalityStatus: ['', [Validators.required]],
      fcprdIntegrationCode: [''],
      //  fcprdRequiredOrginality:['',[Validators.required]],
      wrdLocalName: [''],
      fcpKey: [''],
    });
    this.pageLoad = true;
  }

  getMainModuleForm() {
    this.btnAction = 'Update';
    let data = this.RequiredDocumentData;
    this.RequiredDocumentForm = this.fb.group({
      fcprdKey: [this.helpersService.getDotObject(data, 'fcprdKey', '')],
      wrdKey: [this.helpersService.getDotObject(data, 'wrdKey', '')],
      fcpKey: [this.helpersService.getDotObject(data, 'fcpKey', '')],
      fcprdUsedFor: [
        this.helpersService.getDotObject(data, 'fcprdUsedFor', ''),
      ],
      fcprdNationalityStatus: [
        this.helpersService.getDotObject(data, 'fcprdNationalityStatus', ''),
      ],
      fcprdIntegrationCode: [
        this.helpersService.getDotObject(data, 'fcprdIntegrationCode', ''),
      ],
      // fcprdRequiredOrginality: [this.helpersService.getDotObject(data,'fcprdRequiredOrginality','')],
      wrdLocalName: [
        this.helpersService.getDotObject(data, 'wrdLocalName', ''),
      ],
    });
    this.pageLoad = true;
  }

  onSubmitRequiredDocument() {
    // this.assetAttForm.value.acaRequired = this.checked ? 'T':'F';
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
        .create(`required-documents/add`, this.RequiredDocumentForm.value)
        .subscribe(
          (data: ApiResponse) => {
            if (data.success) {
              data.payload.wppKey;
              this.toastr.success(
                this.staticTranslation['AddedAssetAttributeSuccessfully'],
                this.staticTranslation['Success'],
              );
              this.dialogRef.close({ action: 'confirm' });
            }
          },
          (err) => {},
        );
    }
  }
  editRequiredDocument() {
    //  this.RequiredDocumentForm.value.modifiedClientKey=this.clntKey

    this.httpEndpointService
      .update(
        `required-documents/update/${this.dataStatus.row.fcprdKey}`,
        this.RequiredDocumentForm.value,
      )
      .subscribe((res: ApiResponse) => {
        if (res.success) {
          this.toastr.success(
            this.staticTranslation['FinanceProductUpdatedSuccessfully'],
            this.staticTranslation['Success'],
          );
          this.dialogRef.close({ action: 'confirm' });
        }
      });
  }
}
