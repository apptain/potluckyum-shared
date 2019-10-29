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
  EVENT_WIZARD_UDPATE,
  EVENT_WIZARD_NEXT,

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
  const selectedWizardIndex = 0;

  const dispatch = useDispatch();
  const machine =  configureMachine();

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

    const [state, send] = useMachine(machine, {
      context: {
        eventsState
      },
      actions: {
        selectedEventChange: (context, e) => dispatch(actions.selectedEventChange(context, e)),
        selectedEventWizardNext: (context, e) => dispatch(actions.selectedEventChange(context, e)),
        selectedEventWizardPrevious:  (context, e) => dispatch(actions.selectedEventChange(context, e)),
        selectedEventWizardReview:  (context, e) => dispatch(actions.selectedEventWizardReview(context, e)),
        selectedEventSave: (context, e) => dispatch(actions.selectedEventChange(context, e))
      }
    });

    debugger;
    send({
      type: EVENT_CHANGE,
      changes: formData
    });
  };

  const invitationChange = ({formData}) => {
    send({
      type: INVITATION_CHANGE,
      changes: formData
    });
  };

  const { selectedEvent, selectedInvitation } = eventsState;

  debugger;
  const schema = eventSchema();
  const schemaProperties = schema.properties;
  // const selectedSchema = schemaProperties.description;

  debugger;
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

  const selectedSchema = wizardSteps[selectedWizardIndex + 1];

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
                        // back={wizardActions.back}
                        // next={wizardActions.next}
                        // cancel={wizardActions.cancel}
                        // review={wizardActions.review}
                        // create={wizardActions.create}
                        // update={wizardActions.update}
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