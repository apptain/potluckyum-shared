import React, { PropTypes } from 'react';

export default () => {
  return {
    "preferredName": {
      "type": "string",
      "title": "preferredName"
    },
    "willAttend": {
      "type": "string",
      "title": "Phone Number"
    },
    "message": {
      "type": "string",
      "title": "Message"
    },
    "willBring": {
      "type": "string",
      "title": "Will Bring"
    },
    "name": {
      "ui:autofocus": true,

    },
    "description": {
      "ui:title": "Description",
      "ui:description": "What are we celebrating?"
    },
    "date": {
      "ui:title": "Date",
      "ui:widget": "date"
    },
    "startTime": {
      "ui:title": "Start Time",
      "ui:widget": "time"
    },
    "endTime": {
      "ui:title": "End Time",
      "ui:widget": "time"
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
