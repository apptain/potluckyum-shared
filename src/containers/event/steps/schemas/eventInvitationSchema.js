import React, { PropTypes } from 'react';

export default () => {
  return {
    "title": "Invitation",
    "type": "object",
    "properties": {
      "inviteeName": {
        "type": "string",
        "title": "Name"
      },
      "email": {
        "type": "string",
        "title": "Email"
      },
      "phoneNumber": {
        "type": "string",
        "title": "Phone Number"
      },
      "message": {
        "type": "string",
        "title": "Message"
      }
    }
  };
};
