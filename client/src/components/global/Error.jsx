import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const Error = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Card className="flex items-center w-96 border">
        <CardBody>
          <Typography variant="h4" className="text-center">
            משהו השתבש!
          </Typography>
          <Typography variant="h5">אנא נסה שוב מאוחר יותר</Typography>
        </CardBody>
        <CardFooter className="w-full flex justify-center gap-2">
          <Button color="blue-gray" onClick={() => window.history.back()}>
            חזור
          </Button>
          <Button onClick={() => window.location.reload()}>רענן</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Error;
