import React from "react";
import { Typography, Chip, Tooltip } from "@material-tailwind/react";
import { changeRequestsTypeToHeb } from "../lib/utils/utils";
import { IoIosCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

const PermissionsDetails = React.memo(({ detail }) => {
  const classes = "p-4 border-b border-blue-gray-50";
  return (
    <tr key={detail._id}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {detail.requesterEmail}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal flex"
        >
          {changeRequestsTypeToHeb(detail.requestType)}
        </Typography>
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={detail.requestStatus}
            color={
              detail.requestStatus === "אושר"
                ? "green"
                : detail.requestStatus === "לא אושר"
                ? "red"
                : "blue-gray"
            }
          />
        </div>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal flex"
        >
          {new Date(detail.createdAt).toLocaleDateString("he-IL")}
        </Typography>
      </td>
      <td className={` ${classes} flex gap-3`}>
        <div>&nbsp;</div>
        {detail.requestStatus === "אושר" ? (
          ""
        ) : (
          <>
            <Tooltip content="לחץ לדחות בקשה">
              <Typography
                color="red"
                className="flex text-[1.3rem] cursor-pointer"
              >
                <IoMdCloseCircle />
              </Typography>
            </Tooltip>
            <Tooltip content="לחץ לאשר בקשה">
              <Typography
                color="green"
                className="flex text-[1.3rem] cursor-pointer"
              >
                <IoIosCheckmarkCircle />
              </Typography>
            </Tooltip>
          </>
        )}
      </td>
    </tr>
  );
});

export default PermissionsDetails;
