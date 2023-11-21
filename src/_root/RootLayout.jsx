import { AuthenticatedTemplate } from "@azure/msal-react";
import { Outlet, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const RootLayout = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();

  return (
    <>
      {!account ? (
        <Navigate to="/sign-in" />
      ) : (
        <AuthenticatedTemplate>
          <Outlet />
        </AuthenticatedTemplate>
      )}
    </>
  );
};

export default RootLayout;
