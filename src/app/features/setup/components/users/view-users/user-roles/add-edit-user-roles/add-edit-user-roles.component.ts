import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HelpersService } from 'app/core/services/helpers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-add-edit-user-roles',
  templateUrl: './add-edit-user-roles.component.html',
  styleUrls: ['./add-edit-user-roles.component.scss'],
})
export class AddEditUserRolesComponent implements OnInit, OnDestroy {
  userRolesForm: FormGroup;
  subscriptions: Subscription[] = [];
  userRolesData: any;
  rolesLovData = [];
  btnAction: string;
  selectedOperation: string;
  pageLoad: boolean = false;
  params: any;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helpersService: HelpersService,
    private localstorageservice: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditUserRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.checkStatus();
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
  }

  checkStatus() {
    if (this.data.status == 'create') {
      this.callLovService();
      this.createUserRolesForm();
    } else {
      this.userRolesData = this.data.row;
      this.callLovService();
      this.getUserRolesForm();
    }
  }

  callLovService() {
    this.params = [{ lovKey: 31 }, { ilmKey: 89 }];
    this.subscriptions.push(
      this.httpEndPoint
        .getBy('lov/fetch', this.params, 'path')
        .subscribe((result: ApiResponse) => {
          this.rolesLovData = result.payload.data;
        }),
    );
  }

  createUserRolesForm() {
    this.btnAction = 'save';
    this.userRolesForm = this.fb.group({
      rolKey: [''],
      usrKey: [this.data.usrKey],
      sysKey: [1],
    });
    this.pageLoad = true;
  }

  getUserRolesForm() {
    this.btnAction = 'Update';
    this.userRolesForm = this.fb.group({
      rolKey: [this.userRolesData.rolKey],
      usrKey: [this.userRolesData.usrKey],
      sysKey: [1],
    });
    this.pageLoad = true;
  }

  onSubmit() {
    if (this.userRolesForm.valid) {
      if (this.data.status == 'create') {
        this.addRole();
      } else {
        this.updateRole();
      }
    }
  }

  addRole() {
    this.subscriptions.push(
      this.httpEndPoint
        .create(`user-roles/add/`, this.userRolesForm.value)
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.toastr.success(
              this.staticTranslation['UserRoleAddedSuccessfully'],
              this.staticTranslation['Success'],
            );
            this.dialogRef.close({ action: 'confirm' });
          }
        }),
    );
  }

  updateRole() {
    this.subscriptions.push(
      this.httpEndPoint
        .update(
          `user-roles/update/${this.userRolesData.rlusKey}`,
          this.userRolesForm.value,
        )
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.toastr.success(
              this.staticTranslation['UserRoleUpdatedSuccessfully'],
              this.staticTranslation['Success'],
            );
            this.dialogRef.close({ action: 'confirm' });
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
