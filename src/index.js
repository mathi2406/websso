// src/index.js

import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18+
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import App from "./App";
import { msalConfig } from "./authconfig";
import "./index.css"; // Optional: For global styles

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Create root for React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App within MsalProvider
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
