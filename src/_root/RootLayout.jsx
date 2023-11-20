import { AuthenticatedTemplate } from "@azure/msal-react";
import { Outlet, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const RootLayout = () => {
  const { accounts, instance } = useMsal();

  return (
    <>
      {accounts.length === 0 ? (
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
