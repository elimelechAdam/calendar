import { AuthenticatedTemplate } from "@azure/msal-react";
import { Outlet, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();

  return (
    <>
      {!account ? (
        <Navigate to="/sign-in" />
      ) : (
        <section>
          <AuthenticatedTemplate>
            <Sidebar />
            <Outlet />
          </AuthenticatedTemplate>
        </section>
      )}
    </>
  );
};

export default RootLayout;
