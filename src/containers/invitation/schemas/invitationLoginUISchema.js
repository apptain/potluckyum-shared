import React, { PropTypes } from 'react';

export default function() {
  return {
    "username": {
      "ui:autofocus": true,
      "ui:title": "User Name",
      "ui:description": "You can use aliases later if you like"
    },
    "phoneNumber": {
      "ui:title": "Phone Number",
      "ui:description": "Not required, but we'll encrypt it and text with it as from"
    },
    "email": {
      "ui:title": "Email",
      "ui:description": "Not required, but we'll encrypt it and email with it as from"
    }
  }
}
