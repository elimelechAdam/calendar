import { Sidebar } from "../componenets/Sidebar";
import { Outlet } from "react-router-dom";
// import EmailForm from "./componenets/EmailForm";
export const Home = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex w-2/3 p-8 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

{
  /* <AuthenticatedTemplate>
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

          <EmailForm authProvider={authProvider} /> Works but no need */
}
{
  /* </AuthenticatedTemplate> */
}
