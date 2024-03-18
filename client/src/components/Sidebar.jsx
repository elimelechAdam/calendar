import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import { UserCircleIcon, InboxIcon } from "@heroicons/react/24/solid";
import { CalendarIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { FiArrowLeft } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";

import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import CopyRight from "./CopyRight";
import { UserInfo } from "./UserInfo";
import { motion } from "framer-motion";
import { WhoHasPermissions } from "./WhoHasPermissions";
import { useState } from "react";
import { Notifications } from "./Notifications";
import { useToggle } from "../hooks/useToggle";

const Sidebar = ({ email, id, name }) => {
  const [toggleModal, setToggleModal] = useToggle();
  const [open, setOpen] = useToggle();

  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpenUse = () => setToggleModal(!toggleModal);
  // getNotificationsQuery

  return (
    <motion.div
      initial={{
        x: 1000,
      }}
      animate={{
        x: 0,
        transition: {
          duration: 0.6,
        },
      }}
      className="max-w-[20rem]"
    >
      <Card className="min-h-screen w-full p-4 shadow-xl shadow-blue-gray-900/5 justify-between">
        <div>
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://www.wxg.co.il/app/themes/wxg/resources/assets/images/WXG-Logo.png"
              alt="brand"
              className="h-full"
            />
          </div>
          <List>
            <Link to="requests">
              <ListItem className="flex justify-between text-lg">
                <ListItemPrefix>
                  <CalendarIcon className="h-5 w-5" />
                </ListItemPrefix>
                בקשות שלי ליומנים
                <Typography color="blue-gray" className="font-normal">
                  <FiArrowLeft />
                </Typography>
              </ListItem>
            </Link>

            <Link to="permissions">
              <ListItem className="flex justify-between text-lg">
                <ListItemPrefix>
                  <CalendarDaysIcon className="h-5 w-5" />
                </ListItemPrefix>
                בקשות ליומן שלי
                <Typography color="blue-gray" className=" font-normal">
                  <FiArrowLeft />
                </Typography>
              </ListItem>
            </Link>

            <ListItem
              className="flex justify-between text-lg"
              onClick={handleOpenUse}
            >
              <ListItemPrefix>
                <MdManageAccounts className="h-5 w-5" />
              </ListItemPrefix>
              למי יש גישות ליומני
              <Typography color="blue-gray" className=" font-normal">
                <FiArrowLeft />
              </Typography>
            </ListItem>

            <hr className="my-2 border-blue-gray-50" />
            <Tooltip
              content={<UserInfo name={name} email={email} />}
              placement="left-start"
            >
              <ListItem className="gap-2">
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 gap-2" />
                </ListItemPrefix>
                היי {name}
              </ListItem>
            </Tooltip>
            <ListItem className="gap-2" onClick={handleOpen}>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              הודעות
              <ListItemSuffix>
                <Chip
                  value="0"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <WhoHasPermissions
              open={toggleModal}
              handleOpen={setToggleModal}
              email={email}
            />
            <Notifications open={open} handleOpen={handleOpen} email={email} />
          </List>
        </div>
        {/* Footer of the sidebar */}
        <div>
          <SignOutButton />
          <CopyRight />
        </div>
      </Card>
    </motion.div>
  );
};

export default Sidebar;
