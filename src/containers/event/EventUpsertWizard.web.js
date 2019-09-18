'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { eventChange, eventCreate, eventUpdate } from '../../redux/modules/events';

import StepZilla from 'react-stepzilla';
import EventDescription from './steps/EventDescription';
import EventLocation from './steps/EventLocation';
import EventDateTime from './steps/EventDateTime';
import EventInvitations from './steps/EventInvitations';
import EventRequests from './steps/EventRequests';


@connect(state => ({ event: state.events.selectedEvent }), dispatch => ({actions: bindActionCreators({eventChange, eventCreate, eventUpdate}, dispatch)}))
export default class EventUpsertWizardWeb extends Component {
  eventUpdate(event) {
    debugger;
    this.props.actions.eventChange(event);
    //this.props.jumpToStep(2);

  }


  // jumpToStep = (toStep) => {
  //   // We can explicitly move to a step (we -1 as its a zero based index)
  //   this.props.jumpToStep(toStep); // The StepZilla library injects this jumpToStep utility into each component
  // }

  render() {
    debugger;
    const event = this.props.event;
    const steps =
      [
        {name: 'Invitations', component: <EventInvitations event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Description', component: <EventDescription event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Location', component: <EventLocation event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Date Time', component: <EventDateTime event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Requests', component: <EventRequests event={event} eventUpdate={(formData) => {this.eventUpdate(formData)}} />}
      ];

    return (
      <div className='example'>
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            nextTextOnFinalActionStep={"Save"}
            hocValidationAppliedTo={[3]}
            startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
            onStepChange={(step) => window.sessionStorage.setItem('step', step)}
          />
        </div>
      </div>
    )
  }
}
