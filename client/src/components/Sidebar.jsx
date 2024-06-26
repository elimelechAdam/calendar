import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Tooltip,
  CardFooter,
  Alert,
} from "@material-tailwind/react";
import { UserCircleIcon, InboxIcon } from "@heroicons/react/24/solid";
import {
  CalendarIcon,
  CalendarDaysIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { FiArrowLeft } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";

import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import CopyRight from "./CopyRight";
import { UserInfo } from "./UserInfo";
import { motion } from "framer-motion";
import { WhoHasPermissions } from "./WhoHasPermissions";
import { Notifications } from "./Notifications";
import { useToggle } from "../hooks/useToggle";
import { useDbQuerys } from "../lib/react-query/db-querys";
import { useState } from "react";

const Sidebar = ({ email, id, name }) => {
  const [toggleModal, setToggleModal] = useToggle();
  const [open, setOpen] = useToggle();
  const { getNotificationsQuery } = useDbQuerys();
  const [openAlert, setOpenAlert] = useState(true);

  const { data, isPending, isError } = getNotificationsQuery();

  return (
    <>
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
        <Card className="min-h-screen w-full p-3 shadow-xl shadow-blue-gray-900/5 justify-between">
          <div>
            <div className="mb-2 flex items-center gap-4 p-4">
              <img
                src="https://www.wxg.co.il/app/themes/wxg/resources/assets/images/new-logo.png"
                alt="brand"
                className="min-w-[250px] min-h-[80px] max-w-xs max-h-3 w-auto h-auto object-contain"
              />
            </div>
            <List className="">
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
                onClick={setToggleModal}
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
              <ListItem className="gap-2" onClick={setOpen}>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                התראות
                <ListItemSuffix>
                  <Chip
                    value={data?.length || 0}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </List>
          </div>

          {/* Ad for Slowness */}
          <Alert
            open={openAlert}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <Typography variant="h6" className="mb-1">
              איטיות במערכת
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              שימו לב שזאת מערכת ניסיון ולכן המערכת תעבוד עם איטיות
            </Typography>
          </Alert>

          {/* Footer of the sidebar */}
          <CardFooter>
            <SignOutButton />
            <CopyRight />
            <span className="block  text-sm text-center mt-2">
              v{import.meta.env.VITE_VERSION}
            </span>
          </CardFooter>
        </Card>
      </motion.div>
      <WhoHasPermissions
        open={toggleModal}
        handleOpen={setToggleModal}
        email={email}
      />
      <Notifications
        isPending={isPending}
        open={open}
        handleOpen={setOpen}
        email={email}
        data={data}
      />
    </>
  );
};

export default Sidebar;
