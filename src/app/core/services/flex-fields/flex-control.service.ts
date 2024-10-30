import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlexBase } from './flex-base';

@Injectable()
export class FlexControlService {
  constructor() {}

  toFormGroup(questions: FlexBase<string>[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.fieldName] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
