import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import React from "react";

const TableSearch = ({ setSearchTerm, value }) => {
  return (
    <Input
      label="חפש לפי דואר אלקטרוני"
      onChange={(e) => setSearchTerm({ emails: e.target.value })}
      value={value}
      icon={
        <MagnifyingGlassIcon className="h-5 w-5 relative right-[15.5rem]" />
      }
    />
  );
};

export default TableSearch;
