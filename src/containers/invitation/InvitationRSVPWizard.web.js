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

import { INVITATION_SEND_REQUEST, configureMachine } from '../../store/events';

import invitationSchema from "../../schemas/invitation/invitationSchema";
import invitationUISchema from "../../schemas/invitation/invitationUISchema";
import Typography from "@material-ui/core/Typography";

const InvitationUpsertWizardContainer = (props) => {
  //classes injected with theme
  const {classes} = props;

  //redux wire up
  const invitationsState = useSelector(state => { return state.invitations});
  //const selectedWizardIndex = Object.getOwnPropertyNames(wizardState.InvitationWizard.steps).findIndex(p => p == wizardState.InvitationWizard.currentStep);
  const selectedWizardIndex = invitationsState.selectedWizardIndex || 0;

  const dispatch = useDispatch();
  const machine =  configureMachine();

  const [state, send] = useMachine(machine, {
    context: {
      invitationsState
    }
  });

  //initializes statechart state to CREATE from READY
  send({
    type: INVITATION_WIZARD_CREATE
  });

  const selectedInvitationChange = ({formData}) => {

    send({
      type: INVITATION_CHANGE,
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
      selectedInvitation
    });
  };

  const { selectedInvitation} = invitationsState;

  const schema = invitationSchema();
  const schemaProperties = schema.properties;
  // const selectedSchema = schemaProperties.description;

  const wizardSteps = [];

  //Composite selected invitation will seperate the entry by
  //schema in rsjf terms and be used for review step
  const selectedInvitationComposite = {};


  const reviewAndCreateField = (name, value) => (
    <Typography {...props} gutterBottom>
      <label>{name}</label>
      <span>{value}</span>
    </Typography>
  );

  const createFields = (schema) => {
    let fields = [];

    for(const propName in schema.properties) {
      fields.push(reviewAndCreateField(propName, selectedInvitation[propName]));
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
    if(selectedEvent) {
      if(name == 'invitations'){
        selectedInvitationComposite['invitations'] = selectedInvitation.invitations;
      } else {
        selectedInvitationComposite[name] = {};
        //todo refactor
        for (const propName in step.properties) {
          selectedInvitationComposite[name][propName] =
            selectedInvitation[propName] instanceof Date ? selectedInvitation[propName].toString() : selectedInvitation[propName];
        }
      }
    }

    reviewAndCreateSections.push(reviewAndCreateSection(name, step));
  }



  const result = validateFormData(
    selectedInvitationComposite,
    schema
  );
  const errorsList = result.errors;
  console.log(JSON.stringify((errorsList)));
  const errorSchema = result.errorSchema;

  //+1 to our wizard steps
  const wizardStepsCount = wizardSteps.length;
  const selectedSchema = wizardSteps[selectedWizardIndex];

  const debounceInvitationHandler = (...args) => {
    const debounced = debounce(...args)
    return function (e) {
      return debounced(e)
    }
  };

  //300 millisecond delay for debounce
  const selectedInvitationChangeDebounced = debounceInvitationHandler(selectedInvitationChange, 300);
  const invitationChangeDebounced = debounceInvitationHandler(invitationChange, 300);

  //Cancel Previous Review and Launch Next: Configure Instance Details
  const FullForm = (schema, uiSchema, formData) => {
    return (
      <Form
        safeRenderCompletion={true}
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={selectedInvitationChangeDebounced}
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



  //TODO clear up gridlock...
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid alignItems="center" justify="center" container className={classes.grid}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid item container xs={6}>

                </Grid>
                <Grid item container xs={6}>

                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(InvitationUpsertWizardContainer));