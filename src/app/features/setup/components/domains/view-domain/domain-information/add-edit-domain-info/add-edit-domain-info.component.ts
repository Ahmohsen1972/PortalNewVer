import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
@Component({
  selector: 'app-add-edit-domain-info',
  templateUrl: './add-edit-domain-info.component.html',
  styleUrls: ['./add-edit-domain-info.component.scss'],
})
export class AddEditDomainInfoComponent implements OnInit {
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
  dominName: string;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    public dialogRef: MatDialogRef<AddEditDomainInfoComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    if (this.status === 'create') {
      this.createMainDomainForm();
    } else {
      this.domainData = this.row;
      this.dominName = this.domainData.rvDomain;
      this.getMainDomainForm();
    }
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
    });
  }

  createMainDomainForm() {
    this.mainInfoForm = this.fb.group({
      rvDomain: [{ value: null }],
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
      this.subscriptionList.push(
        this.httpEndpointService
          .update(`domains/update/${this.row.rvKey}`, this.mainInfoForm.value)
          .subscribe(
            (res: ApiResponse) => {
              this.isDisabled = true;
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
        this.isDisabled = true;
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
