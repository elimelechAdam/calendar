import React from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useAppContext } from "./context/appContext";
import CalendarPermissions from "./componenets/CalendarPermissions";
import GrantCalendarPermission from "./componenets/grantCalendarPermission";
// import EmailForm from "./componenets/EmailForm";
export const Home = () => {
  const app = useAppContext();
  const authProvider = app.authProvider;
  return (
    <div className="p-5 bg-white h-screen mx-auto flex flex-col items-center justify-center">
      <AuthenticatedTemplate>
        <div className="p-10 border rounded-md flex items-center gap-4">
          <h1 className="border p-2 border-[#009671] rounded-lg text-[#009671] font-bold text-sm">
            Welcome {app.user.displayName} !
          </h1>
          <button
            onClick={app.signOut}
            className="border p-2 border-[#e43e3e] rounded-lg text-[#e43e3e] font-bold text-sm"
          >
            Signout
          </button>
        </div>
        <GrantCalendarPermission authProvider={authProvider} />
        <CalendarPermissions authProvider={authProvider} />

        {/* <EmailForm authProvider={authProvider} /> Works but no need */}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="p-10 border rounded-md flex flex-col ">
          <h1 className="p-4 border border-[#009671] rounded-lg text-[#009671] font-bold text-xl my-5">
            You are not authenticated!
          </h1>
          <button
            onClick={app.signIn}
            className=" py-2 bg-[#009671] shadow-md rounded-lg text-white font-bold text-md"
          >
            Login
          </button>
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
};
