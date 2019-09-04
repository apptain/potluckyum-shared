import React, { PropTypes } from 'react';

export default function() {
  return {
    "username": {
      "ui:autofocus": true,
      "ui:description": "You can use aliases later if you like"
    },
    "password": {
      "ui:widget": "password"
    },
    "passwordVerify": {
      "ui:widget": "password",
      "ui:description": "Please verify your previously entered password"
    }
  }
}
