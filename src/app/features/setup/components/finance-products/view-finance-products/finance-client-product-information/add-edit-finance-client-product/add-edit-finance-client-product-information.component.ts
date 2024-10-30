import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HelpersService } from 'app/core/services/helpers.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-edit-finance-client-product-information',
  templateUrl: './add-edit-finance-client-product-information.component.html',
  styleUrls: ['./add-edit-finance-client-product-information.component.scss'],
})
export class AddEditFinanceClientProductInformationComponent implements OnInit {
  financeProductData: any;
  financeClientProductModuleForm: FormGroup;
  subscriptions: Subscription[] = [];
  params;
  modNameData = [];
  modAttrData = [];
  lovData = [];
  itemsStatus = [
    { name: 'Multiple Item', code: 'M' },
    { name: 'Cash Product', code: 'C' },
    { name: 'Single Item', code: 'S' },
  ];
  dependentLov: boolean = false;
  @Input() status: string;
  @Input() row: any;
  clntKey;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  fcpDownPaymentAllowed: boolean = false;
  filteredModKey: number;
  btnAction: string;
  clientsData;
  staticTranslation: any;
  public clientFilteredOptions: Observable<any[]>;

  constructor(
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private helpersService: HelpersService,

    public dialogRef: MatDialogRef<AddEditFinanceClientProductInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public dataStatus: any,
    private fb: FormBuilder,
    private ithmaarPortalService: IthmaarPortalService,

    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.getclients();
    this.checkStatus();
    //  this.callModuleLovServices()
  }
  checkStatus() {
    this.ithmaarPortalService.log('this.clientsData ', this.dataStatus.action);

    if (this.dataStatus.action == 'create') {
      this.createMainModuleForm();
      this.btnAction = 'Save';
    } else {
      this.financeProductData = this.dataStatus.row;

      this.getMainModuleForm();
      this.btnAction = 'Update';
    }
  }
  getclients() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('client/all')
        .subscribe((data: ApiResponse) => {
          this.clientsData = data.payload;
          this.ithmaarPortalService.log('this.clientsData ', this.clientsData);
          this.assetFilterOptions();
        }),
    );
  }

  assetFilterOptions() {
    this.clientFilteredOptions = this.financeClientProductModuleForm
      ?.get('clntLocalName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.client_filter(value)),
      );
  }
  private client_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clientsData.filter(
      //clentLocalName
      (option) => option.clntLocalName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  onClientSelection(module) {
    this.clientsData.filter((value) => {
      this.ithmaarPortalService.log(
        'value.clntLocalName ',
        value.clntLocalName,
      );
      this.ithmaarPortalService.log(
        'module.option.value ',
        module.option.value,
      );
      if (value.clntLocalName === module.option.value) {
        this.ithmaarPortalService.log(
          'value.clntLocalName ',
          value.clntLocalName,
        );
        this.ithmaarPortalService.log(
          'module.option.value ',
          module.option.value,
        );
        this.ithmaarPortalService.log('module.option.value ', this.clntKey);
        this.clntKey = value.clntKey;
        this.financeClientProductModuleForm.value.modifiedClientKey =
          this.clntKey;
      }
    });
  }

  getMainModuleForm() {
    this.btnAction = 'Update';

    let data = this.financeProductData;
    this.financeClientProductModuleForm = this.fb.group({
      fcpLName: [this.helpersService.getDotObject(data, 'fcpLName', '')],
      fcpFName: [this.helpersService.getDotObject(data, 'fcpFName', '')],
      fcpLDescription: [
        this.helpersService.getDotObject(data, 'fcpLDescription', ''),
      ],
      fcpFDescription: [
        this.helpersService.getDotObject(data, 'fcpFDescription', ''),
      ],
      fcpLTermsCondition: [
        this.helpersService.getDotObject(data, 'fcpLTermsCondition', ''),
      ],
      fcpFTermsConditions: [
        this.helpersService.getDotObject(data, 'fcpFTermsConditions', ''),
      ],
      fcpLRequiredDocuments: [
        this.helpersService.getDotObject(data, 'fcpLRequiredDocuments', ''),
      ],
      fcpFRequiredDocuments: [
        this.helpersService.getDotObject(data, 'fcpFRequiredDocuments', ''),
      ],
      fcpIconPath: [this.helpersService.getDotObject(data, 'fcpIconPath', '')],
      // fcpItemsStatus:[this.helpersService.getDotObject(data,'fcpItemsStatus','')],
      fnpKey: [this.helpersService.getDotObject(data, 'fnpKey', '')],
      clntLocalName: [
        this.helpersService.getDotObject(data, 'clntLocalName', ''),
      ],
      fcpItemsStatus: [
        this.helpersService.getDotObject(data, 'fcpItemsStatus', ''),
      ],
      modifiedClientKey: [],
      fcpDownPaymentAllowed: [
        this.helpersService.getDotObject(data, 'fcpDownPaymentAllowed', ''),
      ],
    });
    this.pageLoad = true;
    if (data.fcpDownPaymentAllowed === 'T') {
      this.fcpDownPaymentAllowed = true;
    } else {
      this.fcpDownPaymentAllowed = false;
    }
  }

  createMainModuleForm() {
    this.financeClientProductModuleForm = this.fb.group({
      modifiedClientKey: [],
      fcpLName: [''],
      fcpFName: [],
      fcpLDescription: [''],
      fcpFDescription: [''],
      fcpLTermsCondition: [''],
      fcpFTermsConditions: [''],
      fcpLRequiredDocuments: [''],
      fcpFRequiredDocuments: [''],
      fcpIconPath: [''],
      fcpItemsStatus: [],
      fnpKey: [''],
      clntLocalName: [''],
      fcpDownPaymentAllowed: [''],
    });
    this.pageLoad = true;
  }

  onSubmitAssetAtt() {
    // this.assetAttForm.value.acaRequired = this.checked ? 'T':'F';
    if (this.dataStatus.action === 'create') {
      this.addAssetAtt();
    } else {
      this.editAssetAtt();
    }
  }
  addAssetAtt() {
    this.financeClientProductModuleForm.value.fnpKey = this.dataStatus.row;
    this.financeClientProductModuleForm.value.modifiedClientKey = this.clntKey;

    this.ithmaarPortalService.log(
      'value>>>> ss',
      this.financeClientProductModuleForm.value,
    );
    if (this.financeClientProductModuleForm.valid) {
      this.ithmaarPortalService.log(
        'value>>>> 2 ',
        this.financeClientProductModuleForm.value,
      );
      this.financeClientProductModuleForm.value.fcpDownPaymentAllowed = this
        .fcpDownPaymentAllowed
        ? 'T'
        : 'F';

      this.httpEndpointService
        .create(
          `finance-client-products/add`,
          this.financeClientProductModuleForm.value,
        )
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
          (err) => {
            this.ithmaarPortalService.log('error_>>>>', err);
          },
        );
    }
  }
  editAssetAtt() {
    this.financeClientProductModuleForm.value.modifiedClientKey = this.clntKey;

    this.financeClientProductModuleForm.value.fcpDownPaymentAllowed = this
      .fcpDownPaymentAllowed
      ? 'T'
      : 'F';

    this.httpEndpointService
      .update(
        `finance-client-products/update/${this.dataStatus.row.fcpKey}`,
        this.financeClientProductModuleForm.value,
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
