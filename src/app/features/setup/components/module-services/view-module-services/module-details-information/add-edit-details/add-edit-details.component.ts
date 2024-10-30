import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HelpersService } from 'app/core/services/helpers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { ManageContactsService } from 'app/features/user-profile/services/manage-contacts.service';

@Component({
  selector: 'app-add-edit-details',
  templateUrl: './add-edit-details.component.html',
  styleUrls: ['./add-edit-details.component.scss'],
})
export class AddEditDetailsComponent implements OnInit {
  modNameData = [];
  mainModLocalnameData = [];
  params;
  paramsServType;
  mainInfoForm: FormGroup;
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
  public ServTypeFilteredOptions: Observable<any[]>;
  public moduleFilteredOptions: Observable<any[]>;
  buttonAction;
  pageLoad: boolean = false;
  staticTranslation: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helpersService: HelpersService,
    private manageContactsService: ManageContactsService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddEditDetailsComponent>,
    private ithmaarPortalService: IthmaarPortalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.ithmaarPortalService.log("status : 'create'", this.data.status);
    this.getLov();
    if (this.data.status === 'create') {
      this.createMainServiceForm();
      this.buttonAction = 'Save';
    } else {
      this.buttonAction = 'Update';
      this.getMainServiceForm();
    }
  }
  getLov() {
    this.params = [{ lovKey: 29 }, { ilmKey: 88 }];

    this.subscriptionList.push(
      this.httpEndPoint
        .getAll(`module-att-lovs/all/${this.data.row.modKey}`)
        .subscribe((data: ApiResponse) => {
          this.modNameData = data.payload;

          this.moduleFilterOptions();
          this.ithmaarPortalService.log(
            ' this.modNameData  ><>/ ',
            this.modNameData,
          );
          this.ithmaarPortalService.log('data.payload.data ', data.payload);
        }),
    );
  }

  moduleFilterOptions() {
    this.moduleFilteredOptions = this.mainInfoForm
      ?.get('distination')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.module_filter(value)),
      );
  }
  private module_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.modNameData.filter(
      (option) => option.maLocalName.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  onModuleSelection(module) {
    this.ithmaarPortalService.log(
      'module .option.valuen > : ',
      module.option.value,
    );

    this.modNameData.filter((value) => {
      if (value.maLocalName === module.option.value) {
        this.ithmaarPortalService.log('value.Name > : ', value.maLocalName);
        this.ithmaarPortalService.log('value.Name > : ', value.maKey);
        this.ithmaarPortalService.log('value > : ', value);
        this.mainInfoForm.value.maKey = value.maKey;
        this.ithmaarPortalService.log(
          'mainInfoForm : ',
          this.mainInfoForm.value.maKey,
        );
      }
    });
  }

  createMainServiceForm() {
    this.mainInfoForm = this.fb.group({
      scmKey: [],
      source: [],
      maKey: [],
      distination: [],
      modKey: [],
      imsKey: [],
    });
    this.pageLoad = true;
  }

  getMainServiceForm() {
    let data = this.data.row;
    this.mainInfoForm = this.fb.group({
      scmKey: [this.helpersService.getDotObject(data, 'scmKey', '')],
      source: [this.helpersService.getDotObject(data, 'source', '')],
      maKey: [this.helpersService.getDotObject(data, 'maKey', '')],
      modKey: [this.helpersService.getDotObject(data, 'modKey', '')],
      distination: [this.helpersService.getDotObject(data, 'distination', '')],
      imsKey: [this.helpersService.getDotObject(data, 'imsKey', '')],
    });
    this.pageLoad = true;
  }

  onSubmit() {
    //this.codeForm.value.parentName =this.parentName[this.codeForm.value.cgKeyParent]
    //this.ithmaarPortalService.log("parentName    >> ",this.parentName[this.codeForm.value.cgKeyParent])
    if (this.mainInfoForm.valid) {
      if (this.data.status === 'create') {
        this.createModAtt();
      } else {
        this.editModAtt();
      }
    }
  }

  editModAtt() {
    this.ithmaarPortalService.log('this.modAttForm.value  ', this.data);
    this.mainInfoForm.value.sysKey = 1;
    this.mainInfoForm.value.imsKey = this.data.row.imsKey;
    this.mainInfoForm.value.modKey = this.data.row.modKey;

    this.ithmaarPortalService.log(
      'this.modAttForm.value  ',
      this.mainInfoForm.value,
    );
    this.subscriptions.push(
      this.httpEndPoint
        .update(
          `column-service/update/${this.mainInfoForm.value.scmKey}`,
          this.mainInfoForm.value,
        )
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.ngOnInit();
            this.toastr.success(
              this.staticTranslation['ModuleAttributeUpdatedSuccessfully'],
              this.staticTranslation['Success'],
            );
            this.dialogRef.close({ action: 'confirm' });
          }
        }),
    );
  }

  createModAtt() {
    // this.ithmaarPortalService.log("this.mainInfoForm.value.imskeyparent",this.mainInfoForm.value.imskeyparent)

    this.mainInfoForm.value.imsKey = this.data.row.imsKey;
    this.mainInfoForm.value.modKey = this.data.row.modKey;

    this.mainInfoForm.value.sysKey = 1;
    this.ithmaarPortalService.log(
      'this.modAttForm.value  ',
      this.mainInfoForm.value,
    );
    this.subscriptions.push(
      this.httpEndPoint
        .create(`column-service/add`, this.mainInfoForm.value)
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.ngOnInit();
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
