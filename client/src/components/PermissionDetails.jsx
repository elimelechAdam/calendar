import React from "react";
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

const PermissionsDetails = React.memo(({ data }) => {
  const { updatePermissionMutation } = useDbQuerys();
  const { mutateAsync, isPending, isError } = updatePermissionMutation();

  const handleApprove = async (status) => {
    try {
      await mutateAsync({
        id: detail._id,
        requesterEmail: detail.requesterEmail,
        requestStatus: status,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const classes = "p-4 border-b border-blue-gray-50";
  return (
    <>
      {data.map((detail) => (
        <motion.tr key={detail._id} variants={TableItemVariants}>
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
                value={changeRequestsStatusToHeb(detail.requestStatus)}
                color={
                  detail.requestStatus === "approved"
                    ? "green"
                    : detail.requestStatus === "denied"
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
            {detail.requestStatus === "approved" ||
            detail.requestStatus === "denied" ? (
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
            {detail.requestStatus === "approved" && (
              <div className="m-max flex gap-2">
                <Tooltip content="לחץ לשנות הרשאה">
                  <Typography
                    color="blue"
                    className="text-[1.3rem] cursor-pointer"
                    type="button"
                  >
                    <BiSolidMessageSquareEdit />
                  </Typography>
                </Tooltip>
              </div>
            )}
          </td>
        </motion.tr>
      ))}
    </>
  );
});

export default PermissionsDetails;
