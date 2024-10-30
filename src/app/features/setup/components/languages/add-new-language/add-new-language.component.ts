import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { Language } from 'app/core/classes/Language';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-add-new-language',
  templateUrl: './add-new-language.component.html',
  styleUrls: ['./add-new-language.component.scss'],
})
export class AddNewLanguageComponent implements OnInit, OnDestroy {
  languageObj: any;
  languageObjSetter: Language = new Language();
  languagesDirectionData = ['RTL', 'LTR'];
  action: string;
  actionBtn: string;
  private subscriptions: Subscription[] = [];
  languageForm: FormGroup;
  rowId: number;
  row: Language;
  probertyData: any;
  params: any;
  pageLoad: boolean = false;
  checked = false;
  isDisabled: boolean = false;
  staticTranslation: any;

  constructor(
    private toastr: ToastrService,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    @Inject(MAT_DIALOG_DATA) private recievedData: any,
    private dialogRef: MatDialogRef<AddNewLanguageComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    this.createLanguageForm();
    this.updateLanguageForm();
  }

  getCustomProperties() {
    this.params = [{ modKey: 15 }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.ithmaarPortalService.log(
            'property data in add / edit language  :',
            this.probertyData,
          );
          this.createLanguageForm();
          this.updateLanguageForm();
          this.pageLoad = true;
        }),
    );
  }

  updateLanguageForm() {
    this.row = this.recievedData.row;
    if (this.row) {
      this.rowId = this.recievedData.row.langKey;

      this.action = 'btn.Update';
      this.actionBtn = 'Update';
      let params = [{ id: this.rowId }];
      this.subscriptions.push(
        this.httpEndpointService
          .getBy('languages-admin', params, 'path')
          .subscribe((data: ApiResponse) => {
            this.languageObj = data.payload;
            this.languageForm
              .get('langLocalName')
              .setValue(this.languageObj.langLocalName);
            this.languageForm
              .get('langForeignName')
              .setValue(this.languageObj.langForeignName);
            this.languageForm
              .get('langdisplayOrder')
              .setValue(this.languageObj.langdisplayOrder);
            this.languageForm.get('langDir').setValue(this.languageObj.langDir);
            this.languageForm
              .get('langsShortName')
              .setValue(this.languageObj.langsShortName);
            this.languageForm
              .get('langIsDefault')
              .setValue(this.languageObj.langIsDefault);
            this.checkeds();
          }),
      );
    } else {
      this.languageForm.get('langLocalName').setValue('');
      this.languageForm.get('langForeignName').setValue('');
      this.languageForm.get('langdisplayOrder').setValue('');
      this.languageForm.get('langDir').setValue('');
      this.languageForm.get('langsShortName').setValue('');
      this.languageForm.get('langIsDefault').setValue('F');
      this.checked = false;
      this.action = 'btn.Add';
      this.actionBtn = 'Save';
    }
  }

  checkeds() {
    if (this.languageObj.langIsDefault === 'T') {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  createLanguageForm() {
    this.pageLoad = true;
    this.languageForm = new FormGroup({
      langLocalName: new FormControl({ value: '' }),
      //  disabled : this.probertyData['langLocalName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['langLocalName']['apsRequired'])]),
      langIsDefault: new FormControl({ value: ' ' }),
      //disabled : this.probertyData['langIsDefault']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['langIsDefault']['apsRequired'])]),
      langForeignName: new FormControl({ value: '' }),
      //disabled : this.probertyData['langForeignName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['langForeignName']['apsRequired'])]),
      langdisplayOrder: new FormControl({ value: '' }),
      // disabled : this.probertyData['langdisplayOrder']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['langdisplayOrder']['apsRequired'])]),
      langDir: new FormControl({ value: '' }),
      // disabled : this.probertyData['langDir']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['langDir']['apsRequired'])]),
      langsShortName: new FormControl({ value: '' }),
      //disabled : this.probertyData['langsShortName']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['langsShortName']['apsRequired'])]),
      sysKey: new FormControl(1),
      //disabled : this.probertyData['sysKey']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['sysKey']['apsRequired'])]),
      clntKey: new FormControl(1),
      //disabled : this.probertyData['clntKey']['apsEnabled']=='F'},
      //[checkRequired(this.probertyData['clntKey']['apsRequired'])]),
    });
  }

  onSubmit() {
    if (this.rowId) {
      this.languageObjSetter.setLangKey(this.languageObj.langKey);
      this.setSharedFields();
      this.ithmaarPortalService.log('ya darsh' + ' ' + this.languageObjSetter);
      this.close();

      this.subscriptions.push(
        this.httpEndpointService
          .update(
            'languages-admin/update/' + this.languageObj.langKey,
            this.languageObjSetter,
          )
          .subscribe(
            (data: ApiResponse) => {
              this.isDisabled = true;
              if (data.success) {
                this.toastr.success(
                  this.staticTranslation['LanguageUpdatedSuccessfully'],
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
    } else {
      this.ithmaarPortalService.log('ya darsh' + ' ', this.languageObjSetter);
      this.setSharedFields();

      this.subscriptions.push(
        this.httpEndpointService
          .create('languages-admin/add', this.languageObjSetter)
          .subscribe(
            (data: ApiResponse) => {
              this.isDisabled = true;
              if (data.success) {
                this.toastr.success(
                  this.staticTranslation['LanguageAddedSuccessfully'],
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
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  setSharedFields() {
    this.languageObjSetter.setLangLocalName(
      this.languageForm.get('langLocalName').value,
    );
    let ch = this.checked ? 'T' : 'F';

    this.languageObjSetter.setLangIsDefault(ch);
    this.languageObjSetter.setLangForeignName(
      this.languageForm.get('langForeignName').value,
    );
    this.languageObjSetter.setLangdisplayOrder(
      this.languageForm.get('langdisplayOrder').value,
    );
    this.languageObjSetter.setLangDir(this.languageForm.get('langDir').value);
    this.languageObjSetter.setLangsShortName(
      this.languageForm.get('langsShortName').value,
    );
    this.languageObjSetter.setSysKey(this.languageForm.get('sysKey').value);
    this.languageObjSetter.setClntKey(this.languageForm.get('clntKey').value);
  }

  onChangeDirection(value) {
    this.languageObjSetter.setLangDir(value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
