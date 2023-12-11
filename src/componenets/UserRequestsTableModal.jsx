import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useAppContext } from "../context/appContext";

export function UserRequestsTableModal({ open, handleOpen }) {
  const [emailDetails, setEmailDetails] = useState("");
  const [permissionLevel, setPermissionLevel] = useState("");
  //context
  const app = useAppContext();
  const authProvider = app.authProvider;
  //   grantAccess
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailDetails);
    console.log(permissionLevel);
    try {
      const res = await app.givePermission(emailDetails, permissionLevel);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} size="xs">
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              תן הרשאה ליומנך
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-6 -mt-7 " color="gray" variant="lead">
            הכנס את כתובת המייל של המשתמש ולחץ על תן הרשאה
          </Typography>
          <div className="grid gap-6">
            <Input
              label="כתובת מייל"
              value={emailDetails}
              onChange={(e) => setEmailDetails(e.target.value)}
            />
            <Select
              onChange={(e) => setPermissionLevel(e)}
              variant="static"
              label="אנא בחר בהרשאה"
            >
              <Option value="read">קריאה בלבד</Option>
              <Option value="write">קריאה ועריכה</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2 justify-start">
          <Button variant="gradient" color="gray" onClick={handleSubmit}>
            תן הרשאה
          </Button>
          <Button variant="text" color="gray" onClick={handleOpen}>
            ביטול
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
