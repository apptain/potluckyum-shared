/**
 *
 */
export interface Entity {
  name: string;
  schema: string;
  uiSchema: string;
  keyField?: string; //default to id if not specified
};