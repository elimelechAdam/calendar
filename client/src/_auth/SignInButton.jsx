import { useMsal } from "@azure/msal-react";
import { config } from "../lib/utils/msal-config";
import { Button } from "@material-tailwind/react";

const SignInButton = ({ instance }) => {
  const handleSignIn = async () => {
    try {
      await instance.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="filled" onClick={handleSignIn}>
      כניסה למערכת
    </Button>
  );
};

export default SignInButton;
