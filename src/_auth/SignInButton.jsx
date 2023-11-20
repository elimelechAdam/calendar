import { useMsal } from "@azure/msal-react";
import { config } from "../lib/utils/msal-config";

const SignInButton = () => {
  const msal = useMsal();

  const handleSignIn = async () => {
    await msal.instance.loginRedirect({
      scopes: config.scopes,
      prompt: "select_account",
    });
  };

  return <button onClick={handleSignIn}>sign in with microsoft</button>;
};

export default SignInButton;
