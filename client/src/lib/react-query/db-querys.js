import { useQuery, useMutation } from "react-query";
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

  const createRequestMutation = (request) => {
    return useMutation({
      mutationKey: ["createRequest", user.email, request],
      mutationFn: () => createRequest(user.email, request),
    });
  };

  const updateRequestMutation = (id, requestStatus) => {
    return useMutation({
      mutationKey: ["updateRequest", id, requestStatus],
      mutationFn: () => updateRequest(id, requestStatus),
    });
  };

  return {
    getPermissionsQuery,
    getRequestsQuery,
    createRequestMutation,
    updateRequestMutation,
  };
};
