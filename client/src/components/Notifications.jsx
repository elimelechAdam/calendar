import {
  Button,
  Card,
  Dialog,
  DialogHeader,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  changeNotificationTypeToHeb,
  changeRequestsTypeToHeb,
  dateFormat,
} from "../lib/utils/utils";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import React, { useEffect } from "react";
import { useDbQuerys } from "./../lib/react-query/db-querys";

export const Notifications = ({ handleOpen, open, email, data, isPending }) => {
  const { mutate } = useDbQuerys().deleteNotificationsMutation();

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>
          <div className="flex justify-between w-full">
            <Typography variant="h5">התראות</Typography>
            <IoIosCloseCircleOutline
              size={20}
              onClick={handleOpen}
              className="cursor-pointer"
            />
          </div>
        </DialogHeader>
        <Card className="w-full max-h-96 overflow-auto card-scrollbar">
          {/* // recipientEmail: 'adamtest@wxg.co.il', senderEmail: 'AdamE@wxg.co.il', requestType: 'write', message: 'You have a new request' */}
          <List className="flex flex-col gap-1">
            {isPending ? (
              <LoadingSkeleton />
            ) : (
              data?.map((notification) => (
                <ListItem
                  key={notification._id}
                  className="flex justify-between">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      <span>
                        {changeNotificationTypeToHeb(notification.message)}
                      </span>
                      <span className="font-normal"> מאת </span>
                      <span>{notification.senderEmail}</span>
                    </Typography>

                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal">
                      <span>
                        סוג בקשה{" "}
                        {changeRequestsTypeToHeb(notification.requestType)}
                      </span>
                    </Typography>
                    <Typography>
                      <span>{dateFormat(notification.createdAt)}</span>
                    </Typography>
                  </div>
                </ListItem>
              ))
            )}
          </List>
          {!data?.length ? (
            <Typography variant="h6" color="blue-gray" className="text-center">
              אין התראות
            </Typography>
          ) : (
            <div className="p-2 mb-1">
              <Button
                onClick={() => {
                  handleOpen();
                  mutate();
                }}
                color="blue-gray"
                variant="filled"
                size="sm"
                className="w-1/4">
                סמן כנקרא
              </Button>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
