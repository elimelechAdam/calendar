import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import {
  createRequest,
  getPermissions,
  getRequests,
  updateRequest,
} from "../utils/db-api";

export const useDbQuerys = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const getPermissionsQuery = () => {
    return useQuery({
      queryKey: ["permissions"],
      queryFn: () => getPermissions(user.email),
    });
  };

  const getRequestsQuery = () => {
    return useQuery({
      queryKey: ["requests"],
      queryFn: () => getRequests(user.email),
    });
  };

  const createRequestMutation = () => {
    return useMutation({
      mutationKey: ["createRequest", user.email],
      mutationFn: (params) => {
        createRequest(user.email, params);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("requests");
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
