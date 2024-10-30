import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HelpersService } from 'app/core/services/helpers.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-edit-finance-product-information',
  templateUrl: './add-edit-finance-product-information.component.html',
  styleUrls: ['./add-edit-finance-product-information.component.scss'],
})
export class AddEditFinanceProductInformationComponent implements OnInit {
  financeProductData: any;
  financeProductModuleForm: FormGroup;
  subscriptions: Subscription[] = [];
  params;
  modNameData = [];
  modAttrData = [];
  lovData = [];
  dependentLov: boolean = false;
  @Input() status: string;
  @Input() row: any;

  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  filteredModKey: number;
  btnAction: string;
  staticTranslation: any;

  constructor(
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private helpersService: HelpersService,

    public dialogRef: MatDialogRef<AddEditFinanceProductInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public dataStatus: any,
    private fb: FormBuilder,
    private ithmaarPortalService: IthmaarPortalService,

    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.checkStatus();
    //  this.callModuleLovServices()
  }
  checkStatus() {
    this.ithmaarPortalService.log('el status 2>>>', this.dataStatus);
    if (this.dataStatus.action == 'create') {
      this.createMainModuleForm();
      this.btnAction = 'Save';
    } else {
      this.ithmaarPortalService.log('el status 2>>>', this.dataStatus);
      this.financeProductData = this.row;
      this.getMainModuleForm();
      this.btnAction = 'Update';
    }
  }

  getMainModuleForm() {
    this.btnAction = 'Update';

    let data = this.financeProductData;
    this.financeProductModuleForm = this.fb.group({
      fnpLName: [this.helpersService.getDotObject(data, 'fnpLName', '')],
      fnpFName: [this.helpersService.getDotObject(data, 'fnpFName', '')],
      fnpIconPath: [this.helpersService.getDotObject(data, 'fnpIconPath', '')],
      fnpDescription: [
        this.helpersService.getDotObject(data, 'fnpDescription', ''),
      ],
      fnpLTermsConditions: [
        this.helpersService.getDotObject(data, 'fnpLTermsConditions', ''),
      ],
      fnpFTermsConditions: [
        this.helpersService.getDotObject(data, 'fnpFTermsConditions', ''),
      ],
      fnpLRequiredDocuemnts: [
        this.helpersService.getDotObject(data, 'fnpLRequiredDocuemnts', ''),
      ],
      fnpFRequiredDocuemnts: [
        this.helpersService.getDotObject(data, 'fnpFRequiredDocuemnts', ''),
      ],
    });
    this.pageLoad = true;
    // if(data.acaRequired === 'T'){
    //   this.checked = true;
    // }else{
    //   this.checked = false;
    // }
  }

  createMainModuleForm() {
    this.financeProductModuleForm = this.fb.group({
      fnpLName: [''],
      fnpFName: [''],
      fnpIconPath: [],
      fnpDescription: [''],
      fnpLTermsConditions: [''],
      fnpFTermsConditions: [''],
      fnpLRequiredDocuemnts: [''],
      fnpFRequiredDocuemnts: [''],
    });
    this.pageLoad = true;
  }

  onSubmitAssetAtt() {
    // this.assetAttForm.value.acaRequired = this.checked ? 'T':'F';
    if (this.dataStatus.status === 'create') {
      this.addAssetAtt();
    } else {
      this.editAssetAtt();
    }
  }
  addAssetAtt() {
    // this.assetAttForm.value.wacKey =  this.data.row
    this.ithmaarPortalService.log(
      'value>>>>',
      this.financeProductModuleForm.value,
    );

    if (this.financeProductModuleForm.valid) {
      this.ithmaarPortalService.log(
        'value>>>> 2 ',
        this.financeProductModuleForm.value,
      );

      this.httpEndpointService
        .create(`finance-products/add`, this.financeProductModuleForm.value)
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
    this.httpEndpointService
      .update(
        `finance-products/update/${this.row.fnpKey}`,
        this.financeProductModuleForm.value,
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
