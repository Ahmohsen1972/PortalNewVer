import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() variableValue;
  @Input() controlType;
  @Input() caption;
  @Input() dataType;
  @Input() variableName;
  @Input() dataSource: any[];
  @Input() fDisable;
  @Input() required;
  @Input() lovKey;
  @Input() ilmKey;
  @Input() parentValue;
  @Input() childOf;
  @Input() parentTo;
  @Input() form: FormGroup;
  @Input() lovPage: string;
  serviceVariable;
  subscriptions: Subscription[] = [];
  params = [];
  controlValue: any;
  constructor(
    private sessionStorageService: SessionStorageService,
    private transferDataService: TransferDataService,
    private httpEndpointService: HttpEndpointService,
    private ithmaarService: IthmaarPortalService,
  ) {}

  ngOnInit(): void {
    this.fillSessionStorageVariablesInCaseOfUpdate();
    this.transferDataService.updateDependentlov.next(null);
    this.transferDataService
      .getBehaviourSubjectUpdateDependentLov()
      .subscribe((res) => {
        if (res != null) {
          if (
            this.childOf != null &&
            this.controlType == 'D' &&
            this.childOf['attributePage'] == res
          ) {
            this.dataSource = [];
            this.controlValue = '';
          }
        }
      });
  }

  callLovServices(pageControlName, lovKey, ilmKey) {
    if (this.dataSource.length == 0) {
      if (this.childOf != null) {
        for (let att in this.childOf[this.lovPage]) {
          this.form.patchValue({
            [this.childOf[this.lovPage][att]]:
              this.sessionStorageService.getItem(
                this.childOf[this.lovPage][att],
              ),
          });
        }

        this.params = [{ lovKey: lovKey }, { ilmKey: ilmKey }].concat(
          this.ithmaarService.filterLovGeneral(
            this.childOf,
            this.form.value,
            this.lovPage,
          ),
        );
      } else {
        this.params = [{ lovKey: lovKey }, { ilmKey: ilmKey }];
      }

      this.subscriptions.push(
        this.httpEndpointService
          .getBy('lov/fetch', this.params, 'path')
          .subscribe((result: ApiResponse) => {
            this.dataSource = result.payload.data;
            this.dataSource.filter((value) => {
              if (value.code === this.variableValue) {
                this.controlValue = value.local_name;
              }
            });
          }),
      );
    }
  }

  fillSessionStorageVariablesInCaseOfUpdate() {
    this.controlValue = this.variableValue != null ? this.variableValue : '';
    if (this.controlValue != '') {
      this.setValue();
      if (this.controlType == 'D') this.controlValue = '';
      this.callLovServices(this.variableName, this.lovKey, this.ilmKey);
    }
  }

  getDateFormat(value) {
    const pipe = new DatePipe('en-US');
    value = pipe.transform(value, 'yyyy-MM-dd');
    this.controlValue = value;
  }

  validateValue(value) {
    this.ithmaarService
      .validateLovValue(value, this.dataSource)
      .subscribe((valid) => {
        this.ithmaarService.log('is valid  : ', valid);
        if (!valid) this.controlValue = '';
      });
  }

  setValue() {
    if (this.dataType == 'Z') {
      let date = new Date();
      date = this.controlValue;
      this.getDateFormat(date);
    }

    if (this.controlType == 'D' && this.parentTo != null) {
      for (let att in this.parentTo['attributePage']) {
        this.sessionStorageService.removeItem(
          this.parentTo['attributePage'][att],
        );

        this.form.patchValue({
          [this.parentTo['attributePage'][att]]: null,
        });
      }
      this.transferDataService.updateDependentlov.next(this.variableName);
    }
    this.sessionStorageService.setItem(this.variableName, this.controlValue);
  }

  setValue2(supObj) {
    this.dataSource.filter((value) => {
      if (value.local_name === supObj.option.value) {
        this.sessionStorageService.setItem(this.variableName, value.code);
      }
    });

    if (this.dataType == 'Z') {
      let date = new Date();
      date = this.controlValue;
      this.getDateFormat(date);
    }

    if (this.controlType == 'D' && this.parentTo != null) {
      for (let att in this.parentTo['attributePage']) {
        this.sessionStorageService.removeItem(
          this.parentTo['attributePage'][att],
        );

        this.form.patchValue({
          [this.parentTo['attributePage'][att]]: null,
        });
      }
      this.transferDataService.updateDependentlov.next(this.variableName);
    }
  }
}
