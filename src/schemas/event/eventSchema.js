import React, { PropTypes } from 'react';
import invitationSchema from "../invitation/invitationSchema";

export default () => {
  return {
    "title": "Potluck Event",
    "type": "object",
    "properties": {
      "description": {
        "type": "object",
        "title": "Description",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description",
          }
        }
      },
      "location": {
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
      },
      "dateTime": {
        "title": "Potluck Event Date and Time",
        "type": "object",
        "required": [
          "date",
          "startTime",
        ],
        "properties": {
          "date": {
            "type": "string",
            "title": "End Date and Time",
            "format": "date-time"
          },
          "startTime": {
            "type": "string",
            "title": "Start Time",
            "format": "date-time"
          },
          "endTime": {
            "type": "string",
            "title": "End Time",
            "format": "date-time"
          }
        }
      },
      "invitations": {
        "type": "array",
        "items": invitationSchema(arguments)
      },
      "requests": {
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
      }
    }
  };
};
