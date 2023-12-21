import { useState } from "react";
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
import CopyRight from "./CopyRight";

const Sidebar = ({ name }) => {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);

  return (
    <Card className="min-h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 justify-between">
      <div>
        <div className="mb-2 flex items-center gap-4 p-4">
          <img
            src="https://www.wxg.co.il/app/themes/wxg/resources/assets/images/WXG-Logo.png"
            alt="brand"
            className="h-full"
          />
        </div>
        <List>
          <Accordion
            icon={
              <ChevronLeftIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 `}
              />
            }
          >
            <Link to="requests">
              <ListItem className="p-0">
                <AccordionHeader className="border-b-0 p-3">
                  <ListItemPrefix>
                    <CalendarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className=" font-normal">
                    בקשות שלי ליומנים
                  </Typography>
                </AccordionHeader>
              </ListItem>
            </Link>
          </Accordion>
          <Accordion
            icon={
              <ChevronLeftIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 
              }`}
              />
            }
          >
            <Link to="permissions">
              <ListItem className="p-0">
                <AccordionHeader className="border-b-0 p-3">
                  <ListItemPrefix>
                    <CalendarDaysIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className=" font-normal">
                    בקשות ליומן שלי
                  </Typography>
                </AccordionHeader>
              </ListItem>
            </Link>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem className="gap-2">
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

      <div className="">
        <SignOutButton />
        <CopyRight />
      </div>
    </Card>
  );
};

export default Sidebar;
