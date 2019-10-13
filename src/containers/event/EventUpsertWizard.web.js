'use strict';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useMachine } from '@xstate/react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import debounce from 'debounce';
import { Wizard, Step } from 'react-redux-wizard';
import {initializeWizard, registerStep, previousStep, nextStep, destroyWizard} from '../../redux/modules/wizard.ts';

import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from './styles';

import {default as MaterialStep} from '@material-ui/core/Step';

import StepButtons from '../../components/StepButtons';

import EventDescription from './steps/EventDescription';
import EventLocation from './steps/EventLocation';
import EventDateTime from './steps/EventDateTime';
import EventInvitations from './steps/EventInvitations';
import EventRequests from './steps/EventRequests';

import configureMachine, {CREATE, UPDATE, CHANGE, actions} from '../../redux/statemachine/events';

import eventSchema from "./steps/schemas/eventSchema";
import eventUISchema from "./steps/schemas/eventUISchema";

import Button from "@material-ui/core/Button";
import Form from "react-jsonschema-form";

import formWidgets from "../../schemaform/widgets";
import CustomFieldTemplate from "../../schemaform/CustomFieldTemplate";

import CustomObjectFieldTemplate from "../../schemaform/CustomObjectFieldTemplate";

const EventUpsertWizardContainer = (props) => {
  //classes injected with theme
  const {classes} = props;

  //redux wire up
  const eventsState = useSelector(state => { return state.events});
  const wizardState = useSelector(state => {  return state.wizards});

  const selectedWizardIndex = Object.getOwnPropertyNames(wizardState.EventWizard.steps).findIndex(p => p == wizardState.EventWizard.currentStep);


  const dispatch = useDispatch();
  const machine =  configureMachine();

  const [state, send] = useMachine(machine, {
    context: {
      eventsState
    },
    actions: {
      selectedEventChange: (context, e) => dispatch(actions.selectedEventChange(context, e)),
      setSelectedWizardIndex: (context, e) => dispatch(actions.selectedEventChange(context, e))
    }
  })

  //initializes statechart state to CREATE from READY
  send({
    type: CREATE
  });

  // useEffect(() => {
  //   start();
  //   return function cleanup() {
  //     stop();
  //   };
  // });

  // const handleMachineTransition = ({context}) => {
  //
  //   // props.logState(currentState);
  //   setState({ context });
  // };

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

  const wizardActions = {
    //back and next handled in container, but could move to statecharts
    back: (step, jumpToStep) => {
      debugger;
      //wizardReduxActions.previous();
      //jumpToStep(step - 1);
    },
    next: (step, jumpToStep) => {
      debugger;
      nextStep("")
      //wizardReduxActions.next();

      //jumpToStep(step + 1);
    },
    //below are handled in statechart
    cancel: () => {
      send({
        type: CHANGE,
        event
      });
    },
    review: () => {
      send({
        type: CHANGE,
        event
      });
    },
    create: () => {
      send({
        type: CHANGE,
        event
      });
    },
    update: () => {
      send({
        type: CHANGE,
        event
      });
    }
  };

  const eventCreate = (event) => {
    send({
      type: CHANGE,
      event
    });
  };

  const selectedEventChange = ({formData}) => {
    send({
      type: CHANGE,
      changes: formData
    });
  };

  const invitationChange = ({formData}) => {
    send({
      type: CHANGE,
      changes: formData
    });
  };

  const { selectedEvent, selectedInvitation } = eventsState;

  const schema = eventSchema();
  const wizardSteps = [];
  const schemaProperties = schema.properties;
  const selectedSchema = schemaProperties[wizardState.EventWizard.currentStep];

  for(const name in schemaProperties) {
    debugger;
    const val = schemaProperties[name];
    wizardSteps.push(val);
    registerStep(name, {
      // name: props.name,
      // previous: props.previous,
      // next: props.next,
      // finish: !props.next
    });
    // propertyName is what you want
    // you can get the value like this: myObject[propertyName]
  }

  // Object.getOwnPropertyNames(schemaProperties).forEach((x,i) => {
  //   debugger;
  //
  // });
  // debugger;

  const EventDescriptionStep = () => <EventDescription index={0} classes={classes} selectedEvent={selectedEvent} selectedEventChange={selectedEventChangeDebounced} />;
  const EventLocationStep = () => <EventLocation index={1} classes={classes} selectedEvent={selectedEvent} selectedEventChange={selectedEventChangeDebounced} />;
  const EventDateTimeStep = () => <EventDateTime index={2} classes={classes} selectedEvent={selectedEvent} selectedEventChange={selectedEventChangeDebounced} />;
  const EventInvitationsStep = () => <EventInvitations index={3} classes={classes} selectedEvent={selectedEvent} selectedInvitation={selectedInvitation} selectedEventChange={selectedEventChangeDebounced} invitationChange={invitationChangeDebounced} />;
  const EventRequestsStep = () => <EventRequests index={4} classes={classes} selectedEvent={selectedEvent} selectedEventChange={selectedEventChangeDebounced} />;
  const EventReviewAndCreateStep = () => <EventRequests index={4} classes={classes} selectedEvent={selectedEvent}  />;

  const FullForm = (schema, uiSchema) => {
    debugger;
    return (
      <Form
        safeRenderCompletion={true}
        schema={schema}
        // formData={selectedEvent}
        //onChange={selectedEventChange}
        uiSchema={uiSchema}
        //onSubmit={handleSubmit}
        widgets={formWidgets}
        FieldTemplate={CustomFieldTemplate}
        //ObjectFieldTemplate={CustomObjectFieldTemplate}
      >
        <div>
          {/*empty div hides submit button in rsjf*/}
        </div>
      </Form>
    );
  }

  debugger;
  //const RenderForm = FullForm(selectedSchema, eventUISchema());


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
                    {FullForm(selectedSchema, eventUISchema())}

                    {/*<Wizard name='EventWizard'>*/}
                    {/*  <Step name='description' component={EventDescriptionStep} next='location' />*/}
                    {/*  <Step name='location' component={EventLocationStep} next='dateTime' />*/}
                    {/*  <Step name='dateTime' component={EventDateTimeStep} next='eventInvitations' />*/}
                    {/*  <Step name='eventInvitations' component={EventInvitationsStep} next='description' />*/}
                    {/*  <Step name='requests' component={EventRequestsStep} next='location' />*/}
                    {/*  <Step name='reviewAndCreate' component={EventReviewAndCreateStep}  />*/}
                    {/*</Wizard>*/}
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
                        back={wizardActions.back}
                        next={wizardActions.next}
                        cancel={wizardActions.cancel}
                        review={wizardActions.review}
                        create={wizardActions.create}
                        update={wizardActions.update}
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