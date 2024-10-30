import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-new-finance-product',
  templateUrl: './add-new-finance-product.component.html',
  styleUrls: ['./add-new-finance-product.component.scss'],
})
export class AddNewFinanceProductComponent implements OnInit {
  lovTypeData = [];
  domainNameData = [];
  action: string;
  actionBtn: string;
  private subscriptions: Subscription[] = [];
  lovForm: FormGroup;
  probertyData: any;
  params: any;
  pageLoad: boolean = false;
  isDisabled: boolean = false;
  isChecked = false;
  staticTranslation: any;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private dialogRef: MatDialogRef<AddNewFinanceProductComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.createLovForm();
    this.callLovServices();
  }

  createLovForm() {
    this.actionBtn = 'Save';
    this.lovForm = this.fb.group({
      fnpLName: [''],
      fnpFName: [''],
      fnpIconPath: [],
      fnpDescription: [''],
      fnpLTermsConditions: [''],
      fnpFTermsConditions: [''],
      fnpLRequiredDocuemnts: [''],
      fnpFRequiredDocuemnts: [''],
    });
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

  onSubmit() {
    this.lovForm.get('rvKey').setValue(+this.lovForm.get('rvKey').value);
    let ch: string = this.isChecked ? 'T' : 'F';
    this.ithmaarPortalService.log('el checked >> ', this.isChecked);
    this.lovForm.get('lovIsValid').setValue(ch);
    this.ithmaarPortalService.log('el data bta3 el add', this.lovForm.value);
    this.subscriptions.push(
      this.httpEndpointService
        .create('lov-admin/add', this.lovForm.value)
        .subscribe(
          (data: ApiResponse) => {
            this.isDisabled = true;
            if (data.success) {
              this.toastr.success(
                this.staticTranslation['ListOfValuesAddedSuccessfully'],
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
    //}

    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
