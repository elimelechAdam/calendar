import { useMsal } from "@azure/msal-react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (accounts.length > 0) {
      // Attempt to remove the user session
      instance
        .logoutRedirect({
          account: instance.getAccountByHomeId(accounts[0].homeAccountId),
          onRedirectNavigate: () => false, // Prevent redirection
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Navigate to the root of the application
    navigate("/");
  };

  return (
    <Button
      onClick={handleSignOut}
      className="flex items-center justify-center gap-3 font-bold text-md mb-3">
      <PowerIcon className="h-5 w-5" />
      התנתק
    </Button>
  );
};

export default SignOutButton;
