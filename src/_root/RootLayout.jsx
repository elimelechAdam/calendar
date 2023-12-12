import { AuthenticatedTemplate } from "@azure/msal-react";
import { Outlet, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  console.log("account", account);

  return (
    <>
      {!account ? (
        <Navigate to="/" />
      ) : (
        <AuthenticatedTemplate>
          <section className="flex">
            <Sidebar name={account.name} />
            <Outlet />
          </section>
        </AuthenticatedTemplate>
      )}
    </>
  );
};

export default RootLayout;
