import { test } from 'json-predicate';

import {
  DestroyWizardAction,
  InitializeWizardAction, KeyValueObject, NextStepAction,
  PreviousStepAction,
  RegisterStepAction,
  StepConfiguration,
  StepFn,
  StepPredicate,
  WizardActions, WizardsReducerState, WizardState,
} from './types';

export const INITIALIZE = '@react-redux-wizard/INITIALIZE'
export const REGISTER_STEP = '@react-redux-wizard/REGISTER_STEP'
export const PREVIOUS_STEP = '@react-redux-wizard/PREVIOUS_STEP'
export const NEXT_STEP = '@react-redux-wizard/NEXT_STEP'
export const DESTROY = '@react-redux-wizard/DESTROY'

export const initializeWizard = (name, firstStep): InitializeWizardAction =>
  ({ type: INITIALIZE, payload: { name, firstStep } })

export const registerStep = (name, step: StepConfiguration): RegisterStepAction =>
  ({ type: REGISTER_STEP, payload: { name, step } })

export const previousStep = (name): PreviousStepAction =>
  ({ type: PREVIOUS_STEP, payload: { name } })

export const nextStep = (name, values: KeyValueObject): NextStepAction =>
  ({ type: NEXT_STEP, payload: { name, values } })

export const destroyWizard = (name): DestroyWizardAction =>
  ({ type: DESTROY, payload: { name } })

function getCurrentStep (name, state: WizardsReducerState = {}): StepConfiguration {
  const wizardState: WizardState = state[name]
  const currentStep = wizardState.currentStep
  return wizardState.steps[currentStep]
}

function computePreviousStep (currentStep: StepConfiguration, oldStack: Array<string> = []): string {
  return currentStep.previous || oldStack[oldStack.length - 2]
}

function computeNextStep (currentStep: StepConfiguration, values: KeyValueObject = {}, wizardState: WizardState): string {
  if (!currentStep.next) {
    return null
  } else if (Array.isArray(currentStep.next)) {
    const stepPredicates: Array<StepPredicate> = currentStep.next
    const stepPredicate: StepPredicate = stepPredicates.find(
      ({ predicate }) => test(values, predicate)
    )
    return stepPredicate ? stepPredicate.to : null
  } else if (typeof currentStep.next === 'function') {
    const stepFn: StepFn = currentStep.next
    return stepFn(values, wizardState)
  } else if (typeof currentStep.next === 'string') {
    const nextStep = currentStep.next
    return nextStep
  }
}

function rollbackStackTo (stepName, oldStack: Array<string> = []): Array<string> {
  const newStack = [ ...oldStack ]
  while (newStack.length !== 0) {
    const lastStep = newStack.pop()
    if (lastStep === stepName) {
      return [ ...newStack, stepName ]
    }
  }
  return [ ...oldStack, stepName ]
}

export const initialState = {};

export default function wizards (
  state: WizardsReducerState = initialState,
  action: WizardActions
): WizardsReducerState {
  if (!action) {
    return state
  }

  switch (action.type) {
    case INITIALIZE: {
      // @ts-ignore
      const { name, firstStep } = action.payload || {}
      return {
        ...state,
        [name]: {
          currentStep: firstStep,
          steps: {},
          stack: [ firstStep ]
        }
      }
    }
    case REGISTER_STEP: {
      // @ts-ignore
      const { name, step } = action.payload || {}
      return {
        ...state,
        [name]: {
          ...state[name],
          steps: {
            ...state[name].steps,
            [step.name]: step
          }
        }
      }
    }
    case PREVIOUS_STEP: {
      // @ts-ignore
      const { name } = action.payload || {}
      const currentStep = getCurrentStep(name, state)
      const previousStep = computePreviousStep(currentStep, state[name].stack)
      if (!previousStep) {
        console.error(`${name} could not progress because the previousStep was null`)
        return state
      }
      const stack = rollbackStackTo(previousStep, state[name].stack)
      return {
        ...state,
        [name]: {
          ...state[name],
          currentStep: previousStep,
          stack
        }
      }
    }
    case NEXT_STEP: {
      // @ts-ignore
      const { name, values } = action.payload || {}
      const currentStep = getCurrentStep(name, state)
      if (currentStep.finish) {
        console.error(`${name} could not progress because it is finished`)
        return state
      }
      const nextStep = computeNextStep(currentStep, values, state[name])
      if (!nextStep) {
        console.error(`${name} could not progress because the nextStep was null`)
        return state
      }
      const oldStack = state[name].stack
      const stack = [ ...oldStack, nextStep ]
      return {
        ...state,
        [name]: {
          ...state[name],
          currentStep: nextStep,
          stack
        }
      }
    }
    case DESTROY: {
      // @ts-ignore
      const { name } = action.payload || {}
      const newState = Object.assign({}, state)
      delete newState[name]
      return newState
    }
    default:
      return state
  }
}
