import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { PermissionFormModal } from "./PermissionFormModal";
import { useDbQuerys } from "../lib/react-query/db-querys";
import PermissionsDetails from "./PermissionDetails";
import TablePagination from "./TablePagination";
import TableTabs from "./TableTabs";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import { useUserStore } from "../lib/stores/user-store";

const TABLE_HEAD = [
  "למי נשלחה הרשאה",
  "סוג הרשאה",
  "מצב הרשאה",
  "תאריך השליחה",
  "פעולות",
];

function PermissionsTable() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(!openModal);
  const { getPermissionsQuery } = useDbQuerys();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const { data, isPending, isError } = getPermissionsQuery(activeTab, page);

  if (isError) return <div>error...</div>;
  return (
    <>
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
                onClick={handleOpen}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> תן הרשאה
                ליומנך
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <TableTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="w-full md:w-72">
              <Input
                label="חפש לפי דואר אלקטרוני"
                icon={
                  <MagnifyingGlassIcon className="h-5 w-5 relative right-[15.5rem]" />
                }
              />
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
            <tbody>
              {isPending ? (
                <tr>
                  <td>
                    <LoadingSkeleton />
                  </td>
                </tr>
              ) : (
                data.permissions.map((detail) => (
                  <PermissionsDetails detail={detail} key={detail._id} />
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
            </tbody>
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
      <PermissionFormModal open={openModal} setOpen={handleOpen} />
    </>
  );
}

export default PermissionsTable;
