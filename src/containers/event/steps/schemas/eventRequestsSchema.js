import React, { PropTypes } from 'react';

export default () => {
  return {
    "title": "Requests",
    "type": "object",
    "properties": {
      "requests": {
        "type": "array",
        "title": "Requests",
        "items": {
          "type": "string"
        }
      },
    }
  };
};
