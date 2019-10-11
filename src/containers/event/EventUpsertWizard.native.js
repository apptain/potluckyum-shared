'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { eventCreate, eventUpdate } from '../../redux/modules/events';

import EventDescription from './steps/EventDescription';
import EventLocation from './steps/EventLocation';
import EventDateTime from './steps/EventDateTime';
import EventInvitations from './steps/EventInvitations';
import EventRequests from './steps/EventRequests';


@connect(state => ({ event: state.events.selectedEvent }), dispatch => ({actions: bindActionCreators({eventCreate, eventUpdate}, dispatch)}))
export default class EventUpsertWizard extends Component {
  eventUpdate(formData) {

    this.props.actions.eventUpdate(formData);
    //this.props.jumpToStep(2);

  }

  // jumpToStep = (toStep) => {
  //   // We can explicitly move to a step (we -1 as its a zero based index)
  //   this.props.jumpToStep(toStep); // The StepZilla library injects this jumpToStep utility into each component
  // }

  render() {
    const steps =
      [
        {name: 'Description', component: <EventDescription eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Location', component: <EventLocation eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Date Time', component: <EventDateTime eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Invitations', component: <EventInvitations eventUpdate={(formData) => {this.eventUpdate(formData)}} />},
        {name: 'Requests', component: <EventRequests eventUpdate={(formData) => {this.eventUpdate(formData)}} />}
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
