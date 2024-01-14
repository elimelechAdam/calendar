import React, { useEffect, useState } from "react";
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
  Card,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { useForm, Controller } from "react-hook-form";
import { useDbQuerys } from "../lib/react-query/db-querys";
import { useMsgQuerys } from "../lib/react-query/msg-querys";

export function RequestFormModal({ open, setOpen }) {
  const { getUserDataQuery } = useMsgQuerys();

  const [users, setUsers] = useState([]);

  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipientEmail: "",
      requestType: "",
    },
  });
  const { createRequestMutation } = useDbQuerys();
  const { mutateAsync, isPending, isError } = createRequestMutation();

  const { data: userData, isPending: isUserDataLoading } = getUserDataQuery(
    watch("recipientEmail")
  );
  useEffect(() => {
    setUsers(userData);
  }, [userData]);
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
            <div className="grid gap-4">
              <div className="relative">
                <Controller
                  name="recipientEmail"
                  control={control}
                  rules={{
                    required: "שדה חובה",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "אנא הכנס כתובת מייל תקינה",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="כתובת מייל"
                      {...field}
                      onChange={(e) => {
                        setValue("recipientEmail", e.target.value);
                      }}
                    />
                  )}
                />
                <Card className="absolute z-50 divide-y-2 w-full bg-[#212121] text-white mt-1 max-h-80 overflow-auto">
                  {users?.map((user) => {
                    console.log(user);
                    return (
                      <div className="px-2 py-3" key={user.id}>
                        <Typography
                          onClick={() => {
                            setValue("recipientEmail", user.mail);
                            setUsers([]);
                          }}
                          className="hover:cursor-pointer"
                        >
                          {user?.mail}
                        </Typography>
                      </div>
                    );
                  })}
                </Card>
              </div>
              {errors?.recipientEmail && (
                <Typography color="red" className="font-normal text-sm">
                  {errors.recipientEmail.message}
                </Typography>
              )}
              <Controller
                name="requestType"
                control={control}
                rules={{ required: "שדה חובה" }}
                render={({ field }) => (
                  <Select {...field} label="אנא בחר בהרשאה" variant="static">
                    <Option value="read">קריאה בלבד</Option>
                    <Option value="write">קריאה ועריכה</Option>
                  </Select>
                )}
              />
              {errors?.recipientEmail && (
                <Typography color="red" className="font-normal text-sm">
                  {errors.recipientEmail.message}
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
              {isPending ? "שולח בקשה..." : "שלח בקשה"}
            </Button>
            <Button variant="text" color="gray" onClick={handleClose}>
              ביטול
            </Button>
          </DialogFooter>
          {/* {isError && (
          <Typography color="red" className="mt-1 font-normal">
            לא ניתן לשלוח בבקשה
          </Typography>
        )} */}
        </form>
      </Dialog>
    </>
  );
}
