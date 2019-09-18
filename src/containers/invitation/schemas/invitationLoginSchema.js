import React, { PropTypes } from 'react';

export default () => {
  return {
    "title": "Invitation",
    "type": "object",
    "required": [
      "name",
      "secretQuestion",
      "secretAnswer"
    ],
    "properties": {
      "username": {
        "type": "string",
        "title": "User Name"
      },
      "phoneNumber": {
        "type": "string",
        "title": "Phone Number"
      },
      "email": {
        "type": "string",
        "title": "Email"
      }
    }
  };
};
