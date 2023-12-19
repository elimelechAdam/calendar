import React from "react";
import { Typography, Chip } from "@material-tailwind/react";
import { changeRequestsTypeToHeb } from "../lib/utils/utils";

const AllRequestsDetails = React.memo(({ detail }) => {
  return (
    <tr key={detail._id}>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {detail.recipientEmail}
            </Typography>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal flex"
        >
          {changeRequestsTypeToHeb(detail.requestType)}
        </Typography>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
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
      <td className="p-4 border-b border-blue-gray-50">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal flex"
        >
          {new Date(detail.createdAt).toLocaleDateString("he-IL")}
        </Typography>
      </td>
    </tr>
  );
});

export default AllRequestsDetails;
