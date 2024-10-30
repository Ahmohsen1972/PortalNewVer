import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Employer } from 'app/core/classes/Employer';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { checkRequired } from 'app/features/transactions/components/customer-request/components/create-request/check-custom-validation';

@Component({
  selector: 'app-add-new-employer',
  templateUrl: './add-new-employer.component.html',
  styleUrls: ['./add-new-employer.component.scss'],
})
export class AddNewEmployerComponent implements OnInit, OnDestroy {
  constructor(
    private httpEndpointService: HttpEndpointService,
    @Inject(MAT_DIALOG_DATA) private recievedData: any,
    private sessionStorageService: SessionStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private localstorageservice: LocalStorageService,
    private dialogRef: MatDialogRef<AddNewEmployerComponent>,
  ) {}

  employerObj: any;
  employerObjSetter: Employer = new Employer();
  action: string;
  actionBtn: string;
  private subscriptions: Subscription[] = [];

  employerForm: FormGroup;
  rowId: any;
  row: any;
  probertyData: any;
  params: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.getCustomProperties();
  }
  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupEmployer },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.ithmaarPortalService.log(
            'property data in add / edit employer  :',
            this.probertyData,
          );
          this.createEmployerForm();
          this.updateEmployerForm();
          this.pageLoad = true;
        }),
    );
  }
  updateEmployerForm() {
    this.row = this.recievedData.row;
    if (this.row) {
      this.rowId = this.recievedData.row.weKey;
      this.action = 'btn.Update';
      this.actionBtn = 'btn.Update';
      let params = [{ id: this.rowId }];
      this.subscriptions.push(
        this.httpEndpointService
          .getBy('employer', params, 'path')
          .subscribe((data: ApiResponse) => {
            this.employerObj = data.payload;
            this.employerForm
              .get('employerCode')
              .setValue(this.employerObj.weCode);
            this.employerForm
              .get('employerLName')
              .setValue(this.employerObj.weLocalName);
            this.employerForm
              .get('employerFName')
              .setValue(this.employerObj.weForeignName);
          }),
      );
    } else {
      this.action = 'btn.Add';
      this.actionBtn = 'btn.Save';
    }
  }

  createEmployerForm() {
    this.employerForm = new FormGroup({
      employerCode: new FormControl(
        {
          value: '',
          disabled: this.probertyData['weCode']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['weCode']['apsRequired'])],
      ),
      employerLName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['weLocalName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['weLocalName']['apsRequired'])],
      ),
      employerFName: new FormControl(
        {
          value: '',
          disabled: this.probertyData['weForeignName']['apsEnabled'] == 'F',
        },
        [checkRequired(this.probertyData['weForeignName']['apsRequired'])],
      ),
    });
  }
  onSubmit() {
    if (this.rowId) {
      this.employerObjSetter.setWeKey(this.employerObj.weKey);
      this.setSharedFields();
      this.subscriptions.push(
        this.httpEndpointService
          .update('employer/' + this.employerObj.weKey, this.employerObjSetter)
          .subscribe((data: ApiResponse) => {}),
      );
    } else {
      this.setSharedFields();
      this.subscriptions.push(
        this.httpEndpointService
          .create('employer/new', this.employerObjSetter)
          .subscribe(
            (data: ApiResponse) => {},
            (err) => {
              this.ithmaarPortalService.log('err__>', err);
            },
          ),
      );
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  setSharedFields() {
    this.employerObjSetter.setWeCode(
      this.employerForm.get('employerCode').value,
    );
    this.employerObjSetter.setWeLocalName(
      this.employerForm.get('employerLName').value,
    );
    this.employerObjSetter.setWeForeignName(
      this.employerForm.get('employerFName').value,
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
