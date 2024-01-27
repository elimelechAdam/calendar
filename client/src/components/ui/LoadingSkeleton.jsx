import React from "react";
import { Typography } from "@material-tailwind/react";

export const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse mt-3">
      <Typography
        as="div"
        variant="h1"
        className="mb-4 h-3 w-80 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-96 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-80 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </div>
  );
};
