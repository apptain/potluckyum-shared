'use strict';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useMachine } from '@xstate/react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import debounce from 'debounce';

import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {default as MaterialStep} from '@material-ui/core/Step';

import StepButtons from '../../components/StepButtons';
import styles from './styles';

import Form from "react-jsonschema-form";
import formWidgets from "../../schemaform/widgets";
import CustomFieldTemplate from "../../schemaform/CustomFieldTemplate";

import {
  EVENT_WIZARD_CREATE,
  EVENT_WIZARD_UPDATE,
  EVENT_WIZARD_NEXT,
  EVENT_WIZARD_PREVIOUS,
  EVENT_WIZARD_CANCEL,
  EVENT_WIZARD_REVIEW,
  EVENT_WIZARD_DELETE,
  EVENT_CHANGE, INVITATION_CHANGE, configureMachine } from '../../store/events';

import eventSchema from "../../schemas/event/eventSchema";
import eventUISchema from "../../schemas/event/eventUISchema";

const EventUpsertWizardContainer = (props) => {
  //classes injected with theme
  const {classes} = props;

  //redux wire up
  const eventsState = useSelector(state => { return state.events});
  const wizardState = useSelector(state => {  return state.wizards});
  //const selectedWizardIndex = Object.getOwnPropertyNames(wizardState.EventWizard.steps).findIndex(p => p == wizardState.EventWizard.currentStep);
  const selectedWizardIndex = eventsState.selectedWizardIndex || 0;


  const dispatch = useDispatch();
  const machine =  configureMachine();

  debugger;
  const [state, send] = useMachine(machine, {
    context: {
      eventsState
    }
  });

  //initializes statechart state to CREATE from READY
  send({
    type: EVENT_WIZARD_CREATE
  });

  const selectedEventChange = ({formData}) => {
    debugger;
    send({
      type: EVENT_CHANGE,
      dispatch,
      changes: formData
    });
  };

  const invitationChange = ({formData}) => {
    send({
      type: INVITATION_CHANGE,
      dispatch,
      changes: formData
    });
  };

  const { selectedEvent, selectedInvitation } = eventsState;

  const schema = eventSchema();
  const schemaProperties = schema.properties;
  // const selectedSchema = schemaProperties.description;

  const wizardSteps = [];

  for(const name in schemaProperties) {
    const val = schemaProperties[name];
    wizardSteps.push(val);

    // const props = {};
    // props.schema = val.schema;
    // props.uiSchema =
    //
    // const component = FullForm()
    // registerStep(name, {
    //   name,
    //   component
    // });
    // propertyName is what you want
    // you can get the value like this: myObject[propertyName]
  }

  //+1 to our wizard steps
  const wizardStepsCount = wizardSteps.length;

  const selectedSchema = wizardSteps[selectedWizardIndex];

  const debounceEventHandler = (...args) => {
    const debounced = debounce(...args)
    return function (e) {
      return debounced(e)
    }
  };

  //300 millisecond delay for debounce
  const selectedEventChangeDebounced = debounceEventHandler(selectedEventChange, 300);
  const invitationChangeDebounced = debounceEventHandler(invitationChange, 300);

  //Cancel Previous Review and Launch Next: Configure Instance Details

  const FullForm = (schema, uiSchema, formData) => {
    return (
      <Form
        safeRenderCompletion={true}
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={selectedEventChangeDebounced}
        widgets={formWidgets}
        FieldTemplate={CustomFieldTemplate}
      >
        <div>
          {/*empty div hides submit button in rsjf*/}
        </div>
      </Form>
    );
  }

  //TODO clear up gridlock...
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid alignItems="center" justify="center" container className={classes.grid}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
                    {/*TODO custom wizard*/}
                    <Stepper activeStep={selectedWizardIndex}>
                      <MaterialStep key="description">
                        Description
                      </MaterialStep>
                      <MaterialStep key="location">
                        <StepLabel>Location</StepLabel>
                      </MaterialStep>
                      <MaterialStep key="dateTime">
                        <StepLabel>Date Time</StepLabel>
                      </MaterialStep>
                      <MaterialStep key="eventInvitations">
                        <StepLabel>Invitations</StepLabel>
                      </MaterialStep>
                      <MaterialStep key="requests">
                        <StepLabel>Requests</StepLabel>
                      </MaterialStep>
                      <MaterialStep key="reviewAndCreate">
                        <StepLabel>Review and Create</StepLabel>
                      </MaterialStep>
                    </Stepper>
                    {FullForm(selectedSchema, eventUISchema(), selectedEvent)}

                    <Box
                      bgcolor="background.paper"
                      color="text.primary"
                      p={2}
                      position="absolute"
                      bottom={0}
                      left="10%"
                      zIndex="modal"
                    >
                      <StepButtons
                        selectedIndex={selectedWizardIndex}
                        classes={classes}
                        previous={(e) => send({dispatch, type: EVENT_WIZARD_PREVIOUS, selectedWizardIndex, wizardStepsCount })}
                        next={(e) => send({dispatch, type: EVENT_WIZARD_NEXT, selectedWizardIndex, wizardStepsCount})}
                        // cancel={send({dispatch, type: EVENT_WIZARD_CANCEL})}
                        // review={send({dispatch, type: EVENT_WIZARD_REVIEW})}
                        // create={send({dispatch, type: EVENT_WIZARD_CREATE})}
                        // update={send({dispatch, type: EVENT_WIZARD_UPDATE})}
                        // deleted={send({dispatch, type: EVENT_WIZARD_DELETE})}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(EventUpsertWizardContainer));