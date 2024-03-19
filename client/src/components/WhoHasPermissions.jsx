import React, { useEffect, useMemo, useState } from "react";
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
import { LoadingSkeleton } from "./ui/LoadingSkeleton";

export function WhoHasPermissions({ handleOpen, open, email }) {
  const { data, isLoading, isError } =
    useMsgQuerys().getUserPermissionQuery(open);
  const { removePermissionMutation } = useDbQuerys();
  const { mutateAsync, isPending } = removePermissionMutation();

  const handleRemovePermission = async (address) => {
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
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <List>
              {!data?.length ? (
                <Typography>לא נמצאו תוצאות</Typography>
              ) : (
                userPermissionsMap
              )}
            </List>
          )}
        </Card>
      </Dialog>
    </>
  );
}
