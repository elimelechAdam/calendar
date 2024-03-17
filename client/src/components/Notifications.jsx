import {
  Button,
  Card,
  Dialog,
  DialogHeader,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { useDbQuerys } from "../lib/react-query/db-querys";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  changeNotificationTypeToHeb,
  changeRequestsTypeToHeb,
} from "../lib/utils/utils";

export const Notifications = ({ handleOpen, open, email }) => {
  const { getNotificationsQuery } = useDbQuerys();
  const { data, isLoading, isError } = getNotificationsQuery();
  console.log(data);
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
            {data?.map((notification, index) => (
              <ListItem key={notification._id} className="flex justify-between">
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
                  <div className="flex">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        handleOpen();
                      }}
                    >
                      אשר בקשה
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        handleOpen();
                      }}
                    >
                      דחה בקשה
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={(e) => {
                      handleRemovePermission(item.emailAddress.address);
                    }}
                  >
                    הסר
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </Card>
      </Dialog>
    </>
  );
};
