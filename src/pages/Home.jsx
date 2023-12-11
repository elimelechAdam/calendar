import CalendarPermissions from "../componenets/CalendarPermissions";
import { GivePermissions } from "../componenets/GivePermissions";
import { Sidebar } from "../componenets/Sidebar";
import { Outlet } from "react-router-dom";
// import EmailForm from "./componenets/EmailForm";
export const Home = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex w-full p-8 ">
          <CalendarPermissions />
          {/* View who have permission to my calendar */}
          {/* <GivePermissions /> Give permissions to other users */}
          <Outlet />
        </div>
      </div>
    </>
  );
};
