import React, { PropTypes } from 'react';
import invitationSchema from "../invitation/invitationSchema";

export default () => {
  return {
    "title": "Potluck RSVP",
    "type": "object",
    "required": [
      "willAttend"
    ],
    "properties": {
      "willAttend": {
        "type": "boolean",
        "title": "Can and Will Attend?"
      },
      "willBring": {
        "type": "string",
        "title": "Will bring?"
      }
    }
  }
};
