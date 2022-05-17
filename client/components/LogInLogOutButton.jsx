import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

/**
 * A login or logout butt, Log In button if the user is logged out
 * a Log Out button if the user is logged in
 * @returns
 */
const LogInLogOutButton = () => {
  const { user } = useUser();

  if (user) {
    return (
      <a className="log-in-out-button" href="/api/auth/logout">
        Log Out
      </a>
    );
  } else {
    return (
      <a className="log-in-out-button" href="/api/auth/login">
        Log In
      </a>
    );
  }
};

export default LogInLogOutButton;
