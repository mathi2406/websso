
// src/UserInfo.js

import React, { useEffect, useState, useCallback } from "react";
import { useMsal } from "@azure/msal-react";

const UserInfo = () => {
  const { accounts, instance } = useMsal();
  const user = accounts[0];
  const [profilePicUrl, setProfilePicUrl] = useState("");

  // Function to fetch the profile picture from Microsoft Graph API
  const fetchProfilePicture = useCallback(async () => {
    if (!user) return; // Ensure user is defined

    const request = {
      scopes: ["User.Read"], // Required scope to access user information
      account: user, // Specify the account for the token acquisition
    };

    try {
      // Acquire token silently
      const tokenResponse = await instance.acquireTokenSilent(request);
      const accessToken = tokenResponse.accessToken;

      // Fetch the profile picture
      const response = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Check if the response is a success
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProfilePicUrl(imageUrl); // Set the profile picture URL
      } else if (response.status === 404) {
        console.warn("Profile picture not found."); // Log if no picture exists
      } else {
        console.error("Failed to fetch profile picture:", response.status);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }, [instance, user]); // Dependencies for the useCallback hook

  // Fetch profile picture when the component mounts or when the user changes
  useEffect(() => {
    fetchProfilePicture();
  }, [fetchProfilePicture]); // Run effect whenever fetchProfilePicture changes

  const handleLogout = () => {
    instance
      .logoutPopup()
      .then(() => {
        console.log("Logout successful");
      })
      .catch((e) => {
        console.error("Logout failed:", e);
      });
  };

  return (
    <div className="user-info">
      {user && (
        <>
          <h2>Welcome, {user.name || "User"}</h2>
          <p>Email: {user.username || "Unknown"}</p>
          {profilePicUrl ? (
            <img
              src={profilePicUrl}
              alt="Profile"
              className="profile-pic"
              style={{ width: "100px", borderRadius: "50%" }} // Styling the profile picture
            />
          ) : (
            <img
              src="user.png" // Path to a default profile picture
              alt="Default Profile"
              className="profile-pic"
              style={{ width: "100px", borderRadius: "50%" }} // Styling for the fallback picture
            />
          )}
          <button onClick={handleLogout} className="button">
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default UserInfo;
