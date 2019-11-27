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

import Collapsible from 'react-collapsible';
import validateFormData, { isValid, toErrorList } from "react-jsonschema-form/lib/validate";

import {
  EVENT_WIZARD_CREATE,
  EVENT_WIZARD_UPDATE,
  EVENT_WIZARD_NEXT,
  EVENT_WIZARD_PREVIOUS,
  EVENT_WIZARD_CANCEL,
  EVENT_WIZARD_REVIEW,
  EVENT_WIZARD_DELETE,
  EVENT_CHANGE,
  EVENT_CREATE,
  INVITATION_CHANGE, INVITATION_ADD,
  INVITATION_CANCEL, INVITATION_REMOVE, configureMachine } from '../../store/events';

import eventSchema from "../../schemas/event/eventSchema";
import eventUISchema from "../../schemas/event/eventUISchema";
import invitationUISchema from "../../schemas/invitation/invitationUISchema";
import Typography from "@material-ui/core/Typography";
import EventInvitations from "./EventInvitations";

const EventUpsertWizardContainer = (props) => {
  //classes injected with theme
  const {classes} = props;

  //redux wire up
  const eventsState = useSelector(state => { return state.events});
  //const selectedWizardIndex = Object.getOwnPropertyNames(wizardState.EventWizard.steps).findIndex(p => p == wizardState.EventWizard.currentStep);
  const selectedWizardIndex = eventsState.selectedWizardIndex || 0;

  const dispatch = useDispatch();
  const machine =  configureMachine();

  const [state, send] = useMachine(machine, {
    context: {
      eventsState
    }
  });

  const selectedEventChange = ({formData}) => {

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

  const invitationAdd = () => {
    send({
      type: INVITATION_ADD,
      dispatch,
      selectedEvent,
      selectedInvitation
    });
  };

  const { selectedEvent, selectedInvitation } = eventsState;

  const schema = eventSchema();
  const schemaProperties = schema.properties;
  // const selectedSchema = schemaProperties.description;

  const wizardSteps = [];

  //Composite selected event will seperate the entry by
  //schema in rsjf terms and be used for review step
  const selectedEventComposite = {};


  const reviewAndCreateField = (name, value) => (
    <Typography {...props} gutterBottom>
      <label>{name}</label>
      <span>{value}</span>
    </Typography>
  );

  const createFields = (schema) => {
    let fields = [];

    for(const propName in schema.properties) {
      fields.push(reviewAndCreateField(propName, selectedEvent[propName]));
    }

    return fields;
  }

  const reviewAndCreateSection = (name, schema) => (
     <Collapsible tabIndex={0} trigger={name} open={true}>
       {createFields(schema)}
     </Collapsible>
  );

  const reviewAndCreateSections = [];
  const validationErrors = [];

  //TODO move validations
  const stepNames = [];

  for(const name in schemaProperties) {

    stepNames.push(name);
    const step = schemaProperties[name];
    wizardSteps.push(step);
    if(name == 'invitations'){
      selectedEventComposite['invitations'] = selectedEvent.invitations;
    } else {
      selectedEventComposite[name] = {};
      //todo refactor
      for(const propName in step.properties) {
        selectedEventComposite[name][propName] =
          selectedEvent[propName] instanceof Date ? selectedEvent[propName].toString() : selectedEvent[propName];
      }
    }

    reviewAndCreateSections.push(reviewAndCreateSection(name, step));
  }



  const result = validateFormData(
    selectedEventComposite,
    schema
  );
  const errorsList = result.errors;
  console.log(JSON.stringify((errorsList)));
  const errorSchema = result.errorSchema;

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

  var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "200px",
    width: "100%",
  }

  var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }

  const invitationUiSchemaInstance = invitationUISchema();

  debugger;

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
                    {selectedWizardIndex + 1 < wizardStepsCount ?
                      stepNames[selectedWizardIndex] === 'invitations' ?
                        <EventInvitations
                          schema={schemaProperties['invitations'].items}
                          uiSchema={invitationUiSchemaInstance}
                          selectedEvent={selectedEvent}
                          selectedInvitation={selectedInvitation}
                          onSelectedInvitationChange = { invitationChangeDebounced }
                          invitationAdd = { invitationAdd }
                          selectedEvent = { selectedEvent }
                          errors = { errorsList }
                          send = {send}
                          state = {state}
                        /> :
                      FullForm(selectedSchema, eventUISchema(), selectedEvent) :
                      <div>{reviewAndCreateSections}</div>
                    }
                    <Box
                      bgcolor="background.paper"
                      color="text.primary"
                      p={2}
                      position="absolute"
                      bottom={0}
                      left="10%"
                      zIndex="modal"
                    >
                      <div>
                        <div style={phantom} />
                        <div style={style}>
                          <StepButtons
                            errors={errorsList}
                            selectedIndex={selectedWizardIndex}
                            classes={classes}
                            previous={(e) => send({dispatch, type: EVENT_WIZARD_PREVIOUS, selectedWizardIndex, wizardStepsCount })}
                            next={(e) => send({dispatch, type: EVENT_WIZARD_NEXT, selectedWizardIndex, wizardStepsCount})}

                            // cancel={(e) => send({dispatch, type: EVENT_WIZARD_NEXT}
                            // review={send({dispatch, type: EVENT_WIZARD_REVIEW})}
                            upsert={(e) => send({dispatch, type: EVENT_CREATE, selectedEvent })}
                            
                            // update={send({dispatch, type: EVENT_WIZARD_UPDATE})}
                            // deleted={send({dispatch, type: EVENT_WIZARD_DELETE})}
                          />
                        </div>
                      </div>


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