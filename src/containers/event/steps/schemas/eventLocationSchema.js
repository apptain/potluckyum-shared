import React from 'react';

export default () => {
  return {
    "type": "object",
    "required": [
      "location"
    ],
    "properties": {
      "location": {
        "type": "string",
        "title": "Location"
      },
      "address": {
        "type": "string",
        "title": "Address"
      },
      "city": {
        "type": "string",
        "title": "City"
      },
      "state": {
        "type": "string",
        "title": "State"
      },
      "zip": {
        "type": "string",
        "title": "Zip"
      }
    }
  };
};
