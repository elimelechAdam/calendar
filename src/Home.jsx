import React from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useAppContext } from "./context/appContext";
import CalendarPermissions from "./componenets/CalendarPermissions";
// import EmailForm from "./componenets/EmailForm";
export const Home = () => {
  const app = useAppContext();
  console.log(app.user);
  const authProvider = app.authProvider;
  console.log("Home authProvider", authProvider);
  return (
    <>
      <AuthenticatedTemplate>
        <h1>Welcome !</h1>
        <button onClick={app.signOut}>Signout</button>

        <CalendarPermissions authProvider={authProvider} />

        {/* <EmailForm authProvider={authProvider} /> Works but no need */}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>You are not authenticated!</h1>
        <button onClick={app.signIn}>Login</button>
      </UnauthenticatedTemplate>
    </>
  );
};
