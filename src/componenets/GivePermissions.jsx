import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useAppContext } from "../context/appContext";

export const GivePermissions = () => {
  const [emailDetails, setEmailDetails] = useState("");
  //context
  const app = useAppContext();
  const authProvider = app.authProvider;
  //   grantAccess
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailDetails);
    try {
      const res = await app.givePermission();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <br></br>
      <form onSubmit={handleSubmit}>
        <Input
          label="כתובת מייל"
          value={emailDetails}
          onChange={(e) => setEmailDetails(e.target.value)}
        />
        <br></br>
        <Button type="submit" className="flex items-center gap-3" size="sm">
          <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> תן הרשאה
        </Button>
      </form>
    </>
  );
};
