import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Button,
} from "@material-tailwind/react";
import { UserCircleIcon, InboxIcon } from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  CubeTransparentIcon,
  CalendarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SignOutButton from "./SignoutButton";

const Sidebar = ({ name }) => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 justify-between">
      <div>
        <div className="mb-2 flex items-center gap-4 p-4">
          <img
            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
            alt="brand"
            className="h-8 w-8"
          />
          <Typography variant="h5" color="blue-gray">
            WXG
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronLeftIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 `}
              />
            }>
            <ListItem className="p-0">
              <AccordionHeader className="border-b-0 p-3">
                <ListItemPrefix>
                  <CalendarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Link to="permissions">
                  <Typography color="blue-gray" className=" font-normal">
                    הרשאות ליומן שלי
                  </Typography>
                </Link>
              </AccordionHeader>
            </ListItem>
          </Accordion>
          <Accordion
            open={open === 1}
            icon={
              <ChevronLeftIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 
              }`}
              />
            }>
            <ListItem className="p-0">
              <AccordionHeader className="border-b-0 p-3">
                <ListItemPrefix>
                  <CalendarDaysIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Link to="requests">
                  <Typography color="blue-gray" className=" font-normal">
                    בקשות הרשאה ליומן
                  </Typography>
                </Link>
              </AccordionHeader>
            </ListItem>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem className="gap-2" onClick={() => {}}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 gap-2" />
            </ListItemPrefix>
            היי {name}
          </ListItem>
          <ListItem className="gap-2">
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
        </List>
      </div>
      <Alert
        open={openAlert}
        className="mt-auto mb-2"
        onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          בקרוב
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          מערכת ניהול SharePoint
        </Typography>
      </Alert>
      <SignOutButton />
    </Card>
  );
};

export default Sidebar;
