import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import {
  createPermission,
  createRequest,
  getPermissions,
  getRequests,
  updateRequest,
} from "../utils/db-api";
import { useMsgQuerys } from "./msg-querys";
import { sendMail } from "../utils/msg-api";
import getEmailContent from "../../components/email-template/askForPermissionEmail";
import { changeRequestsTypeToHeb } from "../utils/utils";
export const useDbQuerys = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const { grantCalendarPermissionsMutation } = useMsgQuerys();
  const { mutate } = grantCalendarPermissionsMutation();

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
        try {
          await createRequest(user.email, params);

          await sendMail({
            subject: "בקשת הרשאה ליומנך",
            body: getEmailContent(
              user.email,
              user.name,
              changeRequestsTypeToHeb(params.requestType)
            ),
            to: params.recipientEmail,
          });
        } catch (error) {
          // Handle or log the error
          console.error(error);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries("requests");
      },
      // Optionally, handle errors for the mutation itself
      onError: (error) => {
        // Error handling logic
        console.error(error);
      },
    });
  };

  const updatePermissionMutation = () => {
    return useMutation({
      mutationKey: ["updateRequest"],
      mutationFn: (params) => updateRequest(params.id, params.requestStatus),
      onSuccess: (data) => {
        mutate({ email: data.requesterEmail, role: data.requestType });
        console.log("just updated a request");
        console.log("updatePermissionMutation data: ", data);
        queryClient.invalidateQueries("permissions");
      },
    });
  };

  const createPermissionMutation = () => {
    return useMutation({
      mutationKey: ["createPermission"],
      mutationFn: (params) => createPermission(user.email, params),
      onSuccess: (data) => {
        mutate({ email: data.requesterEmail, role: data.requestType });
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
