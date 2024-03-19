import { AuthenticatedTemplate } from "@azure/msal-react";
import { Outlet, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useUserStore } from "./../lib/stores/user-store";
import { Alert } from "@material-tailwind/react";
import { useAlertStore } from "../lib/stores/alert-store";

const RootLayout = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const setUser = useUserStore((state) => state.setUser);
  const { alert, content, color } = useAlertStore((state) => state);

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
          <section className="flex relative">
            <Sidebar {...userData} />
            <Outlet />
            {alert && (
              <Alert
                color={color}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/5 text-center"
                size="sm"
              >
                {content}
              </Alert>
            )}
          </section>
        </AuthenticatedTemplate>
      )}
    </>
  );
};

export default RootLayout;
