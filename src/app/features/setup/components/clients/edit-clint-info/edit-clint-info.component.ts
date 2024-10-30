import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Input, OnDestroy, OnInit, Inject } from '@angular/core';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-edit-clint-info',
  templateUrl: './edit-clint-info.component.html',
  styleUrls: ['./edit-clint-info.component.scss'],
})
export class EditClintInfoComponent implements OnInit, OnDestroy {
  selectedLogo: File = null;
  clientData: any;
  clientForm: FormGroup;
  subscriptionList: Subscription[] = [];
  params;
  @Input() status: string;
  @Input() row: any;
  @Inject(MAT_DIALOG_DATA) public dataStatus?: any;
  probertyData: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    public dialogRef: MatDialogRef<EditClintInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getClientForm();
  }

  getClientForm() {
    this.clientData = this.data.row;
    this.clientForm = this.fb.group({
      clntLocalName: [this.clientData.clntLocalName],
      clntForeignName: [this.clientData.clntForeignName],
      clntLocalAddress: [this.clientData.clntLocalAddress],
      clntForeignAddress: [this.clientData.clntForeignAddress],
      clntPhones: [this.clientData.clntPhones],
      clntContactLocalName: [this.clientData.clntContactLocalName],
      clntContactForeignName: [this.clientData.clntContactForeignName],
      clntContactPhone: [this.clientData.clntContactPhone],
      clntContactMobile: [this.clientData.clntContactMobile],
      clntNoOfEmployees: [this.clientData.clntNoOfEmployees],
      clntNoOfBranches: [this.clientData.clntNoOfBranches],
      clntLogo: [this.clientData.clntLogo],
      clntContactEmail: [this.clientData.clntContactEmail],
      clntWeekEnd: [this.clientData.clntWeekEnd],
      clntOtherWeekEnd: [this.clientData.clntOtherWeekEnd],
      clntEscalationDays: [this.clientData.clntEscalationDays],
      clntCleansinDays: [this.clientData.clntCleansinDays],
      clntMaxRuningRequests: [this.clientData.clntMaxRuningRequests],
      clntDelayedDays: [this.clientData.clntDelayedDays],
    });

    this.pageLoad = true;
  }

  resetForm() {
    this.clientForm.reset();
  }

  onSelectLogo(files: FileList) {
    let allowedExtentions = ['jpeg', 'jpg', 'png', 'gif'];
    this.selectedLogo = files.item(0);
    const type = this.selectedLogo.name.split('.')[1];
    if (allowedExtentions.indexOf(type) === -1) {
      this.toastr.error(`This Extension is not valid`, 'Error');
      return;
    }
    let data = new FormData();
    data.append('clntLogo', this.selectedLogo, this.selectedLogo.name);
    this.httpEndpointService
      .update(`client/update-client-logo/${this.clientData.clntKey}`, data)
      .subscribe((res) => {
        this.toastr.success(
          this.staticTranslation['LogoUpdatedSuccessfully'],
          this.staticTranslation['Success'],
        );
      });
  }

  onSubmit() {
    this.subscriptionList.push(
      this.httpEndpointService
        .update(
          `client/update/${this.clientData.clntKey}`,
          this.clientForm.value,
        )
        .subscribe(
          (res: ApiResponse) => {
            if (res.success) {
              this.toastr.success(
                this.staticTranslation['ClientDataUpdatedSuccessfully'],
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

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
