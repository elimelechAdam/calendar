import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import {
  createPermission,
  createRequest,
  getPermissions,
  getRequests,
  updateRequest,
} from "../utils/db-api";

export const useDbQuerys = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const getPermissionsQuery = (activeTab, page) => {
    return useQuery({
      queryKey: ["permissions", user, activeTab, page],
      queryFn: () => getPermissions(user.email, activeTab, page),
    });
  };

  const getRequestsQuery = (activeTab, page) => {
    return useQuery({
      queryKey: ["requests", user, activeTab, page],
      queryFn: () => getRequests(user.email, activeTab, page),
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

  const updatePermissionMutation = () => {
    return useMutation({
      mutationKey: ["updateRequest"],
      mutationFn: (params) => updateRequest(params.id, params.requestStatus),
      onSuccess: () => {
        queryClient.invalidateQueries("permissions");
      },
    });
  };

  const createPermissionMutation = () => {
    return useMutation({
      mutationKey: ["createPermission"],
      mutationFn: (params) => createPermission(user.email, params),
      onSuccess: () => {
        queryClient.invalidateQueries("permissions");
      },
    });
  };

  return {
    getPermissionsQuery,
    getRequestsQuery,
    createRequestMutation,
    updatePermissionMutation,
    createPermissionMutation,
  };
};
