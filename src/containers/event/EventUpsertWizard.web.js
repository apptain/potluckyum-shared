'use strict';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useMachine } from '@xstate/react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import debounce from 'debounce';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from './styles';

import StepZilla from 'react-stepzilla';
import StepButtons from '../../components/StepButtons';

import EventDescription from './steps/EventDescription';
import EventLocation from './steps/EventLocation';
import EventDateTime from './steps/EventDateTime';
import EventInvitations from './steps/EventInvitations';
import EventRequests from './steps/EventRequests';

import configureMachine, {CREATE, UPDATE, CHANGE, actions} from '../../redux/statemachine/events';
import Button from "@material-ui/core/Button";

const EventUpsertWizardContainer = (props) => {
  //classes injected with theme
  const {classes} = props;

  //redux wire up
  const eventsState = useSelector(state => { return state.events});

  const dispatch = useDispatch();
  const machine =  configureMachine();

  const [state, send] = useMachine(machine, {
    context: {
      eventsState
    },
    actions: {
      selectedEventChange: (context, e) => dispatch(actions.selectedEventChange(context, e))
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
  //   debugger;
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
      jumpToStep(step - 1);
    },
    next: (step, jumpToStep) => {
      jumpToStep(step + 1);
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

  //TODO remove stepzilla dependency and improve wizard
  const steps =
  [
    {name: 'Description', component: <EventDescription index={0} classes={classes} selectedEvent={selectedEvent} selectedEventChange={selectedEventChangeDebounced} />},
    {name: 'Location', component: <EventLocation index={1} classes={classes} selectedEvent={selectedEvent} selectedEventChange={selectedEventChangeDebounced} />},
    {name: 'Date Time', component: <EventDateTime index={2} classes={classes} selectedEvent={selectedEvent} selectedEventChange={selectedEventChangeDebounced} />},
    {name: 'Invitations', component: <EventInvitations index={3}   classes={classes} selectedEvent={selectedEvent} selectedInvitation={selectedInvitation} selectedEventChange={selectedEventChangeDebounced} invitationChange={invitationChangeDebounced} />},
    {name: 'Requests', component: <EventRequests index={4} classes={classes} selectedEvent={selectedEvent} selectedEventChange={selectedEventChangeDebounced} />},
    {name: 'Review and Launch', component: <EventRequests index={4} classes={classes} selectedEvent={selectedEvent}  />}
  ];

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
                    <StepZilla
                      steps={steps}
                      showNavigation={false}
                      prevBtnOnLastStep={false}
                      preventEnterSubmission={true}
                    />
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
                        selectedIndex={eventsState.selectedWizardIndex}
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