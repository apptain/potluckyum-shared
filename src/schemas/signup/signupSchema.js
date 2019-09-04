import React, { PropTypes } from 'react';

export default () => {
  return {
    "title": "Register Your Account",
    "type": "object",
    "required": [
      "username",
      "password",
      "passwordVerify"
    ],
    "properties": {
      "username": {
        "type": "string",
        "title": "User Name"
      },
      "password": {
        "type": "string",
        "title": "Password"
      },
      "passwordVerify": {
        "type": "string",
        "title": "Password Verification"
      },
      "email": {
        "type": "string",
        "title": "Email"
      },
			"phoneNumber": {
				"type": "string",
				"title": "Phone Number"
			}
    }
  };
};
