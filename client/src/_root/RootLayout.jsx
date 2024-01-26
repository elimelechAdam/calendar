import { AuthenticatedTemplate } from "@azure/msal-react";
import { Outlet, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useUserStore } from "./../lib/stores/user-store";

const RootLayout = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  console.log(account);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (account) {
      setUser({
        email: account.username,
        name: account.name,
        id: account.localAccountId,
      });
    }
  }, []);

  const userData = useUserStore((state) => state.user);
  return (
    <>
      {!account ? (
        <Navigate to="/" />
      ) : (
        <AuthenticatedTemplate>
          <section className="flex">
            <Sidebar {...userData} />
            {/* <Sidebar name={account.name} /> */}

            <Outlet />
          </section>
        </AuthenticatedTemplate>
      )}
    </>
  );
};

export default RootLayout;
