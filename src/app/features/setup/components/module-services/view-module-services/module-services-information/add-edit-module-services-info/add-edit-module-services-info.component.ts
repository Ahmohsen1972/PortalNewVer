import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HelpersService } from 'app/core/services/helpers.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
@Component({
  selector: 'app-add-edit-module-services-info',
  templateUrl: './add-edit-module-services-info.component.html',
  styleUrls: ['./add-edit-module-services-info.component.scss'],
})
export class AddEditModuleServicesInfoComponent implements OnInit {
  serviceData: any;
  mainInfoForm: FormGroup;
  subscriptionList: Subscription[] = [];
  modNameData = [];
  mainModLocalnameData = [];
  params;
  paramsServType;
  genderList;
  maritalStatusList;
  identityTypes;
  employmentTypes;
  imageFile: File = null;
  imageSrc: string = null;
  imageErrMsg: string;
  serviceName: any;
  staticTranslation: any;
  public ServTypeFilteredOptions: Observable<any[]>;
  public moduleFilteredOptions: Observable<any[]>;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;

  probertyData: any;
  pageLoad: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ithmaarPortalService: IthmaarPortalService,
    private helpersService: HelpersService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditModuleServicesInfoComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    //this.ithmaarPortalService.log("status 1  ><><><><> "+this.status)
    //this.ithmaarPortalService.log("status 12  ><><><><> "+this.dataStatus)
    if (this.status === 'create') {
      this.createMainServiceForm();
      //this.ithmaarPortalService.log("status 1  ><><><><> ",this.status)
    } else {
      this.getLov();
      this.getLovServType();
      this.serviceData = this.row;
      this.serviceName = this.serviceData.serviceType;
      this.getMainServiceForm();
      this.ithmaarPortalService.log(
        'this.this.dominName ><>/ ',
        this.serviceName,
      );
      this.ithmaarPortalService.log('this.userProfile ', this.row);
    }

