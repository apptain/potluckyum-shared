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
      "phoneNumberOrEmail": {
        "type": "string",
        "title": "Phone Number or Email"
      },
      "message": {
        "type": "string",
        "title": "Message"
      }
    }
  };
};
