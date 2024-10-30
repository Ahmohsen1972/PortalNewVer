import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-fetch-user',
  templateUrl: './fetch-user.component.html',
  styleUrls: ['./fetch-user.component.scss'],
})
export class FetchUserComponent implements OnInit, OnDestroy {
  UserFetchForm: FormGroup;
  staticTranslation: any;
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
    public dialogRef: MatDialogRef<FetchUserComponent>,
    private toastr: ToastrService,
    private httpEndpointService: HttpEndpointService,
    private fb: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private localstorageservice: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.getStaticLocalization();
  }
  createUserForm() {
    this.UserFetchForm = this.fb.group({
      loginName: ['', [Validators.required]],
      clntKey: [this.sessionStorageService.getItem('clnt_key')],
    });
  }
  getStaticLocalization() {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
  }
  fetchTransaction() {
    // let params = [{ modKey: 146 } , { serviceType: 'FETCH' }];

    this.subscriptions.push(
      this.httpEndpointService
        .create('fech-business-user/data', this.UserFetchForm.value)
        .subscribe(
          (data) => {
            this.toastr.success(
              this.UserFetchForm.get('loginName').value +
                ' ' +
                this.staticTranslation['CreatedSuccessfully'],
              this.staticTranslation['Success'],
            );
            this.dialogRef.close({ action: 'confirm' });
          },
          (err) => {
            this.toastr.error(
              this.UserFetchForm.get('loginName').value +
                'Not created successfully',
              'error',
            );
          },
        ),
    );
  }
  close() {
    this.dialogRef.close({ action: 'close' });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
