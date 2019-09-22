'use strict';

import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Back from '../../components/common/Back';
// const backgroundShape = require('../../images/shape.svg');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { eventChange, eventCreate, eventUpdate } from '../../redux/modules/events';

import StepZilla from 'react-stepzilla';
import EventDescription from './steps/EventDescription';
import EventLocation from './steps/EventLocation';
import EventDateTime from './steps/EventDateTime';
import EventInvitations from './steps/EventInvitations';
import EventRequests from './steps/EventRequests';

const numeral = require('numeral');
numeral.defaultFormat('0,000');

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

@connect(state => ({ event: state.events.selectedEvent }), dispatch => ({actions: bindActionCreators({eventChange, eventCreate, eventUpdate}, dispatch)}))
class Wizard extends Component {
  eventUpdate(event) {
    debugger;
    this.props.actions.eventChange(event);
    //this.props.jumpToStep(2);

  }

  componentDidMount() {

  }

  handleNext = () => {

  };

  handleBack = () => {

  };

  render() {
    const { classes } = this.props;

    const event = this.props.event;
    const steps =
      [
        {name: 'Invitations', component: <EventInvitations event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Description', component: <EventDescription event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}}  />},
        {name: 'Location', component: <EventLocation event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}}  />},
        {name: 'Date Time', component: <EventDateTime event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}}  />},
        {name: 'Requests', component: <EventRequests event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}}  />}
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
                              onClick={this.handleBack}
                              className={classes.backButton}
                              size='large'
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              // onClick={activeStep !== 5 ? this.handleNext : this.goToDashboard}
                              size='large'
                              // disabled={this.state.activeStep === 3 && !this.state.termsChecked}
                            >
                              {/*{this.stepActions()}*/}
                            </Button>
                          </div>
                        </Grid>
                      </Paper>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Wizard));

