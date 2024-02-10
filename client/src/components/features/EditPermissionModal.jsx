import React from "react";
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
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

const EditPermissionModal = ({ open, handleToggle, details }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const textTop = "עדכן הרשאה למשתמש -  ";

  return (
    <Dialog open={open} size="sm">
      <form
        className="flex flex-col relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <IoMdClose
          onClick={handleToggle}
          className="absolute left-2 top-2 text-[2.2rem] hover:cursor-pointer hover:bg-blue-gray-100 rounded-full transition-all duration-150 ease-in p-1"
        />
        <DialogHeader className="flex flex-col items-start">
          <Typography className="mb-1" variant="h4">
            {textTop + details?.requesterEmail}
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Controller
            name="permissionType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select label="עדכן סוג הרשאה" variant="static" {...field}>
                <Option value="freeBusyRead">בטל הרשאות</Option>
                <Option value="read">קריאה בלבד</Option>
                <Option value="write">קריאה ועריכה</Option>
              </Select>
            )}
          />
        </DialogBody>
        <DialogFooter className="space-x-2 justify-start">
          <Button variant="text" color="gray" type="submit">
            עדכן
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
