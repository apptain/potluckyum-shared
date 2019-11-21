import React, { PropTypes } from 'react';

export default () => {
  return {
    "title": "Invitation RSVP",
    "type": "object",
    "required": [
      "willAttend"
    ],
    "properties": {
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
      }
    }
  };
};
