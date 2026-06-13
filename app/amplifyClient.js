// app/amplifyClient.js
"use client";

import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_mt5gCCe1c",
      userPoolClientId: "412rtrghbcib07g6rehpbf08vp",
      loginWith: {
        email: true,
      },
    },
  },
});

console.log("Amplify initialized");