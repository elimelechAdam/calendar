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
import { MdCancel, MdOutlineCheckCircleOutline } from "react-icons/md";
import {
  changeNotificationTypeToHeb,
  changeRequestsTypeToHeb,
} from "../lib/utils/utils";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import React from "react";

export const Notifications = ({ handleOpen, open, email, data, isPending }) => {
  return (
    <>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>
          <div className="flex justify-between w-full">
            <Typography variant="h5">Notifications</Typography>
            <IoIosCloseCircleOutline
              size={20}
              onClick={handleOpen}
              className="cursor-pointer"
            />
          </div>
        </DialogHeader>
        <Card className="w-full max-h-96 overflow-auto card-scrollbar">
          {/* // recipientEmail: 'adamtest@wxg.co.il', senderEmail: 'AdamE@wxg.co.il', requestType: 'write', message: 'You have a new request' */}
          <List>
            {isPending ? (
              <LoadingSkeleton />
            ) : (
              data?.map((notification) => (
                <ListItem
                  key={notification._id}
                  className="flex justify-between"
                >
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {changeNotificationTypeToHeb(notification.message)}
                    </Typography>

                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {changeRequestsTypeToHeb(notification.requestType)}
                    </Typography>
                  </div>
                  {notification.message === "You have a new request" ? (
                    <div className="flex gap-2">
                      <MdCancel size={25} />
                      <MdOutlineCheckCircleOutline size={25} />
                    </div>
                  ) : (
                    <MdCancel
                      size={25}
                      onClick={(e) => {
                        handleRemovePermission(
                          notification.emailAddress.address
                        );
                      }}
                    />
                  )}
                </ListItem>
              ))
            )}
          </List>
        </Card>
      </Dialog>
    </>
  );
};
