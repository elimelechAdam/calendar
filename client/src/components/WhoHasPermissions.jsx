import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  List,
  ListItem,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useMsgQuerys } from "../lib/react-query/msg-querys";
import { useDbQuerys } from "../lib/react-query/db-querys";
import { changeRequestsTypeToHeb } from "./../lib/utils/utils";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export function WhoHasPermissions({ handleOpen, open, email }) {
  const { getUserPermissionQuery } = useMsgQuerys();
  const { data, isLoading, isError } = getUserPermissionQuery();
  const { removePermissionMutation } = useDbQuerys();
  const { mutateAsync, isPending } = removePermissionMutation();

  const handleRemovePermission = async (address) => {
    console.log(address, email);
    try {
      await mutateAsync({ address, email });
    } catch (error) {
      console.log(error);
    }
  };
  const userPermissionsMap = data?.map((item) => {
    return (
      <ListItem key={item.id} className="flex justify-between">
        <div>
          <Typography variant="h6" color="blue-gray">
            {item.emailAddress.name} - {item.emailAddress.address}
          </Typography>

          <Typography variant="small" color="gray" className="font-normal">
            {changeRequestsTypeToHeb(item.role)}
          </Typography>
        </div>
        <MdCancel
          size={25}
          onClick={(e) => {
            handleRemovePermission(item.emailAddress.address);
          }}
        />
      </ListItem>
    );
  });
  return (
    <>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>
          <div className="flex justify-between w-full">
            <Typography variant="h5">למי יש הרשאות ליומני</Typography>
            <IoIosCloseCircleOutline
              size={20}
              onClick={handleOpen}
              className="cursor-pointer"
            />
          </div>
        </DialogHeader>
        <Card className="w-full max-h-96 overflow-auto card-scrollbar">
          <List>{data ? userPermissionsMap : <h1>No data found...</h1>}</List>
        </Card>
      </Dialog>
    </>
  );
}
