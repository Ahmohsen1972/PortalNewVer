export class FlexBase<T> {
  value: T;
  key: string;
  fieldName: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  fieldType: string;
  options: { key: string; value: string }[];

  constructor(
    options: {
      value?: T;
      key?: string;
      fieldName?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      fieldType?: string;
      options?: { key: string; value: string }[];
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.fieldName = options.fieldName || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.fieldType = options.fieldType;
    this.options = options.options || [];
  }
}
