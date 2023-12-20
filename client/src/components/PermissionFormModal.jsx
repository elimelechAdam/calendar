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
import { useMsgQuerys } from "../lib/react-query/msg-querys";

export function PermissionFormModal({ open, setOpen }) {
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const { grantCalendarPermissionsMutation } = useMsgQuerys();
  const { mutateAsync, isPending, isError } =
    grantCalendarPermissionsMutation();
  const { control, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const submitHandler = async (data) => {
    try {
      await mutateAsync({
        email: data.email,
        role: data.role,
      });
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} size="sm">
        <form
          className="flex flex-col gap-1 relative"
          onSubmit={handleSubmit(submitHandler)}
        >
          <IoMdClose
            onClick={handleClose}
            className="absolute left-2 top-2 text-[2.2rem] hover:cursor-pointer hover:bg-blue-gray-100 rounded-full
          transition-all duration-150 ease-in p-1"
          />
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              תן הרשאה ליומנך
            </Typography>
          </DialogHeader>
          <DialogBody>
            <Typography className="mb-6 -mt-7 " color="gray" variant="lead">
              הכנס את כתובת המייל של המשתמש ולחץ על תן הרשאה
            </Typography>
            <div className="grid gap-6">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input label="כתובת מייל" {...field} />}
              />
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field} variant="static" label="אנא בחר בהרשאה">
                    <Option value="read">קריאה בלבד</Option>
                    <Option value="write">קריאה ועריכה</Option>
                  </Select>
                )}
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2 justify-start">
            <Button
              variant="text"
              color="gray"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "...נותן הרשאה" : "תן הרשאה"}
            </Button>
            <Button variant="text" color="gray" onClick={handleClose}>
              ביטול
            </Button>
          </DialogFooter>
        </form>
        {isError && (
          <Typography color="red" className="mt-1 font-normal">
            לא ניתן לתת הרשאה
          </Typography>
        )}
      </Dialog>
    </>
  );
}
