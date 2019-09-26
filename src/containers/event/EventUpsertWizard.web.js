'use strict';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useMachine } from '@xstate/react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import debounce from 'debounce';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


// import { eventChange, eventCreate, eventUpdate } from '../../redux/modules/events';

import StepZilla from 'react-stepzilla';
import EventDescription from './steps/EventDescription';
import EventLocation from './steps/EventLocation';
import EventDateTime from './steps/EventDateTime';
import EventInvitations from './steps/EventInvitations';
import EventRequests from './steps/EventRequests';

import configureMachine, {CREATE, UPDATE, CHANGE, actions} from '../../redux/statemachine/events';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary['A100'],
    overflow: 'hidden',
    //background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    margin: `0 ${theme.spacing(2)}px`
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  borderColumn: {
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    paddingBottom: 24,
    marginBottom: 24
  },
  flexBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  }
})

// @connect(state => ({ event: }), dispatch => ({actions: bindActionCreators({eventChange, eventCreate, eventUpdate}, dispatch)}))

const EventUpsertWizardContainer = (props) => {
  const {classes} = props;
  //redux wire up
  const selectedEvent = useSelector(state => {debugger; return state.events.selectedEvent}) || {};
  debugger;
  const dispatch = useDispatch();
  const machine =  configureMachine();

  const [state, send] = useMachine(machine, {
    context: {
      selectedEvent
    },
    actions: {
      eventChange: (context, e) => dispatch(actions.eventChange(context, e))
    }
  })

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
  //   debugger;
  //   // props.logState(currentState);
  //   setState({ context });
  // };

  const handleBack = () => {

  };

  const eventCreate = (event) => {
    send({
      type: CHANGE,
      event
    });
  };

  const eventChange = ({formData}) => {
    send({
      type: CHANGE,
      //we
      changes: formData
    });
  };

  const invitationChange = ({formData}) => {
    debugger;
  };

  const debounceEventHandler = (...args) => {
    const debounced = debounce(...args)
    return function (e) {
      return debounced(e)
    }
  };

  //300 millisecond delay for debounce
  const eventChangeDebounced = debounceEventHandler(eventChange, 300);
  const invitationChangeDebounced = debounceEventHandler(invitationChange, 300);

  const steps =
  [
    {name: 'Description', component: <EventDescription event={selectedEvent} onChange={eventChangeDebounced} eventUpdate={(formData) => {eventUpdate(formData)}}  />},
    {name: 'Invitations', component: <EventInvitations event={selectedEvent} invitationChange={eventChangeDebounced} eventUpdate={(formData) => {eventUpdate(formData)}} />},
    {name: 'Location', component: <EventLocation event={selectedEvent} onChange={eventChangeDebounced} eventUpdate={(formData) => {eventUpdate(formData)}}  />},
    {name: 'Date Time', component: <EventDateTime event={selectedEvent} onChange={eventChangeDebounced} eventUpdate={(formData) => {eventUpdate(formData)}}  />},
    {name: 'Requests', component: <EventRequests event={selectedEvent} onChange={eventChangeDebounced} eventUpdate={(formData) => {eventUpdate(formData)}}  />}
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid alignItems="center" justify="center" container className={classes.grid}>
            <Grid item xs={12}>
              <div className={classes.stepContainer}>
                <div className={classes.bigContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <StepZilla
                            steps={steps}
                            showNavigation={false}
                            prevBtnOnLastStep={false}
                            preventEnterSubmission={true}
                            nextTextOnFinalActionStep={"Save"}
                            hocValidationAppliedTo={[3]}
                            startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
                            onStepChange={(step) => window.sessionStorage.setItem('step', step)}
                          />
                        </Grid>
                        <div className={classes.flexBar}>
                          <Button
                            // disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                            size='large'
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            // onClick={activeStep !== 5 ? handleNext : goToDashboard}
                            size='large'
                            // disabled={state.activeStep === 3 && !state.termsChecked}
                          >
                          </Button>
                        </div>
                      </Grid>
                    </Paper>
                  </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(EventUpsertWizardContainer));
