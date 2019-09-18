import React, { PropTypes } from 'react';

export default () => {
  return {
    "location": {
      "ui:autofocus": true,
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
