import { Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-add-edit-vacation',
  templateUrl: './add-edit-vacation.component.html',
  styleUrls: ['./add-edit-vacation.component.scss'],
})
export class AddEditVacationComponent implements OnInit, OnDestroy {
  vacationsData: any;
  vacationsForm: FormGroup;
  subscriptionList: Subscription[] = [];
  params;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: any;
  pageLoad: boolean = false;
  btnAction: string;
  minDate: Date;
  toDateDisabled = true;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private localstorageservice: LocalStorageService,
    private httpEndpointService: HttpEndpointService,
    public dialogRef: MatDialogRef<AddEditVacationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.checkStatus();
  }

  checkStatus() {
    if (this.data.status == 'create') {
      this.createVacationsForm();
      this.btnAction = 'save';
    } else {
      this.getVacationsForm();
      this.btnAction = 'update';
    }
  }

  createVacationsForm() {
    this.vacationsForm = this.fb.group({
      vamCode: [''],
      vamLocalName: [''],
      vamFisicalYear: [''],
      vamForeignName: [''],
      vamFromDate: [''],
      vamToDate: [''],
      clntKey: [1],
      versionNo: [1],
    });
    this.pageLoad = true;
  }

  getVacationsForm() {
    this.vacationsData = this.data.row;
    this.vacationsForm = this.fb.group({
      vamCode: [this.vacationsData.vamCode],
      vamLocalName: [this.vacationsData.vamLocalName],
      vamFisicalYear: [this.vacationsData.vamFisicalYear],
      vamForeignName: [this.vacationsData.vamForeignName],
      vamFromDate: [this.vacationsData.vamFromDate],
      vamToDate: [this.vacationsData.vamToDate],
      clntKey: [this.vacationsData.clntKey],
      versionNo: [this.vacationsData.versionNo],
    });

    this.pageLoad = true;
  }

  resetForm() {
    this.vacationsForm.reset();
  }

  onSubmit() {
    if (this.data.status == 'create') {
      this.addvacation();
    } else {
      this.updateVacation();
    }
  }

  addvacation() {
    this.subscriptionList.push(
      this.httpEndpointService
        .create(`vacations/add`, this.vacationsForm.value)
        .subscribe(
          (res: ApiResponse) => {
            if (res.success) {
              this.toastr.success(
                this.staticTranslation['VacationAddedSuccessfully'],
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

  updateVacation() {
    this.subscriptionList.push(
      this.httpEndpointService
        .update(
          `vacations/update/${this.vacationsData.vamKey}`,
          this.vacationsForm.value,
        )
        .subscribe(
          (res: ApiResponse) => {
            if (res.success) {
              this.toastr.success(
                this.staticTranslation['VacationUpdatedSuccessfully'],
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

  getMinDate(choosenDate): Date {
    let date = new Date(choosenDate);
    this.minDate = date;
    let dateDay = date.getDate();
    this.minDate.setDate(dateDay + 1);
    return this.minDate;
  }

  getDateAndControlName(controlName) {
    let controlDate = this.vacationsForm.get(controlName);
    const pipe = new DatePipe('en-US');
    controlDate.setValue(pipe.transform(controlDate.value, 'yyyy-MM-dd'));
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
