import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import { grantCalendarPermissions, searchUser } from "../utils/msg-api";

export const useMsgQuerys = () => {
  const user = useUserStore((state) => state.user);

  const grantCalendarPermissionsMutation = () => {
    return useMutation({
      mutationKey: ["grantCalendarPermissions"],
      mutationFn: async ({ email, role }) => {
        await grantCalendarPermissions({
          email: email,
          userId: user.id,
          role: role,
        });
      },
      onSuccess: () => {
        console.log("success");
      },
    });
  };

  const getUserDataQuery = (searchTerm) => {
    return useQuery({
      queryKey: ["getUserData", searchTerm],
      enabled: !!searchTerm,
      queryFn: async () => {
        const res = await searchUser(searchTerm);
        console.log(res);
        if (res) return res;
      },
    });
  };

  return {
    grantCalendarPermissionsMutation,
    getUserDataQuery,
  };
};
