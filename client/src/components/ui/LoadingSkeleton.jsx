import React from "react";
import { Typography } from "@material-tailwind/react";

export const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse mt-3">
      <Typography
        as="div"
        variant="h1"
        className="mb-4 h-3 w-[340px] rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-[370px] rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-[380px] rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-[390px] rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-[400px] rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </div>
  );
};
