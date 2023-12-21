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

  const getPermissionsQuery = (page) => {
    return useQuery({
      queryKey: ["permissions", user, page],
      queryFn: () => getPermissions(user.email, page),
    });
  };

  const getRequestsQuery = (page) => {
    return useQuery({
      queryKey: ["requests", user, page],
      queryFn: () => getRequests(user.email, page),
    });
  };

  const createRequestMutation = () => {
    return useMutation({
      mutationKey: ["createRequest"],
      mutationFn: async (params) => {
        await createRequest(user.email, params);
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
