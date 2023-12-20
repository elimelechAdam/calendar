import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginationStore, useUserStore } from "../stores/user-store";
import {
  createRequest,
  getPermissions,
  getRequests,
  updateRequest,
} from "../utils/db-api";

export const useDbQuerys = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const currentPage = usePaginationStore((state) => state.currentPage);
  console.log(currentPage, user);
  const limit = 1; // Or your desired page size

  const getPermissionsQuery = () => {
    return useQuery({
      queryKey: ["permissions", currentPage],
      queryFn: () => getPermissions(user.email, currentPage, limit),
      keepPreviousData: true,
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
