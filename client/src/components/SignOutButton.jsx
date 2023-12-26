import { useMsal } from "@azure/msal-react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./../lib/stores/user-store";
import { motion } from "framer-motion";

const SignOutButton = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const logOut = useUserStore((state) => state.clearUser);

  const handleSignOut = () => {
    if (accounts.length > 0) {
      // Attempt to remove the user session
      instance
        .logoutRedirect({
          account: instance.getAccountByHomeId(accounts[0].homeAccountId),
          onRedirectNavigate: () => false, // Prevent redirection
        })
        .then(() => {
          // Remove the user from the global store
          logOut();
          navigate("/");
        })
        .catch((error) => {
          console.error("failed to sign out:", error);
        });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        onClick={handleSignOut}
        className="flex items-center justify-center gap-3 font-bold text-md mb-3 w-full"
      >
        <PowerIcon className="h-5 w-5" />
        התנתק
      </Button>
    </motion.div>
  );
};

export default SignOutButton;
