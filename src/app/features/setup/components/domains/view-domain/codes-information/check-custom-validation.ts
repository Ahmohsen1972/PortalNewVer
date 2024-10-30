import { AbstractControl, ValidatorFn } from '@angular/forms';

export function checkRequired(apsRequired: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      (control.value === null ||
        control.value === undefined ||
        control.value === '') &&
      apsRequired == 'T'
    ) {
      return { RequiredField: true };
    }

    return null;
  };
}

export function checkMinMaxValidation(
  minVal: number,
  maxVal: number,
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      minVal != null &&
      maxVal != null &&
      (control.value < minVal || control.value > maxVal)
    )
      return { MinMaxNotValid: true };
    return null;
  };
}
