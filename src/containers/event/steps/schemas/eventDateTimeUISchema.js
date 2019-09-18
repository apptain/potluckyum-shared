import React, { PropTypes } from 'react';

export default () => {
  return {
    "date": {
      "ui:title": "Date",
      "ui:widget": "date"
    },
    "startTime": {
      "ui:title": "Start Time",
      "ui:widget": "time",
      "classNames": "col-sm-6 clear"
    },
    "endTime": {
      "ui:title": "End Time",
      "ui:widget": "time",
      "ui:description": "You don't have to end it",
      "classNames": "col-sm-6 clear"
    }
  };
};
