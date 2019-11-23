import React, { PropTypes } from 'react';

export default function() {
  return {
    "name": {
      "ui:autofocus": true,
      "ui:title": "Name"
    },
    "phoneNumber": {
      "ui:title": "Phone Number",
      "classNames": "col-sm-6 clear"
    },
    "email": {
      "ui:title": "Email",
      "classNames": "col-sm-6 clear"
    },
    "message": {
      "type": "string",
      "title": "Message"
    },
    "status": {
      "ui:widget": "HiddenWidget",
      "hidden": "true"
    }
  }
}
