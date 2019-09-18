/**
 *
 */
export interface DocChange {
  fieldName: string;
  updatedValue: any;
  previousValue?: any;
  dateTime: Date;
  valid: boolean;
};

