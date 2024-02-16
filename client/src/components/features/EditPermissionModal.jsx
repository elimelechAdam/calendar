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
import { useDbQuerys } from "../../lib/react-query/db-querys";
import { useEffect } from "react";

const EditPermissionModal = ({ open, handleToggle, details }) => {
  const textTop = "עדכן הרשאה למשתמש -  ";
  const { ownerUpdatePermissionMutation } = useDbQuerys();
  const { mutateAsync, isPending, isError } = ownerUpdatePermissionMutation();

  const handleClose = () => {
    reset();
    handleToggle();
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
      id: details?._id,
      recipientEmail: details?.recipientEmail,
      requestType: details?.requestType,
      requestType: details?.requestType,
    },
  });
  useEffect(() => {
    if (details) {
      // Use setValue for each form field that needs to be updated.
      setValue("id", details._id);
      setValue("recipientEmail", details.recipientEmail);
      setValue("requestType", details.requestType);
      setValue("requestType", details.requestType);
    }
  }, [details, setValue]);

  const submitHandler = async (data) => {
    console.log("submitHandler", data);
    try {
      await mutateAsync(data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} size="sm">
      <form
        className="flex flex-col relative"
        onSubmit={handleSubmit(submitHandler)}
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
            name="requestType"
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
