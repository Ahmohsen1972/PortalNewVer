import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MainInfoService } from 'app/features/user-profile/services/main-info.service';
import { HelpersService } from 'app/core/services/helpers.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
@Component({
  selector: 'app-add-new-module-services',
  templateUrl: './add-new-module-services.component.html',
  styleUrls: ['./add-new-module-services.component.scss'],
})
export class AddNewModuleServicesComponent implements OnInit {
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
  serviceName: string;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;

  probertyData: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ithmaarPortalService: IthmaarPortalService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddNewModuleServicesComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.ithmaarPortalService.log('status 1  ><><><><> ' + this.status);
    //this.ithmaarPortalService.log("status 12  ><><><><> "+this.dataStatus)
    this.createMainServiceForm();
    //this.ithmaarPortalService.log("status 1  ><><><><> ",this.status)

    this.getLov();
    this.getLovServType();
    // this.serviceData = this.row;
    //this.serviceName=this.serviceData.imsKey;
    // this.getMainServiceForm();
    this.ithmaarPortalService.log(
      'this.this.dominName ><>/ ',
      this.serviceName,
    );
    this.ithmaarPortalService.log('this.userProfile ', this.row);

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

          this.ithmaarPortalService.log(
            ' this.modNameData  ><>/ ',
            this.modNameData,
          );
          this.ithmaarPortalService.log('data.payload.data ', data.payload);
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

          this.ithmaarPortalService.log(
            ' this.mainModLocalnameData  ><>/ ',
            this.mainModLocalnameData,
          );
          this.ithmaarPortalService.log('data.payload.data22 ', data.payload);
        }),
    );
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

  createMainServiceForm() {
    this.pageLoad = true;
    //  this.ithmaarPortalService.log("this.userProfile ",this.row)
    this.mainInfoForm = this.fb.group({
      imsKey: [],
      description: [],
      parentSrvDescription: [],
      serviceURL: [],
      serviceType: [],
      modKey: [],
      sysKey: [],
      // disabled : this.probertyData['wppLFirstName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['wppLFirstName']['apsRequired'])]],
    });
  }
  resetForm() {
    this.mainInfoForm.reset();
  }

  onSubmitMainInfo() {
    this.addMainInfo();
  }

  addMainInfo() {
    this.mainInfoForm.value.sysKey = 1;
    this.httpEndpointService
      .create(`ModuleService/new`, this.mainInfoForm.value)
      .subscribe((res: ApiResponse) => {
        if (res.success) {
          this.toastr.success(
            this.staticTranslation['ModuleServiceAddedSuccessfully'],
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
