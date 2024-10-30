import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-new-static-translation',
  templateUrl: './add-new-static-translation.component.html',
  styleUrls: ['./add-new-static-translation.component.scss'],
})
export class AddNewStaticTranslationComponent implements OnInit {
  defaultValueObj: any;
  action: string;
  actionBtn: string;
  private subscriptions: Subscription[] = [];
  financeConceptData = [];
  staticTranslationForm: FormGroup;
  rowId: number;
  row: any;
  probertyData: any;
  params: any;
  pageLoad: boolean = false;
  isDisabled = false;
  languagesNamesData;
  btnAction;
  subscriptionList: Subscription[] = [];
  staticData: any;
  staticTranslation: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ithmaarPortalService: IthmaarPortalService,
    private dialogRef: MatDialogRef<AddNewStaticTranslationComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.checkStatus();
    this.callLovServices();
  }

  callLovServices() {
    this.subscriptionList.push(
      this.httpEndpointService.getAll('languages/all').subscribe((data) => {
        this.languagesNamesData = data.payload;
        this.pageLoad = true;
      }),
    );
  }

  checkStatus() {
    if (this.data.status == 'create') {
      this.createStaticTranslationForm();
    } else {
      this.staticData = this.data.row;
      this.getProcessLocalizeForm();
    }
  }

  // createDefaultValueForm(){

  //   this.defaultValueForm = new FormGroup({

  //     rovsFinanceConceptName: new FormControl({value : ""}) ,

  //     rovsProfitRate: new FormControl({value : " " }) ,

  //     rovsDownPaymentPercentage: new FormControl({value : ""}),

  //     rovsGraceDays: new FormControl({value : "" }),

  //     rovsTenure: new FormControl({value : ""}) ,

  //     clntKey: new FormControl(1)

  //   });
  // }

  createStaticTranslationForm() {
    this.btnAction = 'save';
    this.staticTranslationForm = this.fb.group({
      langKey: 1,
      controlValue: [''],
      controlName: [''],
      sysKey: 1,
    });
  }

  getProcessLocalizeForm() {
    this.ithmaarPortalService.log('1', this.data);

    this.btnAction = 'Update';
    this.staticTranslationForm = this.fb.group({
      langKey: [this.staticData.langKey],
      controlValue: [this.staticData.controlValue],
      controlName: [this.staticData.controlName],
    });
    this.staticTranslationForm.get('langKey').disable();
    this.staticTranslationForm.get('controlName').disable();
  }
  onSubmit() {
    if (this.data.action == 'Edit') {
      if (this.staticTranslationForm.valid) {
        this.subscriptions.push(
          this.httpEndpointService
            .update(
              'static-translation/update/' + this.staticData.lgdKey,
              this.staticTranslationForm.value,
            )
            .subscribe(
              (data: ApiResponse) => {
                if (data.success) {
                  this.toastr.success(
                    this.staticTranslation['UpdatedTranslationSuccessfully'],
                    this.staticTranslation['Success'],
                  );
                  this.isDisabled = true;
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
        this.close();
      }
    } else {
      if (this.staticTranslationForm.valid) {
        this.ithmaarPortalService.log('valid');
        this.subscriptions.push(
          this.httpEndpointService
            .create('static-translation/add', this.staticTranslationForm.value)
            .subscribe(
              (data: ApiResponse) => {
                if (data.success) {
                  this.toastr.success(
                    this.staticTranslation['TranslationAddedSuccessfully'],
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
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
