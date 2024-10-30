import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-new-domain',
  templateUrl: './add-new-domain.component.html',
  styleUrls: ['./add-new-domain.component.scss'],
})
export class AddNewDomainComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    public dialogRef: MatDialogRef<AddNewDomainComponent>,
  ) {}

  domainData: any;
  mainInfoForm: FormGroup;
  subscriptionList: Subscription[] = [];
  params;
  genderList;
  maritalStatusList;
  identityTypes;
  employmentTypes;
  imageFile: File = null;
  imageSrc: string = null;
  imageErrMsg: string;

  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;

  probertyData: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.createMainDomainForm();
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

  getMainDomainForm() {
    this.pageLoad = true;

    this.mainInfoForm = this.fb.group({
      rvDomain: [this.domainData.rvDomain],
      // system: [this.helpersService.getDotObject(this.domainData, 'system', null)],
      // clntKey: [this.helpersService.getDotObject(this.domainData, 'clntKey', null)],
    });
  }

  createMainDomainForm() {
    this.pageLoad = true;

    this.mainInfoForm = this.fb.group({
      rvDomain: '',
      // disabled : this.probertyData['wppLFirstName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['wppLFirstName']['apsRequired'])]],
    });
  }
  resetForm() {
    this.mainInfoForm.reset();
  }

  onSubmitMainInfo() {
    //this.ithmaarPortalService.log("this.status  ><e ",this.status )
    //this.ithmaarPortalService.log("this.dataStatus.status  ><e ",this.dataStatus.status )
    this.addMainInfo();
    /*
    if (this.dataStatus.status=== 'create') {
      this.addMainInfo();
    } else {
      this.editMainInfo();
    }
    */
  }

  editMainInfo() {
    if (this.mainInfoForm.valid) {
      this.subscriptionList.push(
        this.httpEndpointService
          .update(`domains/update${this.row.rvKey}`, this.mainInfoForm.value)
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
    this.mainInfoForm.value.wppPersonType = this.transferDataService.bpType;
    this.httpEndpointService
      .create(`domains/add`, this.mainInfoForm.value)
      .subscribe((res: ApiResponse) => {
        if (res.success) {
          this.toastr.success(
            this.staticTranslation['DomainAddedSuccessfully'],
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
