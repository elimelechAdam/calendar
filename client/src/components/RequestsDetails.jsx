import React from "react";
import { Typography, Chip } from "@material-tailwind/react";
import {
  changeRequestsStatusToHeb,
  changeRequestsTypeToHeb,
  dateFormat,
} from "../lib/utils/utils";
import { motion } from "framer-motion";
import { TableItemVariants } from "../lib/utils/variants";

const RequestsDetails = React.memo(({ data }) => {
  return (
    <motion.tr key={data._id} variants={TableItemVariants}>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70">
              {data.recipientEmail}
            </Typography>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal flex">
          {changeRequestsTypeToHeb(data.requestType)}
        </Typography>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
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
      <td className="p-4 border-b border-blue-gray-50">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal flex">
          {dateFormat(data.createdAt)}
        </Typography>
      </td>
    </motion.tr>
  );
});

export default RequestsDetails;
