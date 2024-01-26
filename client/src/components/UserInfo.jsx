import { Typography } from "@material-tailwind/react";
import React from "react";

export const UserInfo = ({ name, email }) => {
  return (
    <div className="flex flex-col items-center w-full p-2 my-3">
      <Typography color="white" className="text-center">
        שם העובד : {name}
      </Typography>
      <Typography color="white" className="text-center">
        כתובת אימייל : {email}
      </Typography>
    </div>
  );
};
