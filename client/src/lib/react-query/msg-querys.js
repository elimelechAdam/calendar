import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import { grantCalendarPermissions, searchUser } from "../utils/msg-api";
import { useDebounce } from "../../hooks/useDebounce";

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
    const debouncedSearch = useDebounce(searchTerm, 500);
    return useQuery({
      queryKey: ["getUserData", debouncedSearch],
      enabled: !!debouncedSearch,
      queryFn: async () => {
        const res = await searchUser(debouncedSearch);
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
