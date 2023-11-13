import React, { useEffect } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import config from "../config/Config";

const AuthRedirect = () => {
  useEffect(() => {
    const msalInstance = new PublicClientApplication(config);
    msalInstance
      .handleRedirectPromise()
      .then((response) => {
        // Handle the response as needed
        // Redirect to the home page or another appropriate page
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>Authenticating...</div>;
};

export default AuthRedirect;
