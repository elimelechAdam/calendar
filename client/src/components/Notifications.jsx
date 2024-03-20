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
import { useNavigate } from "react-router-dom";

export const Notifications = ({ handleOpen, open, email, data, isPending }) => {
  const { mutate } = useDbQuerys().deleteNotificationsMutation();
  const navigate = useNavigate();

  const handleViewClick = (email, message) => {
    handleOpen();
    if (message.startsWith("Permission")) {
      navigate(`/requests?emails=${email}`);
    } else {
      navigate(`/permissions?emails=${email}`);
    }
  };

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
                  className="flex justify-between cursor-default">
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

                  <Button
                    size="sm"
                    onClick={() =>
                      handleViewClick(
                        notification.senderEmail,
                        notification.message
                      )
                    }>
                    צפה
                  </Button>
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
