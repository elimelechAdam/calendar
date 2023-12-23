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

export function PermissionFormModal({ open, setOpen }) {
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const { createPermissionMutation } = useDbQuerys();
  const { mutateAsync, isPending, isError } = createPermissionMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    defaultValues: {
      requesterEmail: "",
      requestType: "",
    },
  });

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
      <Dialog open={open} size="sm">
        <form
          className="flex flex-col relative"
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
            <div className="grid gap-4">
              <Controller
                name="requesterEmail"
                control={control}
                rules={{
                  required: "שדה חובה",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "אנא הכנס כתובת מייל תקינה",
                  },
                }}
                render={({ field }) => <Input label="כתובת מייל" {...field} />}
              />
              {errors?.requesterEmail && (
                <Typography color="red" className="font-normal text-sm">
                  {errors.requesterEmail.message}
                </Typography>
              )}
              <Controller
                name="requestType"
                control={control}
                rules={{ required: "שדה חובה" }}
                render={({ field }) => (
                  <Select {...field} variant="static" label="אנא בחר בהרשאה">
                    <Option value="read">קריאה בלבד</Option>
                    <Option value="write">קריאה ועריכה</Option>
                  </Select>
                )}
              />
              {errors?.requestType && (
                <Typography color="red" className="font-normal text-sm">
                  {errors.requestType.message}
                </Typography>
              )}
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
          {/* {isError && (
            <Typography color="red" className="mt-1 font-normal">
              לא ניתן לתת הרשאה
            </Typography>
          )} */}
        </form>
      </Dialog>
    </>
  );
}
