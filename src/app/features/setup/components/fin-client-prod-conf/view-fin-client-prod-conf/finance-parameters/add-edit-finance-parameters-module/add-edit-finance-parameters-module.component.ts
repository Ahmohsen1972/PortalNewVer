import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
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
  selector: 'app-add-edit-finance-parameters-module',
  templateUrl: './add-edit-finance-parameters-module.component.html',
  styleUrls: ['./add-edit-finance-parameters-module.component.scss'],
})
export class AddEditFinanceParametersModuleComponent implements OnInit {
  productParamsForm: FormGroup;
  subscriptions: Subscription[] = [];
  params;
  lovData = [];
  dependentLov: boolean = false;
  productParamsData;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  checkedRequired: boolean = false;
  checkedVisible: boolean = false;
  filteredModKey: number;
  btnAction: string;
  dataTypes: any;
  modules: any;
  modKeyRoot;
  public dataTypesFilteredOptions: Observable<any[]>;
  public attributeNamesFilteredOptions: Observable<any[]>;
  attributeName;
  dataType;
  attributeNames;
  staticTranslation: any;
  constructor(
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private helpersService: HelpersService,
    private ithmaarPortalService: IthmaarPortalService,
    private localstorageservice: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditFinanceParametersModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataStatus: any,
    private fb: FormBuilder,

    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.checkStatus();
    this.getdataType();
    this.getAttributeNames();
  }
  getdataType() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('data-types/all')
        .subscribe((data: ApiResponse) => {
          this.dataTypes = data.payload;
          this.ithmaarPortalService.log('this.dataTypes ', this.dataTypes);
          // this.dataTypesFilterOptions();
        }),
    );
  }
  getAttributeNames() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('asset-attribute-names/all')
        .subscribe((data: ApiResponse) => {
          this.attributeNames = data.payload;
          this.ithmaarPortalService.log(
            'this.attributeNames ',
            this.attributeNames,
          );
          this.attributeNameFilterOptions();
        }),
    );
  }

  checkStatus() {
    this.ithmaarPortalService.log('this.clientsData ', this.dataStatus);

    if (this.dataStatus.action == 'create') {
      this.createMainModuleForm();
      this.btnAction = 'Save';
    } else {
      this.productParamsData = this.dataStatus.row;

      this.getMainModuleForm();
      this.btnAction = 'Update';
    }
  }

  createMainModuleForm() {
    this.productParamsForm = this.fb.group({
      fcppDataType: ['', [Validators.required]],
      fcppAttributeName: [''],
      assetAtttribteDesc: ['', [Validators.required]],
      dataTypeName: [''],
      fcppIsVisible: [''],
      fcppIsRequired: [''],
      fcppLName: ['', [Validators.required]],
      fcppFName: ['', [Validators.required]],
      fccpValue: ['', [Validators.required]],
      fcppMaxValue: ['', [Validators.required]],
      fcppMinValue: ['', [Validators.required]],
      fcpKey: [''],
    });
    this.pageLoad = true;
    this.checkedRequired = true;
    this.checkedVisible = true;
  }

  getMainModuleForm() {
    this.btnAction = 'Update';
    let data = this.productParamsData;
    this.productParamsForm = this.fb.group({
      fcppDataType: [
        this.helpersService.getDotObject(data, 'fcppDataType', ''),
      ],
      fcppAttributeName: [
        this.helpersService.getDotObject(data, 'fcppAttributeName', ''),
      ],
      dataTypeName: [
        this.helpersService.getDotObject(data, 'dataTypeName', ''),
      ],
      assetAtttribteDesc: [
        this.helpersService.getDotObject(data, 'assetAtttribteDesc', ''),
      ],
      fcppIsVisible: [
        this.helpersService.getDotObject(data, 'fcppIsVisible', ''),
      ],
      fcppIsRequired: [
        this.helpersService.getDotObject(data, 'fcppIsRequired', ''),
      ],
      fcppLName: [this.helpersService.getDotObject(data, 'fcppLName', '')],
      fcppFName: [this.helpersService.getDotObject(data, 'fcppFName', '')],
      fccpValue: [this.helpersService.getDotObject(data, 'fccpValue', '')],
      fcppMaxValue: [
        this.helpersService.getDotObject(data, 'fcppMaxValue', ''),
      ],
      fcppMinValue: [
        this.helpersService.getDotObject(data, 'fcppMinValue', ''),
      ],

      fcpKey: [this.helpersService.getDotObject(data, 'fcpKey', '')],
    });
    this.pageLoad = true;
    if (data.fcppIsRequired === 'T') {
      this.checkedRequired = true;
    } else {
      this.checkedRequired = false;
    }

    if (data.fcppIsVisible === 'T') {
      this.checkedVisible = true;
    } else {
      this.checkedVisible = false;
    }
  }

  attributeNameFilterOptions() {
    this.attributeNamesFilteredOptions = this.productParamsForm
      ?.get('assetAtttribteDesc')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.attributeName_filter(value)),
      );
  }
  private attributeName_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.attributeNames.filter(
      //clentLocalName
      (option) => option.localName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  onAttributeNamesSelection(module) {
    this.ithmaarPortalService.log('rol ', module.option);
    this.attributeNames.filter((value) => {
      if (value.localName === module.option.value) {
        this.attributeName = value.code;
        this.productParamsForm.value.fcppAttributeName = value.code;
      }
    });
  }

  onSubmitProductParams() {
    this.productParamsForm.value.fcppAttributeName = this.attributeName;
    // this.productParamsForm.value.fcppDataType = this.dataType;
    this.productParamsForm.value.fcppIsRequired = this.checkedRequired
      ? 'T'
      : 'F';
    this.productParamsForm.value.fcppIsVisible = this.checkedVisible
      ? 'T'
      : 'F';
    if (this.dataStatus.action === 'create') {
      this.addProductParams();
    } else {
      this.editProductParams();
    }
  }
  addProductParams() {
    // this.productParamsForm.value.modKey=this.modKey
    //   this.productParamsForm.value.rolKey=this.dataType
    this.productParamsForm.value.fcpKey = this.dataStatus.row;

    this.ithmaarPortalService.log('value>>>> ss', this.productParamsForm.value);
    if (this.productParamsForm.valid) {
      this.ithmaarPortalService.log(
        'value>>>> 2 ',
        this.productParamsForm.value,
      );

      this.httpEndpointService
        .create(
          `finance-client-product-params/add`,
          this.productParamsForm.value,
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
  editProductParams() {
    this.httpEndpointService
      .update(
        `finance-client-product-params/update/${this.dataStatus.row.fcppKey}`,
        this.productParamsForm.value,
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
