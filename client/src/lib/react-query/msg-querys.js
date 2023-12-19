import { useQuery, useMutation } from "react-query";
import { useUserStore } from "../stores/user-store";
import { grantCalendarPermissions } from "../utils/msg-api";

export const useMsgQuerys = () => {
  const user = useUserStore((state) => state.user);

  const grantCalendarPermissionsMutation = () => {
    return useMutation({
      mutationKey: ["grantCalendarPermissions", email, user, role],
      mutationFn: ({ email, role }) =>
        grantCalendarPermissions({ email: email, userId: user.id, role: role }),
      onSuccess: () => {
        console.log("success");
      },
    });
  };

  return {
    grantCalendarPermissionsMutation,
  };
};
