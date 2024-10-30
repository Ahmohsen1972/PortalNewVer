import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
@Component({
  selector: 'app-edit-lovs',
  templateUrl: './edit-lovs.component.html',
  styleUrls: ['./edit-lovs.component.scss'],
})
export class EditLovsComponent implements OnInit, OnDestroy {
  lovData: any;
  lovForm: FormGroup;
  subscriptions: Subscription[] = [];
  params;
  lovTypeData = [];
  domainNameData = [];
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  isChecked = false;
  staticTranslation: any;

  constructor(
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private localStorageService: LocalStorageService,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    public dialogRef: MatDialogRef<EditLovsComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.lovData = this.row;
    this.getLovForm();
    this.callLovServices();
  }

  getCustomProperties() {
    this.params = [
      { modKey: this.transferDataService.bpTypeModKeys.MAIN_INFO },
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
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('lov-type/all')
        .subscribe((data) => (this.lovTypeData = data.payload)),
      this.httpEndpointService
        .getAll('only-domains-lov/all')
        .subscribe((data) => {
          this.domainNameData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  getLovForm() {
    this.createLovForm();
    this.lovForm.patchValue({
      lovName: this.lovData.lovName,
      lovQuery: this.lovData.lovQuery,
      lovType: this.lovData.lovType,
      rvKey: this.lovData.rvKey,
      lovIsValid: this.lovData.lovIsValid,
    });
    this.checkBoxValue();
  }

  createLovForm() {
    this.lovForm = new FormGroup({
      lovName: new FormControl({ value: '' }),
      // disabled : this.probertyData['roleName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['roleName']['apsRequired'])]),
      lovQuery: new FormControl({ value: '', disabled: true }),
      // disabled : this.probertyData['roleName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['roleName']['apsRequired'])]),
      lovType: new FormControl({ value: '', Visible: false }),
      // disabled : this.probertyData['roleName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['roleName']['apsRequired'])]),
      rvKey: new FormControl(),
      // disabled : this.probertyData['roleName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['roleName']['apsRequired'])]),
      lovIsValid: new FormControl(),
      // disabled : this.probertyData['processName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['processName']['apsRequired'])]),
    });
  }

  resetForm() {
    this.lovForm.reset();
  }

  onSubmitLovInfo() {
    this.editLovInfo();
  }

  editLovInfo() {
    if (this.lovForm.valid) {
      this.lovForm.get('rvKey').setValue(+this.lovForm.get('rvKey').value);
      let ch: string = this.isChecked ? 'T' : 'F';
      this.ithmaarPortalService.log('el checked >> ', this.isChecked);
      this.lovForm.get('lovIsValid').setValue(ch);
      this.subscriptions.push(
        this.httpEndpointService
          .update(`lov-admin/update/${this.row.lovKey}`, this.lovForm.value)
          .subscribe(
            (res: ApiResponse) => {
              this.isDisabled = true;
              if (res.success) {
                this.toastr.success(
                  this.staticTranslation['ListOfValuesUpdatedSuccessfully'],
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

  checkBoxValue() {
    if (this.lovData.lovIsValid === 'T') {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
