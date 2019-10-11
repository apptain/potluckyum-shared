import React, { PropTypes } from 'react';

export default () => {
  return {
    "name": {
      "ui:autofocus": true
    },
    "description": {
      "ui:title": "Description",
      "ui:description": "What are we celebrating?"
    },
    "startTime": {
      "ui:title": "Start Date and Time"
    },
    "endTime": {
      "ui:title": "End Date and Time",
      "ui:description": "You don't have to end"
    },
    "location": {
      "ui:title": "Pot Luck Location",
      "ui:description": "Where's the party at?"
    },
    "address": {
      "ui:title": "Address",
      "ui:description": "Not required but needed for a map"
    },
    "city": {
      "ui:title": "City"
    },
    "state": {
      "ui:title": "State"
    },
    "zip": {
      "ui:title": "Zip Code"
    }
  };
};
