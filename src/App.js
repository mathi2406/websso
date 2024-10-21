// src/App.js

import React, { useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authconfig";
import UserInfo from "./UserInfo";
import "./App.css"; // Optional: For component-specific styles

function App() {
  const { instance, inProgress, error } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((response) => {
        console.log("Login successful:", response);
      })
      .catch((e) => {
        console.error("Login failed:", e);
      });
  };

  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error);
    }
  }, [error]);

  return (
    <div className="App">
   
      <header className="App-header">
        <h1>React SSO with Microsoft</h1>
        {isAuthenticated ? (
          <UserInfo />
        ) : (
          <button onClick={handleLogin} className="button">
            Login with Microsoft
          </button>
        )}
        {inProgress === "handleRedirect" && <p>Loading...</p>}
        {error && (
          <p className="error">
            <strong>Error:</strong> {error.message}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
