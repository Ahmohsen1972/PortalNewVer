import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { ProbertyData } from 'app/core/interfaces/ProbertyData';

@Component({
  selector: 'app-edit-attribute-details',
  templateUrl: './edit-attribute-details.component.html',
  styleUrls: ['./edit-attribute-details.component.scss'],
})
export class EditAttributeDetailsComponent implements OnInit, OnDestroy {
  attributeDetailsData: any;
  attributeDetailsForm;
  subscriptions: Subscription[] = [];
  params;
  modAttributeNameData = [];
  mainModLocalnameData = [];
  languagesNamesData = [];
  btnAction: string;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: ProbertyData;
  pageLoad: boolean = false;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    public dialogRef: MatDialogRef<EditAttributeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.checkStatus();
  }

  checkStatus() {
    if (this.data.status == 'create') {
      this.btnAction = 'save';
      this.createAttributeDetailsForm();
      this.callLovServices();
    } else {
      this.btnAction = 'update';
      this.getAttributeDetailsForm();
      this.callLovServices();
    }
  }

  get modKey() {
    return this.attributeDetailsForm.get('modKey');
  }

  get parentModKey() {
    return this.attributeDetailsForm.get('parentModKey');
  }

  getCustomProperties() {
    this.params = [
      { ahdKey: this.transferDataService.bpTypeModKeys.MAIN_INFO },
    ];
    this.subscriptions.push(
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
    if (this.data.status == 'create') {
      this.subscriptions.push(
        this.httpEndpointService
          .getAll(`module-att-lovs/all/${this.data.modKey}`)
          .subscribe((data) => {
            this.modAttributeNameData = data.payload;
            this.subscriptions.push(
              this.httpEndpointService
                .getAll('languages/all')
                .subscribe((data) => {
                  this.languagesNamesData = data.payload;
                  this.pageLoad = true;
                }),
            );
          }),
      );
    } else {
      this.subscriptions.push(
        this.httpEndpointService.getAll('languages/all').subscribe((data) => {
          this.languagesNamesData = data.payload;
          this.pageLoad = true;
        }),
      );
    }
  }

  createAttributeDetailsForm() {
    this.attributeDetailsForm = this.fb.group({
      ahdHelp: [''],
      ahdTooltip: [''],
      ahdCaption: ['', [Validators.required]],
      langKey: ['', [Validators.required]],
      modKey: [this.data.modKey],
      mainModule: [this.data.modLocalName],
      parentModKey: [this.data.parentModKey],
      parentModule: [this.data.mainModLocalName],
      maKey: ['', [Validators.required]],
    });
    this.attributeDetailsForm.get('parentModule').disable();
    this.attributeDetailsForm.get('mainModule').disable();
  }

  getAttributeDetailsForm() {
    this.attributeDetailsData = this.data.row;
    this.attributeDetailsForm = this.fb.group({
      ahdHelp: [this.attributeDetailsData.ahdHelp],
      ahdTooltip: [this.attributeDetailsData.ahdTooltip],
      ahdCaption: [this.attributeDetailsData.ahdCaption],
      langLocalName: [this.attributeDetailsData.langLocalName],
      modKey: [this.attributeDetailsData.modKey],
      parentModKey: [this.attributeDetailsData.parentModKey],
      parentModule: [this.attributeDetailsData.parentModule],
      mainModule: [this.attributeDetailsData.mainModule],
      maKey: [this.attributeDetailsData.maKey],
      maLocalName: [this.attributeDetailsData.maLocalName],
    });
    this.attributeDetailsForm.get('parentModule').disable();
    this.attributeDetailsForm.get('mainModule').disable();
    this.attributeDetailsForm.get('langLocalName').disable();
    this.attributeDetailsForm.get('maKey').disable();
    this.attributeDetailsForm.get('maLocalName').disable();
  }

  resetForm() {
    this.attributeDetailsForm.reset();
  }

  onSubmitAttributeDetails() {
    if (this.data.status == 'create') {
      this.addAttributeDetailsInfo();
    } else {
      this.editAttributeDetailsInfo();
    }
  }

  editAttributeDetailsInfo() {
    if (this.attributeDetailsForm.valid) {
      this.subscriptions.push(
        this.httpEndpointService
          .update(
            `att-help-details/update/${this.data.row.ahdKey}`,
            this.attributeDetailsForm.value,
          )
          .subscribe(
            (res: ApiResponse) => {
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['AttributeDetailsUpdatedSuccessfully'],
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

  addAttributeDetailsInfo() {
    if (this.attributeDetailsForm.valid) {
      this.subscriptions.push(
        this.httpEndpointService
          .create(`att-help-details/add`, this.attributeDetailsForm.value)
          .subscribe(
            (res: ApiResponse) => {
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['AttributeDetailsAddedSuccessfully'],
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

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`att-help-details/all/${this.modKey}${'/'}${this.parentModKey}`)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.attributeDetailsData.data = rows;
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
