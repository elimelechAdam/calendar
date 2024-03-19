import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import {
  getCalendarPermissions,
  grantCalendarPermissions,
  searchUser,
} from "../utils/msg-api";
import { useDebounce } from "../../hooks/useDebounce";
import { useAlertStore } from "../stores/alert-store";

export const useMsgQuerys = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries(["getUserPermission", user]);
      },
    });
  };

  const getUserDataQuery = (searchTerm) => {
    const debouncedSearch = useDebounce(searchTerm, 200);
    return useQuery({
      queryKey: ["getUserData", debouncedSearch],
      enabled: !!debouncedSearch,
      queryFn: async () => {
        const res = await searchUser(debouncedSearch);
        if (res) return res;
      },
    });
  };

  const getUserPermissionQuery = (enabled = false) => {
    return useQuery({
      queryKey: ["getUserPermission", user],
      queryFn: () => getCalendarPermissions(),
      enabled,
    });
  };

  return {
    grantCalendarPermissionsMutation,
    getUserDataQuery,
    getUserPermissionQuery,
  };
};
