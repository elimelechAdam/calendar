import { Typography } from "@material-tailwind/react";
import React from "react";
import { useUserStore } from "../lib/stores/user-store";
import { IoClose } from "react-icons/io5";

export const UserInfo = ({ name, toggleTooltip }) => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div className="flex flex-col items-center w-full p-2 my-3">
      <div className="absolute left-2 top-3">
        <IoClose className="text-xl cursor-pointer" onClick={toggleTooltip} />
      </div>
      <Typography color="white" className="text-center">
        שם העובד : {name}
      </Typography>
      <Typography color="white" className="text-center">
        כתובת אימייל : {user.email}
      </Typography>
    </div>
  );
};
