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
import { useForm, Controller } from "react-hook-form";
import { useDbQuerys } from "../lib/react-query/db-querys";

export function RequestFormModal({ open, setOpen }) {
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      recipientEmail: "",
      requestType: "",
    },
  });
  const { createRequestMutation } = useDbQuerys();
  const { mutateAsync } = createRequestMutation();

  const submitHandler = async (data) => {
    try {
      await mutateAsync(data);
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} size="xs">
        <form
          className="flex flex-col justify-between relative"
          onSubmit={handleSubmit(submitHandler)}
        >
          <IoMdClose
            onClick={handleClose}
            className="absolute left-2 top-2 text-[2.2rem] hover:cursor-pointer hover:bg-blue-gray-100 rounded-full transition-all duration-150 ease-in p-1"
          />
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              שלח בקשה ליומן
            </Typography>
          </DialogHeader>
          <DialogBody>
            <Typography className="mb-6 -mt-7 " color="gray" variant="lead">
              הכנס את כתובת המייל של המשתמש ולחץ על שלח בקשה
            </Typography>
            <div className="grid gap-6">
              <Controller
                name="recipientEmail"
                control={control}
                render={({ field }) => <Input label="כתובת מייל" {...field} />}
              />
              <Controller
                name="requestType"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="אנא בחר בהרשאה" variant="static">
                    <Option value="read">קריאה בלבד</Option>
                    <Option value="write">קריאה ועריכה</Option>
                  </Select>
                )}
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2 justify-start">
            <Button variant="text" color="gray" type="submit">
              שלח בקשה
            </Button>
            <Button variant="text" color="gray" onClick={handleClose}>
              ביטול
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}