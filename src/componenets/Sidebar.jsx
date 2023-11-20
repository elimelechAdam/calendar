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
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  CubeTransparentIcon,
  CalendarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

export function Sidebar() {
  const app = useAppContext();
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
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
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader className="border-b-0 p-3">
              <ListItemPrefix>
                <CalendarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to={"/הבקשות-שלי"}>
                <Typography color="blue-gray" className=" font-normal">
                  בקשת הרשאה ליומן
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
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <CalendarDaysIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to={"בקשות-ליומני"}>
                <Typography color="blue-gray" className=" font-normal">
                  בקשות ליומן שלי{" "}
                </Typography>
              </Link>
            </AccordionHeader>
          </ListItem>
          {/* <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronLeftIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                ממתין לאישורי{" "}
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronLeftIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                בקשות שאושרו
              </ListItem>
            </List>
          </AccordionBody> */}
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem className="gap-2" onClick={app.signOut}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5 gap-2" />
          </ListItemPrefix>
          היי אדם אלימלך
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

        <ListItem className="gap-2" onClick={app.signOut}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 gap-2" />
          </ListItemPrefix>
          התנתק
        </ListItem>
      </List>
      <Alert
        open={openAlert}
        className="mt-auto"
        onClose={() => setOpenAlert(false)}
      >
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          בקרוב
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          מערכת ניהול SharePoint
        </Typography>
      </Alert>
    </Card>
  );
}
