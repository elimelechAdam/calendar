import {
  Dialog,
  Select,
  Typography,
  DialogBody,
  DialogHeader,
  Button,
  DialogFooter,
  Option,
} from "@material-tailwind/react";
import React from "react";
import { IoMdClose } from "react-icons/io";

const EditPermissionModal = ({ open, handleToggle, details }) => {
  return (
    <Dialog open={open} size="sm">
      <form className="flex flex-col relative">
        <IoMdClose
          onClick={handleToggle}
          className="absolute left-2 top-2 text-[2.2rem] hover:cursor-pointer hover:bg-blue-gray-100 rounded-full transition-all duration-150 ease-in p-1"
        />
        <DialogHeader className="flex flex-col items-start">
          <Typography className="mb-1" variant="h4">
            שנה הרשאה ל {details?.requesterEmail}
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography className="mb-6 -mt-7 " color="gray" variant="lead">
            משהו רשום פה
          </Typography>
          <Select label="משהו רשום פה" variant="static">
            <Option value="read">קריאה בלבד</Option>
            <Option value="write">קריאה ועריכה</Option>
          </Select>
        </DialogBody>
        <DialogFooter className="space-x-2 justify-start">
          <Button variant="text" color="gray" type="button">
            משהו
          </Button>
          <Button variant="text" color="gray" onClick={handleToggle}>
            ביטול
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default EditPermissionModal;
