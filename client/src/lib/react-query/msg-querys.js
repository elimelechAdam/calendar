import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import { grantCalendarPermissions } from "../utils/msg-api";

export const useMsgQuerys = () => {
  const user = useUserStore((state) => state.user);

  const grantCalendarPermissionsMutation = () => {
    return useMutation({
      mutationKey: ["grantCalendarPermissions"],
      mutationFn: async ({ email, role }) =>
        await grantCalendarPermissions({
          email: email,
          userId: user.id,
          role: role,
        }),
      onSuccess: () => {
        console.log("success");
      },
    });
  };

  return {
    grantCalendarPermissionsMutation,
  };
};
