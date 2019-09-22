const dev = {
  s3: {
    REGION: "us-east-1"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://mmu88bp0wd.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_2WstUUguS",
    APP_CLIENT_ID: "20f6anmi1dovd070l5ea3p28ge",
    IDENTITY_POOL_ID: "us-east-1:c04ce68c-7fdc-414a-8ddf-1f10e9b0fdc6"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_v1amvR35uoCNduJfkqGB8RLD",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1h5n5ttet1hy0"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_2WstUUguS",
    APP_CLIENT_ID: "20f6anmi1dovd070l5ea3p28ge",
    IDENTITY_POOL_ID: "us-east-2:0a0b3fc2-f726-41f1-a8c3-76bdadf70726"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
