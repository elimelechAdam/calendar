import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const Error = () => {
  return (
    <div className="h-screen grid place-content-center">
      <Card className="flex justify-center items-center w-96">
        <CardBody>
          <Typography variant="h4" className="text-center">
            משהו השתבש
          </Typography>
          <Typography variant="h5">אנא נסה שוב מאוחר יותר</Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default Error;
