import PermissionsTable from "../../components/PermissionsTable";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../lib/utils/msg-api";
import { useUserStore } from "../../lib/stores/user-store";
import { useEffect } from "react";

const Permissions = () => {
  return (
    <div className="w-full p-5">
      <PermissionsTable />
    </div>
  );
};

export default Permissions;
