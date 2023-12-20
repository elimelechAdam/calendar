import React from "react";
import { Button, Typography } from "@material-tailwind/react";

const TablePagination = ({ currentPage, totalPages, setPage }) => {
  const handleNextPage = () => {
    setPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setPage(currentPage - 1);
  };
  return (
    <div className="flex items-center justify-between gap-2">
      <Typography variant="small" color="blue-gray" className="font-normal">
        עמוד {currentPage} מתוך {totalPages}
      </Typography>
      <div className="flex gap-2">
        <Button
          variant="outlined"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          הבא
        </Button>
        <Button
          variant="outlined"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          הקודם
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
