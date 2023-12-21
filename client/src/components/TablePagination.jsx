import { Button, Typography } from "@material-tailwind/react";

const TablePagination = ({
  currentPage,
  totalPages,
  isPending,
  setPage,
  page,
}) => {
  return (
    <>
      <Typography variant="small" color="blue-gray" className="font-normal">
        עמוד {currentPage} מתוך {totalPages}
      </Typography>
      <div className="flex gap-2">
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={isPending || page === 1}
        >
          הקודם
        </Button>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={isPending || page >= totalPages}
        >
          הבא
        </Button>
      </div>
    </>
  );
};

export default TablePagination;
