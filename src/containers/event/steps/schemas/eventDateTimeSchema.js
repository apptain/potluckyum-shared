import React, { PropTypes } from 'react';

export default () => {
  return {
    "title": "Pot Luck Event Details",
    "type": "object",
    "required": [
      "date",
      "startTime",
    ],
    "properties": {
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
      }
    }
  };
};
