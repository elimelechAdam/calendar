import { useQuery, useMutation } from "react-query";
import { useUserStore } from "../stores/user-store";
import { grantCalendarPermissions } from "../utils/msg-api";

export const useMsgQuerys = () => {
  const user = useUserStore((state) => state.user);

  const grantCalendarPermissionsMutation = ({ email, role }) => {
    return useMutation({
      mutationKey: ["grantCalendarPermissions", email, user.id, role],
      mutationFn: () =>
        grantCalendarPermissions({ email, userId: user.id, role }),
    });
  };

  return {
    grantCalendarPermissionsMutation,
  };
};
