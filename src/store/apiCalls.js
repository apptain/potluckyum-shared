import Amplify, { API } from "aws-amplify";
import config from "../config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "events",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "invitations",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

export function eventsList() {
  return API.get("events", "/events");
}

export function eventGet(id) {
  return API.get("events", `/events/${id}`);
}

export function eventUpdate(id, event) {
  return API.put("events", `/events/${id}`, {
    body: event
  });
}

export function eventCreate(event) {
  return API.post("events", `/events`, {
    body: event
  });
}

export function eventDelete(id) {
  return API.del("events", `/events/${id}`);
}

export function invitationsList() {
  return API.get("invitations", "/invitations");
}

export function eventInvitationsList() {
  return API.get("invitations", "/invitations");
}


export function invitationGet(id) {
  return API.get("invitations", `/invitations/${id}`);
}

export function invitationCreate(event) {
  return API.post("invitations", `/invitation`, {
    body: event
  });
}

export function invitationUpdate(id, invitation) {
  return API.put("invitations", `/invitations/${id}`, {
    body: invitation
  });
}

export function invitationRsvp(id, invitation) {
  return API.put("invitations", `/invitations/${id}`, {
    body: invitation
  });
}

export function invitationDelete(id) {
  return API.del("invitations", `/invitations/${id}`);
}
