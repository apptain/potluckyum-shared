import React, { PropTypes } from 'react';

export default () => {
  return {
    "title": "Pot Luck Event Details",
    "type": "object",
    "required": [
      "name",
      "startTime",
      "location"
    ],
    "properties": {
      "name": {
        "type": "string",
        "title": "Name"
      },
      "description": {
        "type": "string",
        "title": "Description",
      },
      "date": {
        "type": "string",
        "title": "End Date and Time",
        "format": "date-time"
      },
      "startTime": {
        "type": "string",
        "title": "Start Time",
        "format": "date-time"
      },
      "endTime": {
        "type": "string",
        "title": "End Time",
        "format": "date-time"
      },
      "location": {
        "type": "string",
        "title": "Location"
      },
      "address": {
        "type": "string",
        "title": "Address"
      },
      "city": {
        "type": "string",
        "title": "City"
      },
      "state": {
        "type": "string",
        "title": "State"
      },
      "zip": {
        "type": "string",
        "title": "Zip"
      },
      "requests": {
        "type": "array",
        "title": "Requests",
        "items": {
          "type": "string"
        }
      },

    }
  };
};
