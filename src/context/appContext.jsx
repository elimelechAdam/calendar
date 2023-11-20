import React, { useContext, createContext, useState } from "react";

import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { InteractionType } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";

import config from "../config/Config";
import { getUser, grantCalendarAccess } from "../services/graphService";

const appContext = createContext({
  user: undefined,
  error: undefined,
  signIn: undefined,
  signOut: undefined,
  displayError: undefined,
  clearError: undefined,
  authProvider: undefined,
  givePermission: undefined,
  grantAccess: undefined,
});

export function useAppContext() {
  return useContext(appContext);
}

export default function ProvideAppContext({ children }) {
  const auth = useProvideAppContext();
  return <appContext.Provider value={auth}>{children}</appContext.Provider>;
}

function useProvideAppContext() {
  const msal = useMsal();
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);

  const displayError = (message, debug) => {
    setError({ message, debug });
  };

  const clearError = () => {
    setError(undefined);
  };

  // <AuthProviderSnippet>
  // Used by the Graph SDK to authenticate API calls
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance,
    {
      account: msal.instance.getActiveAccount(),
      scopes: config.scopes,
      interactionType: InteractionType.Popup,
    }
  );
  console.log(`first authProvider`, authProvider);

  const signIn = async () => {
    await msal.instance.loginPopup({
      scopes: config.scopes,
      prompt: "select_account",
    });

    // Get the user from Microsoft Graph
    const user = await getUser(authProvider);
    console.log(user);
    setUser({
      displayName: user.displayName || "",
      email: user.mail || user.userPrincipalName || "",
      timeFormat: user.mailboxSettings?.timeFormat || "",
      timeZone: user.mailboxSettings?.timeZone || "UTC",
    });
    window.location.href = "/הבקשות-שלי";
  };

  const signOut = async () => {
    window.location.href = "/";
    await msal.instance.logoutPopup();
    setUser(undefined);
  };

  const givePermission = async () => {
    console.log("giving permission");
    const user = await getUser(authProvider);
    console.log(user);
    const result = await grantCalendarAccess(
      authProvider,
      user.id,
      user.mail || user.userPrincipalName || "",
      "write"
    );
    console.log(result);
  };

  async function grantAccess(email, role) {
    // Assuming `authProvider` and `userId` are available in this context
    try {
      const user = await getUser(authProvider);

      await grantCalendarAccess(authProvider, user.id, email, role);
      alert("Write access granted successfully.");
    } catch (error) {
      console.error("Error granting access:", error);
      alert("Failed to grant access.");
    }
  }

  return {
    user,
    error,
    signIn,
    signOut,
    displayError,
    clearError,
    authProvider,
    givePermission,
    grantAccess,
  };
}
