import {
  Dialog,
  Select,
  DialogBody,
  DialogHeader,
  Button,
} from "@material-tailwind/react";
import React from "react";

const EditPermissionModal = ({ open, details, setOpen }) => {
  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  console.log(details);

  return (
    <Dialog open={open}>
      <DialogHeader></DialogHeader>
      <DialogBody>
        <form>
          <Button onClick={handleClose}>Close</Button>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default EditPermissionModal;
