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
import { RequestFormModal } from "./RequestFormModal";
import { useDbQuerys } from "../lib/react-query/db-querys";
import AllRequestsDetails from "./RequestsDetails";
import TablePagination from "./TablePagination";
import TableTabs from "./TableTabs";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";

const TABLE_HEAD = [
  "למי נשלחה הבקשה",
  "סוג הבקשה",
  "מצב הבקשה",
  "תאריך השליחה",
];

function RequestsTable() {
  const [openModal, setOpenModal] = useState(false);
  const { getRequestsQuery } = useDbQuerys();

  const [page, setPage] = useState(1);

  const { data, isPending, isError } = getRequestsQuery(page);

  const handleOpen = () => setOpenModal(!openModal);
  // will change later to components

  if (isError) return <div>Error</div>;
  return (
    <>
      <Card className="h-full w-full fadeInTable">
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
                onClick={() => setOpenModal(true)}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> בקש הרשאה
                ליומן
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <TableTabs />
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
                  <td colSpan="the number of columns to span">
                    <LoadingSkeleton />
                  </td>
                </tr>
              ) : (
                data.requests.map((detail) => (
                  <AllRequestsDetails detail={detail} key={detail._id} />
                ))
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
      <RequestFormModal open={openModal} setOpen={handleOpen} />
    </>
  );
}

export default RequestsTable;
