import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";

export function PermissionFormModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Dialog open={open} size="xs">
        <form className="flex items-center justify-between relative">
          <IoMdClose
            onClick={handleClose}
            className="absolute left-2 top-2 text-[2.2rem] hover:cursor-pointer hover:bg-blue-gray-100 rounded-full
          transition-all duration-150 ease-in p-1"
          />
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              תן הרשאה ליומנך
            </Typography>
          </DialogHeader>
        </form>
        <DialogBody>
          <Typography className="mb-6 -mt-7 " color="gray" variant="lead">
            הכנס את כתובת המייל של המשתמש ולחץ על תן הרשאה
          </Typography>
          <div className="grid gap-6">
            <Input label="כתובת מייל" />
            <Select variant="static" label="אנא בחר בהרשאה">
              <Option value="read">קריאה בלבד</Option>
              <Option value="write">קריאה ועריכה</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2 justify-start">
          <Button variant="text" color="gray" type="submit">
            תן הרשאה
          </Button>
          <Button variant="text" color="gray" onClick={handleClose}>
            ביטול
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