    // this.getCustomProperties();
  }
  getLov() {
    //ilm_key = 88 , lov_key = 29 for main_module

    this.params = [{ lovKey: 29 }, { ilmKey: 88 }];

    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.modNameData = data.payload.data;

          this.moduleFilterOptions();
          this.ithmaarPortalService.log(
            ' this.modNameData  ><>/ ',
            this.modNameData,
          );
          this.ithmaarPortalService.log(
            'data.payload.data ',
            data.payload.data,
          );
        }),
    );
  }

  getLovServType() {
    //srv type  lov_key = 33 ilm_key=91

    this.paramsServType = [{ lovKey: 33 }, { ilmKey: 91 }];

    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.paramsServType, 'path')
        .subscribe((data: ApiResponse) => {
          //this.modNameData = data.payload.data;
          this.mainModLocalnameData = data.payload.data;

          this.ServTypeFilterOptions();
          this.ithmaarPortalService.log(
            ' this.mainModLocalnameData  ><>/ ',
            this.mainModLocalnameData,
          );
          this.ithmaarPortalService.log('data.payload.data22 ', data.payload);
        }),
    );
  }

  moduleFilterOptions() {
    this.moduleFilteredOptions = this.mainInfoForm
      ?.get('modLocalName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.module_filter(value)),
      );
  }
  private module_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.modNameData.filter(
      (option) => option.Name.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  ServTypeFilterOptions() {
    this.ServTypeFilteredOptions = this.mainInfoForm
      ?.get('serviceType')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.servType_filter(value)),
      );
  }
  private servType_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.mainModLocalnameData.filter(
      (option) => option.Name.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  onSupplierSelection2(asst) {
    this.ithmaarPortalService.log('asst.option.valuen > : ', asst.option.value);
    /*
    this.assetClasses.filter(
      value => {
        if (value.local_name === asst.option.value) {
          this.itemDetailForm.patchValue({
            urAssetClass: value.code
          })
        }
      })
*/
  }

  onModuleSelection(module) {
    this.ithmaarPortalService.log(
      'module .option.valuen > : ',
      module.option.value,
    );

    this.modNameData.filter((value) => {
      if (value.Name === module.option.value) {
        this.ithmaarPortalService.log('value.Name > : ', value.Name);
        this.ithmaarPortalService.log('value.code > : ', value.Code);
        this.mainInfoForm.value.modKey = value.Code;
        /*
          this.mainInfoForm.patchValue({
            modKey: value.Code
          })
*/
      }
    });
  }

  getCustomProperties() {
    this.params = [
      { modKey: this.transferDataService.bpTypeModKeys.MAIN_INFO },
    ];
    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.ithmaarPortalService.log(
            'this.probertyDataaaaaaaaaa____>',
            this.probertyData,
          );
          this.callLovServices();
          this.pageLoad = true;
        }),
    );
  }

  callLovServices() {
    this.params = [
      { lovKey: this.probertyData['wppSex']['lovKey'] },
      { ilmKey: this.probertyData['wppSex']['ilmKey'] },
    ];

    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.genderList = data.payload.data;
          this.ithmaarPortalService.log(
            ' this.genderList_____>',
            this.genderList,
          );
        }),
    );

    this.params = [
      { lovKey: this.probertyData['wppMaritalStatus']['lovKey'] },
      { ilmKey: this.probertyData['wppMaritalStatus']['ilmKey'] },
    ];

    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.maritalStatusList = data.payload.data;
          this.ithmaarPortalService.log(
            ' this.maritalStatusList_____>',
            this.maritalStatusList,
          );
        }),
    );

    this.params = [{ rvDomain: 'IDENTITY_TYPES' }];
    this.params = [
      { lovKey: this.probertyData['wppIdentityType']['lovKey'] },
      { ilmKey: this.probertyData['wppIdentityType']['ilmKey'] },
    ];

    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.identityTypes = data.payload.data;
        }),
    );

    this.params = [{ rvDomain: 'WP EMPLOYMENT TYPE' }];
    this.params = [
      { lovKey: this.probertyData['wppEmploymentType']['lovKey'] },
      { ilmKey: this.probertyData['wppEmploymentType']['ilmKey'] },
    ];

    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.employmentTypes = data.payload.data;
        }),
    );
  }

  getMainServiceForm() {
    this.createMainServiceForm();
    //this.mainInfoForm.value.serviceType="migrate"+this.serviceData.serviceType
    //this.mainInfoForm.value.modKey=this.serviceData.modKey
    this.pageLoad = true;
    this.ithmaarPortalService.log(
      ' this.serviceData.serviceType_____>',
      this.helpersService.getDotObject(this.serviceData, 'serviceType', ''),
    );

    this.mainInfoForm = this.fb.group({
      // imsKey: [this.serviceData.imsKey],
      imsKey: [
        this.helpersService.getDotObject(this.serviceData, 'imsKey', null),
      ],

      //description: [this.serviceData.description],
      description: [
        this.helpersService.getDotObject(this.serviceData, 'description', null),
      ],

      // parentSrvDescription: [this.serviceData.parentSrvDescription],
      parentSrvDescription: [
        this.helpersService.getDotObject(
          this.serviceData,
          'parentSrvDescription',
          null,
        ),
      ],

      //serviceURL: [this.serviceData.serviceURL],
      serviceURL: [
        this.helpersService.getDotObject(this.serviceData, 'serviceURL', null),
      ],

      serviceType: [this.serviceName],
      //serviceType: [this.helpersService.getDotObject(this.serviceData,'serviceType',null)],

      modLocalName: [this.serviceData.modLocalName],
      //modKey: [this.helpersService.getDotObject(this.serviceData,'modKey',null)]
    });
  }

  createMainServiceForm() {
    //  this.ithmaarPortalService.log("this.userProfile  ><><",this.serviceData)
    //  this.ithmaarPortalService.log("this.userProfile ",this.row)
    this.mainInfoForm = this.fb.group({
      imsKey: [''],
      description: [''],
      parentSrvDescription: [''],
      serviceURL: [''],
      serviceType: [''],
      modKey: [''],
      modLocalName: [''],
      // disabled : this.probertyData['wppLFirstName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['wppLFirstName']['apsRequired'])]],
    });
  }
  resetForm() {
    this.mainInfoForm.reset();
  }

  onSubmitMainInfo() {
    if (this.status === 'create') {
      this.addMainInfo();
    } else {
      this.editMainInfo();
    }
  }

  editMainInfo() {
    if (this.mainInfoForm.valid) {
      this.ithmaarPortalService.log(' this.row ____>', this.row);

      this.subscriptionList.push(
        this.httpEndpointService
          .update(
            `ModuleService/update/${this.row.imsKey}`,
            this.mainInfoForm.value,
          )
          .subscribe(
            (res: ApiResponse) => {
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['DomainUpdatedSuccessfully'],
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

  addMainInfo() {
    //if (this.mainInfoForm.valid) {

    this.mainInfoForm.value.wppPersonType = this.transferDataService.bpType;
    this.httpEndpointService
      .create(`ModuleService/new`, this.mainInfoForm.value)
      .subscribe((res: ApiResponse) => {
        if (res.success) {
          this.toastr.success(
            this.staticTranslation['DomainAddedSuccessfully'],
            this.staticTranslation['Success'],
          );
          this.dialogRef.close({ action: 'confirm' });
        }
      });
    //}
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
