import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { PermissionFormModal } from "./features/PermissionFormModal";
import { useDbQuerys } from "../lib/react-query/db-querys";
import PermissionsDetails from "./PermissionDetails";
import TablePagination from "./TablePagination";
import TableTabs from "./TableTabs";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import { motion } from "framer-motion";
import useTabWithPagination from "../hooks/useTabWithPagination";
import TableSearch from "./TableSearch";
import { TableContainerVariants } from "../lib/utils/variants";
import { useToggle } from "./../hooks/useToggle";
import EditPermissionModal from "./features/EditPermissionModal";

const TABLE_HEAD = [
  "למי נשלחה הרשאה",
  "סוג הרשאה",
  "מצב הרשאה",
  "תאריך השליחה",
  "פעולות",
];

function PermissionsTable() {
  const [toggleModal, setToggleModal] = useToggle();
  const [toggleEditModal, setToggleEditModal] = useToggle();
  const { getPermissionsQuery } = useDbQuerys();
  const { activeTab, setActiveTab, page, setPage } = useTabWithPagination();
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState({});

  const { data, isPending, isError } = getPermissionsQuery(
    activeTab,
    page,
    searchTerm
  );

  if (isError) return <div>error...</div>;
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                הבקשות ליומן שלי
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                צפה בבקשות הרשאה ליומנך
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={setToggleModal}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> תן הרשאה
                ליומנך
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <TableTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="w-full md:w-72">
              <TableSearch setSearchTerm={setSearchTerm} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={isPending ? "" : TableContainerVariants}
            >
              {isPending ? (
                <tr>
                  <td>
                    <LoadingSkeleton />
                  </td>
                </tr>
              ) : (
                data?.permissions.map((permission) => (
                  <PermissionsDetails
                    key={permission._id}
                    data={permission}
                    handleToggle={setToggleEditModal}
                    setDetails={setDetails}
                  />
                ))
              )}
              {data?.permissions.length === 0 && (
                <tr>
                  <td className="text-center" colSpan="5">
                    <Typography color="blue-gray" className="font-normal">
                      אין תוצאות
                    </Typography>
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <TablePagination
            setPage={setPage}
            page={page}
            totalPages={data?.totalPages}
            currentPage={data?.currentPage}
            isPending={isPending}
          />
        </CardFooter>
      </Card>
      <PermissionFormModal open={toggleModal} handleToggle={setToggleModal} />
      <EditPermissionModal
        open={toggleEditModal}
        details={details}
        handleToggle={setToggleEditModal}
      />
    </motion.div>
  );
}

export default PermissionsTable;
