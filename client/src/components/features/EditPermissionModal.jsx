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
    reset({
      id: details?._id,
      requesterEmail: details?.requesterEmail,
      requestType: details?.requestType,
      requestStatus: details?.requestStatus,
    });
    handleToggle();
  };
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: details?._id,
      requesterEmail: details?.requesterEmail,
      requestType: details?.requestType,
      requestStatus: details?.requestStatus,
    },
  });
  useEffect(() => {
    if (details) {
      // Use setValue for each form field that needs to be updated.
      setValue("id", details._id);
      setValue("requesterEmail", details.requesterEmail);
      setValue("requestType", details.requestType);
      setValue("requestStatus", details.requestStatus);
    }
  }, [details, setValue]);

  const submitHandler = async (data) => {
    try {
      await mutateAsync(data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} handler={handleClose} size="sm">
      <form
        className="flex flex-col relative"
        onSubmit={handleSubmit(submitHandler)}>
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
