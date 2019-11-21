import React, { PropTypes } from 'react';

export default function() {
  return {
    "preferredName": {
      "ui:title": "Prefer Name",
      "ui:description": "You can use aliases later if you like",
      "type": "string",
      "title": "preferredName"
    },
    "willAttend": {
      "ui:autofocus": true,
      "ui:title": "Will Attend"
    }
  }
}
