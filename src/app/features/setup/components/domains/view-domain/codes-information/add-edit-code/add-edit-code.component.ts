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

@Component({
  selector: 'app-add-edit-code',
  templateUrl: './add-edit-code.component.html',
  styleUrls: ['./add-edit-code.component.scss'],
})
export class AddEditCodeComponent implements OnInit {
  codeForm: FormGroup;
  checked = false;
  subscriptionList: Subscription[] = [];
  subscriptions: Subscription[] = [];
  parentNameData = [];
  public codeFilteredOptions: Observable<any[]>;
  pageLoad;
  btnAction;
  staticTranslation: any;
  //checked=false;

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

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helpersService: HelpersService,
    private localstorageservice: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    public dialogRef: MatDialogRef<AddEditCodeComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getParentName();
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    if (this.data.status === 'create') {
      this.createCodeForm();
    } else {
      // this.ithmaarPortalService.log("create ");

      this.getCodeForm();
    }
  }

  codeFilterOptions() {
    this.ithmaarPortalService.log(
      'this.parentNameData > 111 : ',
      this.parentNameData,
    );
    this.codeFilteredOptions = this.codeForm
      ?.get('parentName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.code_filter(value)),
      );
  }
  private code_filter(value: string): string[] {
    this.ithmaarPortalService.log(
      'this.parentNameData > 222 : ',
      this.parentNameData,
    );

    const filterValue = value.toLowerCase();
    return this.parentNameData.filter(
      (option) => option.column.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  onCodeSelection(module) {
    this.ithmaarPortalService.log(
      'module .option.valuen 22> : ',
      this.codeForm.value.parentName,
    );

    this.parentNameData.filter((value) => {
      if (value.column === module.option.value) {
        this.ithmaarPortalService.log('value.Name > : ', value.column);
        this.ithmaarPortalService.log('value.code > : ', value.cgKey);
        this.codeForm.value.cgKeyParent = value.cgKey;
        this.ithmaarPortalService.log(
          'module cgKeyParent 22> : ',
          this.codeForm.value.cgKeyParent,
        );
        this.ithmaarPortalService.log(
          'module parentName 22> : ',
          this.codeForm.value.parentName,
        );
        /*
          this.mainInfoForm.patchValue({
            modKey: value.Code
          })
*/
      }
    });
  }

  createCodeForm() {
    this.ithmaarPortalService.log('this.data.row 22> : ', this.data.row);

    this.btnAction = 'Save';
    this.codeForm = this.fb.group({
      rvLowValue: [],
      rvMeaning: [],
      orderHint: [],
      rvForeignMeaning: [],
      cgKeyParent: [],
      parentName: [],
      visible: 'F',
      cgKey: [],
      rvKey: [this.data.row],
    });
    this.pageLoad = true;
    this.checked = true;
  }
  getCodeForm() {
    this.btnAction = 'Update';
    let data = this.data.row;
    this.ithmaarPortalService.log('payload  data  >> ', this.data);

    this.codeForm = this.fb.group({
      rvLowValue: [this.helpersService.getDotObject(data, 'rvLowValue', '')],
      rvMeaning: [this.helpersService.getDotObject(data, 'rvMeaning', '')],
      orderHint: [this.helpersService.getDotObject(data, 'orderHint', '')],
      rvForeignMeaning: [
        this.helpersService.getDotObject(data, 'rvForeignMeaning', ''),
      ],
      cgKeyParent: [this.helpersService.getDotObject(data, 'cgKeyParent', '')],
      parentName: [this.helpersService.getDotObject(data, 'parentName', '')],
      visible: data.visible,
    });
    this.pageLoad = true;
    if (data.visible === 'T') {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  getParentName() {
    let cgKey = this.helpersService.getDotObject(this.data.code, 'cgKey', '');
    this.subscriptions.push(
      this.httpEndPoint
        .getAll(`domains-lov/all`)
        .subscribe((res: ApiResponse) => {
          this.parentNameData = res.payload;
          this.ithmaarPortalService.log(
            'payload  parentName  >> ',
            this.parentNameData,
          );
          this.codeFilterOptions();
          /* res.payload.forEach((Name: String) => { 
            this.parentName.push(Name["column"])
            this.ithmaarPortalService.log("Name 2 >> ",Name["column"])

           })
          */
        }),
    );
    //this.codeFilterOptions()
  }

  getParentNameByCgKey() {
    let cgKeyParent = this.codeForm.value.cgKeyParent;
    //parentName
    //let column=  this.helpersService.getDotObject(this.data.code,'cgKey','')
    //this.subscriptions.push(

    this.httpEndPoint
      .getAll(`domains-lov/${cgKeyParent}`)
      .subscribe((res: ApiResponse) => {
        //this.parentName = res.payload;
        let data = res.payload;
        this.ithmaarPortalService.log('payload   column >> ', res.payload);
        data.forEach((element) => {
          this.ithmaarPortalService.log('payload   column >> ', element.column);
          this.codeForm.value.parentName = element.column;
        });
        /* res.payload.forEach((Name: String) => { 
              this.parentName.push(Name["column"])
              this.ithmaarPortalService.log("Name 2 >> ",Name["column"])
              
  
             })
            */
      });
  }
  onSubmitCodes() {
    //this.getParentNameByCgKey()

    //this.codeForm.value.parentName =this.parentName[this.codeForm.value.cgKeyParent]
    //this.ithmaarPortalService.log("parentName    >> ",this.parentName[this.codeForm.value.cgKeyParent])
    if (this.codeForm.valid) {
      this.codeForm.value.visible = this.checked ? 'T' : 'F';
      if (this.data.status === 'create') {
        this.addCodes();
      } else {
        this.editCodes();
      }
    }
  }
  addCodes() {
    //this.codeForm.value.cgKeyParent=value

    this.ithmaarPortalService.log(
      ' this.codeForm.valid  ',
      this.codeForm.valid,
    );
    this.ithmaarPortalService.log('this.codeForm.value  ', this.codeForm.value);

    if (this.codeForm.valid) {
      this.data.row;
      this.codeForm.value.rvKey = this.data.row;
      this.ithmaarPortalService.log(
        ' this.data.rvKey  ',
        this.codeForm.value.rvKey,
      );
      this.ithmaarPortalService.log(
        'this.codeForm.value  ',
        this.codeForm.value,
      );
      this.subscriptions.push(
        this.httpEndPoint
          .create(`codes/add`, this.codeForm.value)
          .subscribe((res: ApiResponse) => {
            if (res.success) {
              this.toastr.success(
                this.staticTranslation['CodeAddedSuccessfully'],
                this.staticTranslation['Success'],
              );
              this.dialogRef.close({ action: 'confirm' });
            }
          }),
      );
    }
  }
  editCodes() {
    this.ithmaarPortalService.log('this.codeForm.value  ', this.codeForm.value);
    this.codeForm.value.rvKey;
    this.subscriptions.push(
      this.httpEndPoint
        .update(`codes/update/${this.data.row.cgKey}`, this.codeForm.value)
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.toastr.success(
              this.staticTranslation['CodeUpdatedSuccessfully'],
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
