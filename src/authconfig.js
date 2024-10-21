// src/authConfig.js

import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "a324ce3a-ce9f-40bc-a1ac-c11ceeb23f71", // Your Application (client) ID
    authority: "https://login.microsoftonline.com/097464b8-069c-453e-9254-c17ec707310d", // Your Directory (tenant) ID
    redirectUri: "http://localhost:3000", // Must match the Redirect URI in Azure AD
  },
  cache: {
    cacheLocation: "sessionStorage", // Options: "localStorage" or "sessionStorage"
    storeAuthStateInCookie: false, // Set to true if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
      logLevel: LogLevel.Info, // Adjust log level as needed
      piiLoggingEnabled: false, // Set to true if you need to log personally identifiable information
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
