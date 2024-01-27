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
import { useState } from "react";
import { RequestFormModal } from "./features/RequestFormModal";
import { useDbQuerys } from "../lib/react-query/db-querys";
import RequestsDetails from "./RequestsDetails";
import TablePagination from "./TablePagination";
import TableTabs from "./TableTabs";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import { motion } from "framer-motion";
import useTabWithPagination from "../hooks/useTabWithPagination";
import TableSearch from "./TableSearch";
import { TableContainerVariants } from "../lib/utils/variants";
import { useToggle } from "./../hooks/useToggle";
import { set } from "react-hook-form";

const TABLE_HEAD = [
  "למי נשלחה הבקשה",
  "סוג הבקשה",
  "מצב הבקשה",
  "תאריך השליחה",
];

function RequestsTable() {
  const [toggleModal, setToggleModal] = useToggle();
  const { getRequestsQuery } = useDbQuerys();
  const { activeTab, setActiveTab, page, setPage } = useTabWithPagination();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending, isError } = getRequestsQuery(
    activeTab,
    page,
    searchTerm
  );

  if (isError) return <div>Error</div>;
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
                הבקשות שלי
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                צפה בבקשות ששלחת ליומנים
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={setToggleModal}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> בקש הרשאה
                ליומן
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <TableTabs setActiveTab={setActiveTab} activeTab={activeTab} />
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
                  <td colSpan="the number of columns to span">
                    <LoadingSkeleton />
                  </td>
                </tr>
              ) : (
                <RequestsDetails data={data.requests} />
              )}
              {data?.requests.length === 0 && (
                <tr>
                  <td className="text-center" colSpan="5">
                    <Typography color="gray" variant="h6">
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
      <RequestFormModal open={toggleModal} handleToggle={setToggleModal} />
    </motion.div>
  );
}

export default RequestsTable;
