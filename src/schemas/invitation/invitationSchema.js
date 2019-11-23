import React, { PropTypes } from 'react';

export default () => {
  return {
    "title": "Invitation",
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "title": "Name"
      },
      "phoneNumber": {
        "type": "string",
        "title": "Phone Number"
      },
      "email": {
        "type": "string",
        "title": "Email"
      },
      "message": {
        "type": "string",
        "title": "Message"
      },
      "status": {
        "type": "string",
        "hidden": "true",
        "enum": ["new", "sent", "confirmed", "declined"]
      }
    }
  };
};

