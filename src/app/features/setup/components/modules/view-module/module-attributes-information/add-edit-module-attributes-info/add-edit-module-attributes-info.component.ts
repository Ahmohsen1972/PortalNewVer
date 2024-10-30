import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HelpersService } from 'app/core/services/helpers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-add-edit-module-attributes-info',
  templateUrl: './add-edit-module-attributes-info.component.html',
  styleUrls: ['./add-edit-module-attributes-info.component.scss'],
})
export class AddEditModuleAttributesInfoComponent implements OnInit, OnDestroy {
  modAttributesNamesData = [];
  btnAction: string;
  modAttForm: FormGroup;
  checked = false;
  subscriptionList: Subscription[] = [];
  subscriptions: Subscription[] = [];
  apsEnabledData = [
    { label: 'True', value: 'T' },
    { label: 'False', value: 'F' },
  ];
  apsRequiredData = [
    { label: 'True', value: 'T' },
    { label: 'False', value: 'F' },
  ];
  apsVisibleData = [
    { label: 'True', value: 'T' },
    { label: 'False', value: 'F' },
  ];
  isDisabled = false;
  pageLoad: boolean = false;
  staticTranslation: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ithmaarPortalService: IthmaarPortalService,
    private helpersService: HelpersService,
    private localStorgeService: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditModuleAttributesInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorgeService.getItem('static_translation');
    this.checkStatus();
  }

  checkStatus() {
    if (this.data.status === 'create') {
      this.btnAction = 'save';
      this.createModAttForm();
      this.callModAttributeLov();
    } else {
      this.btnAction = 'update';
      this.getModAttForm();
    }
  }

  callModAttributeLov() {
    this.subscriptionList.push(
      this.httpEndPoint
        .getAll(`module-att-lovs/all/${this.data.modKey}`)
        .subscribe((data) => {
          this.modAttributesNamesData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  createModAttForm() {
    this.modAttForm = this.fb.group({
      maKey: [''],
      apsEnabled: [''],
      apsRequired: [''],
      apsVisible: [''],
      sysKey: [1],
      masKey: [this.data.masKey],
    });
  }

  getModAttForm() {
    let data = this.data.row;
    this.modAttForm = this.fb.group({
      maLocalName: [this.helpersService.getDotObject(data, 'maLocalName', '')],
      apsEnabled: [this.helpersService.getDotObject(data, 'apsEnabled', '')],
      apsRequired: [this.helpersService.getDotObject(data, 'apsRequired', '')],
      apsVisible: [this.helpersService.getDotObject(data, 'apsVisible', '')],
    });
    this.pageLoad = true;
  }

  onSubmit() {
    if (this.modAttForm.valid) {
      if (this.data.status == 'create') {
        this.addModAtt();
      } else {
        this.editModAtt();
      }
    }
  }

  editModAtt() {
    this.ithmaarPortalService.log(
      'this.modAttForm.value  ',
      this.modAttForm.value,
    );
    this.subscriptions.push(
      this.httpEndPoint
        .update(
          `mod-att-setup/update/${this.data.row.apsKey}`,
          this.modAttForm.value,
        )
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.isDisabled = true;
            this.toastr.success(
              this.staticTranslation['ModuleAttributeUpdatedSuccessfully'],
              this.staticTranslation['Success'],
            );
            this.dialogRef.close({ action: 'confirm' });
          }
        }),
    );
  }

  addModAtt() {
    this.ithmaarPortalService.log(
      'this.modAttForm.value  ',
      this.modAttForm.value,
    );
    this.subscriptions.push(
      this.httpEndPoint
        .create(`mod-att-setup/add`, this.modAttForm.value)
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.isDisabled = true;
            this.toastr.success(
              this.staticTranslation['ModuleAttributeAddedSuccessfully'],
              this.staticTranslation['Success'],
            );
            this.dialogRef.close({ action: 'confirm' });
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
