import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ListOfValues } from 'app/core/interfaces/listOfValues';
import { HelpersService } from 'app/core/services/helpers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { checkRequired } from 'app/features/transactions/components/customer-request/components/create-request/check-custom-validation';

@Component({
  selector: 'app-add-edit-asset-att',
  templateUrl: './add-edit-asset-att.component.html',
  styleUrls: ['./add-edit-asset-att.component.scss'],
})
export class AddEditAssetAttComponent implements OnInit {
  assetAttForm: FormGroup;
  checked = false;
  subscriptionList: Subscription[] = [];
  subscriptions: Subscription[] = [];
  parentNameData = [];
  params: any;
  public assetFilteredOptions: Observable<any[]>;
  pageLoad: boolean = false;
  AssetAttributeData: ListOfValues[];
  btnAction: string;
  probertyData: string[];
  staticTranslation: string[];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helpersService: HelpersService,
    public dialogRef: MatDialogRef<AddEditAssetAttComponent>,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private ithmaarService: IthmaarPortalService,
    private transferDataService: TransferDataService,
    private ithmaarPortalService: IthmaarPortalService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}
  ngOnInit(): void {
    this.getStaticLocalization();
    this.getCustomProperties();
  }
  getStaticLocalization() {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
  }
  getCustomProperties() {
    this.params = [
      { modKey: 152 },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];

    this.subscriptions.push(
      this.httpEndPoint
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.ithmaarPortalService.log('probertyData  ', this.probertyData);

          if (this.data.status === 'create') {
            this.createassetAttForm();
            this.btnAction = 'save';
          } else {
            this.btnAction = 'update';
            this.createassetAttForm();
            this.getMainassetAttForm();
          }
        }),
    );
  }

  getMainassetAttForm() {
    this.btnAction = 'update';

    let data = this.data.row;
    this.assetAttForm = this.fb.group({
      acaKey: [this.helpersService.getDotObject(data, 'acaKey', '')],

      acaDisplayOrder: [
        {
          value: this.helpersService.getDotObject(data, 'acaDisplayOrder', ''),
          disabled: this.probertyData['acaDisplayOrder']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['acaDisplayOrder']['apsRequired'])],
      ],

      acaRequired: [
        {
          value: this.helpersService.getDotObject(data, 'acaRequired', ''),
          disabled: this.probertyData['acaRequired']['apsEnabled'] == 'F',
        },
      ],

      acaAssetAttributeName: [
        {
          value: this.helpersService.getDotObject(
            data,
            'acaAssetAttributeName',
            '',
          ),
          disabled:
            this.probertyData['acaAssetAttributeName']['apsEnabled'] == 'F',
        },
      ],
      // [checkRequired(this.probertyData['acaAssetAttributeName']['apsRequired'])]],
      attributeLocalName: [
        {
          value: this.helpersService.getDotObject(
            data,
            'attributeLocalName',
            '',
          ),
          disabled:
            this.probertyData['attributeLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['attributeLocalName']['apsRequired'])],
      ],
      wacKey: [this.helpersService.getDotObject(data, 'wacKey', '')],
    });

    this.pageLoad = true;
    if (data.acaRequired === 'T') {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }
  createassetAttForm() {
    this.btnAction = 'save';

    this.assetAttForm = this.fb.group({
      acaDisplayOrder: [
        {
          value: '',
          disabled: this.probertyData['acaDisplayOrder']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['acaDisplayOrder']['apsRequired'])],
      ],

      acaRequired: [
        {
          value: '',
          disabled: this.probertyData['acaRequired']['apsEnabled'] == 'F',
        },
      ],

      acaAssetAttributeName: [
        {
          value: '',
          disabled:
            this.probertyData['acaAssetAttributeName']['apsEnabled'] == 'F',
        },
      ],
      // [checkRequired(this.probertyData['acaAssetAttributeName']['apsRequired'])]],
      attributeLocalName: [
        {
          value: '',
          disabled:
            this.probertyData['attributeLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['attributeLocalName']['apsRequired'])],
      ],
      wacKey: [{ value: this.data.row }],
    });
    this.pageLoad = true;
    this.checked = true;
  }
  getLov() {
    this.params = [{ lovKey: 42 }, { ilmKey: 1015 }];
    this.subscriptions.push(
      this.httpEndPoint
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.AssetAttributeData = data.payload.data;
          this.ithmaarPortalService.log(
            ' this.AssetAttributeData ',
            this.AssetAttributeData,
          );

          this.assetFilterOptions();
        }),
    );
  }
  validateValue(AssetAttribute) {
    this.ithmaarService
      .validateLovValue(AssetAttribute, this.AssetAttributeData)
      .subscribe((valid) => {
        this.ithmaarPortalService.log('is valid  : ', valid);
        if (valid) {
          this.assetAttForm
            .get('acaAssetAttributeName')
            .setValue(this.transferDataService.lovMatchedObject['Code']);
        } else {
          this.ithmaarPortalService.log('is valid  : ', valid);

          this.assetAttForm.get('acaAssetAttributeName').setValue('');
          this.assetAttForm.get('attributeLocalName').setValue('');
        }
      });
  }
  assetFilterOptions() {
    this.assetFilteredOptions = this.assetAttForm
      ?.get('attributeLocalName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.asset_filter(value)),
      );
  }
  private asset_filter(value: string): ListOfValues[] {
    const filterValue = value.toLowerCase();
    return this.AssetAttributeData.filter(
      (option) => option.local_name.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  onAssetSelection(module) {
    this.AssetAttributeData.filter((value) => {
      if (value.local_name === module.option.value) {
        this.assetAttForm.get('acaAssetAttributeName').setValue(value.Code);
        this.assetAttForm.get('attributeLocalName').setValue(value.local_name);
      } else {
        //   this.assetAttForm.get("acaAssetAttributeName").setValue('')
        //   this.assetAttForm.get("attributeLocalName").setValue('')
      }
    });
  }

  onSubmitAssetAtt() {
    this.assetAttForm.value.acaRequired = this.checked ? 'T' : 'F';
    if (this.data.status === 'create') {
      this.addAssetAtt();
    } else {
      this.editAssetAtt();
    }
  }
  addAssetAtt() {
    this.assetAttForm.value.wacKey = this.data.row;
    this.ithmaarPortalService.log('error_>>>>', this.assetAttForm.value);
    if (this.assetAttForm.valid) {
      this.subscriptions.push(
        this.httpEndPoint
          .create(
            'asset-class-attributes/new',
            this.httpEndPoint.createRequestFormat(
              152,
              null,
              this.assetAttForm.value,
            ),
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
          ),
      );
    }
  }
  editAssetAtt() {
    this.assetAttForm.value.rvKey;
    this.ithmaarPortalService.log('error_>>>>', this.assetAttForm.value);
    // if(this.assetAttForm.value.acaAssetAttributeName===''&&this.assetAttForm.value.attributeLocalName===''){
    //   this.assetAttForm.get("acaAssetAttributeName").setValue(null);
    //   this.assetAttForm.get("attributeLocalName").setValue(null);
    // ///  this.assetAttForm.invalid

    //   this.ithmaarPortalService.log("error22_>>>>" , this.assetAttForm.value);

    // }
    if (this.assetAttForm.valid) {
      this.subscriptions.push(
        this.httpEndPoint
          .update(
            `asset-class-attributes/${this.data.row.acaKey}`,
            this.httpEndPoint.createRequestFormat(
              152,
              null,
              this.assetAttForm.value,
            ),
          )
          .subscribe((res: ApiResponse) => {
            if (res.success) {
              this.toastr.success(
                this.staticTranslation['AssetAttributeUpdatedSuccessfully'],
                this.staticTranslation['Success'],
              );
              this.dialogRef.close({ action: 'confirm' });
            }
          }),
      );
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
