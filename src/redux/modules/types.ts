import {JsonPredicate} from "json-predicate";

// Misc
export type KeyValueObject = {
  [key: string]: any;
};

// State Change
export type StepFn = (
  values: KeyValueObject,
  wizardState: WizardState,
) => string | null;
export type StepPredicate = {predicate: JsonPredicate; to: string};

// Reducer
export type StepConfiguration = {
  name: string;
  previous: string | null;
  next: (string | null) | (Array<StepPredicate> | null) | (StepFn | null);
  finish: boolean;
};
export type WizardState = {
  currentStep: string;
  stack: Array<string>;
  steps: {
    [key: string]: StepConfiguration;
  };
};
export type WizardsReducerState = {
  [key: string]: WizardState;
};

// Actions
export type FluxStandardAction<T, P> = {
  type: T;
  error?: boolean;
  payload?: P;
};
export type InitializeWizardAction = FluxStandardAction<
  "@react-redux-wizard/INITIALIZE",
  {name: string; firstStep: string}
  >;
export type RegisterStepAction = FluxStandardAction<
  "@react-redux-wizard/REGISTER_STEP",
  {name: string; step: {name: string}}
  >;
export type PreviousStepAction = FluxStandardAction<
  "@react-redux-wizard/PREVIOUS_STEP",
  {name: string}
  >;
export type NextStepAction = FluxStandardAction<
  "@react-redux-wizard/NEXT_STEP",
  {name: string; values: KeyValueObject}
  >;
export type DestroyWizardAction = FluxStandardAction<
  "@react-redux-wizard/DESTROY",
  {name: string}
  >;

export type WizardActions =
| InitializeWizardAction
| RegisterStepAction
| PreviousStepAction
| NextStepAction
| DestroyWizardAction;