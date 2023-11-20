import { UnauthenticatedTemplate } from "@azure/msal-react";
import SignInButton from "./SignInButton";
import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const AuthLayout = () => {
  const { accounts } = useMsal();
  return (
    <>
      {accounts.length > 0 ? (
        <Navigate to="/" />
      ) : (
        <UnauthenticatedTemplate>
          <section className="flex items-center min-h-screen justify-center">
            <div>
              <SignInButton />
            </div>
          </section>
        </UnauthenticatedTemplate>
      )}
    </>
  );
};

export default AuthLayout;
