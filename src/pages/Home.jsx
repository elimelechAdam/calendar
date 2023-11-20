import React from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useAppContext } from "../context/appContext";
import CalendarPermissions from "../componenets/CalendarPermissions";
import GrantCalendarPermission from "../componenets/grantCalendarPermission";
import { Sidebar } from "../componenets/Sidebar";
// import EmailForm from "./componenets/EmailForm";
export const Home = () => {
  const app = useAppContext();
  const authProvider = app.authProvider;
  return (
    <>
      <div className="flex">
        <Sidebar />
        {/* <AuthenticatedTemplate>
          <div className="p-10 border rounded-md flex items-center gap-4">
            <h1 className="border p-2 border-[#009671] rounded-lg text-[#009671] font-bold text-sm">
              Welcome !
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

          <EmailForm authProvider={authProvider} /> Works but no need */}
        {/* </AuthenticatedTemplate> */}
        <div className="bg-gray-100 w-1/2 mt-5 p-5 rounded-xl">
          בקש הרשאה ליומן
        </div>
      </div>
    </>
  );
};
