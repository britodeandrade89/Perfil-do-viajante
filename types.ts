export enum FieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[];
  defaultValue?: string | number | boolean;
}

export interface FormSchema {
  title: string;
  description: string;
  submitButtonText: string;
  fields: FormField[];
}
