import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import {
  createRequest,
  getPermissions,
  getRequests,
  updateRequest,
} from "../utils/db-api";

export const useDbQuerys = () => {
  const user = useUserStore((state) => state.user);

  const getPermissionsQuery = () => {
    return useQuery({
      queryKey: ["permissions", user.email],
      queryFn: getPermissions(user.email),
    });
  };

  const getRequestsQuery = () => {
    return useQuery({
      queryKey: ["requests", user.email],
      queryFn: getRequests(user.email),
    });
  };

  const createRequestMutation = () => {
    return useMutation({
      mutationKey: ["createRequest", user.email],

      mutationFn: (params) => {
        console.log("params", params);
        // createRequest(user.email, params);
      },
    });
  };

  const updateRequestMutation = () => {
    return useMutation({
      mutationKey: ["updateRequest"],
      mutationFn: (params) => updateRequest(params.id, params.requestStatus),
    });
  };

  return {
    getPermissionsQuery,
    getRequestsQuery,
    createRequestMutation,
    updateRequestMutation,
  };
};
