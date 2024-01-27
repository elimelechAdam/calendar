import React, { useEffect, useState } from "react";
import { Typography, Chip, Tooltip } from "@material-tailwind/react";
import {
  changeRequestsStatusToHeb,
  changeRequestsTypeToHeb,
} from "../lib/utils/utils";
import { IoIosCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { useDbQuerys } from "../lib/react-query/db-querys";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { motion } from "framer-motion";
import { TableItemVariants } from "../lib/utils/variants";
import EditPermissionModal from "./features/EditPermissionModal";
import { useToggle } from "../hooks/useToggle";

const PermissionsDetails = React.memo(({ data }) => {
  const { updatePermissionMutation } = useDbQuerys();
  const { mutateAsync, isPending, isError } = updatePermissionMutation();
  const [toggleModal, setToggleModal] = useToggle();

  const handleApprove = async (status) => {
    try {
      await mutateAsync({
        id: data._id,
        requesterEmail: data.requesterEmail,
        requestStatus: status,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const classes = "p-4 border-b border-blue-gray-50";
  return (
    <motion.tr variants={TableItemVariants}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {data.requesterEmail}
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
          {changeRequestsTypeToHeb(data.requestType)}
        </Typography>
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={changeRequestsStatusToHeb(data.requestStatus)}
            color={
              data.requestStatus === "approved"
                ? "green"
                : data.requestStatus === "denied"
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
          {new Date(data.createdAt).toLocaleDateString("he-IL")}
        </Typography>
      </td>
      <td className={` ${classes} flex gap-3`}>
        <div>&nbsp;</div>
        {data.requestStatus === "approved" ||
        data.requestStatus === "denied" ? (
          ""
        ) : (
          <div className="m-max flex gap-2">
            <Tooltip content="לחץ לדחות בקשה">
              <Typography
                color="red"
                className="text-[1.3rem] cursor-pointer"
                type="button"
                onClick={() => handleApprove("denied")}
              >
                <IoMdCloseCircle />
              </Typography>
            </Tooltip>
            <Tooltip content="לחץ לאשר בקשה">
              <Typography
                color="green"
                className="text-[1.3rem] cursor-pointer"
                type="button"
                onClick={() => handleApprove("approved")}
              >
                <IoIosCheckmarkCircle />
              </Typography>
            </Tooltip>
          </div>
        )}
        {data.requestStatus === "approved" && (
          <div className="m-max flex gap-2">
            <Tooltip content="לחץ לשנות הרשאה">
              <Typography
                color="blue"
                className="text-[1.3rem] cursor-pointer"
                type="button"
                onClick={() => {}}
              >
                <BiSolidMessageSquareEdit />
              </Typography>
            </Tooltip>
          </div>
        )}
      </td>
    </motion.tr>
  );
});

export default PermissionsDetails;
