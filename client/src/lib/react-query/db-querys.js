import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import {
  createPermission,
  createRequest,
  getPermissions,
  getRequests,
  updateRequest,
  updatePermission,
} from "../utils/db-api";
import { useMsgQuerys } from "./msg-querys";
import { sendMail } from "../utils/msg-api";
import getEmailContent from "../../components/email-template/askForPermissionEmail";
import { changeRequestsTypeToHeb } from "../utils/utils";
import { useDebounce } from "../../hooks/useDebounce";
import declinePermissionEmail from "../../components/email-template/declinePermissionEmail";

export const useDbQuerys = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const { grantCalendarPermissionsMutation } = useMsgQuerys();
  const { mutate } = grantCalendarPermissionsMutation();

  const getPermissionsQuery = (activeTab, page, searchTerm) => {
    const debouncedSearch = useDebounce(searchTerm, 200);
    return useQuery({
      queryKey: ["permissions", user, activeTab, page, debouncedSearch],
      queryFn: () =>
        getPermissions(user.email, activeTab, page, debouncedSearch),
    });
  };

  const getRequestsQuery = (activeTab, page, searchTerm) => {
    const debouncedSearch = useDebounce(searchTerm, 200);
    return useQuery({
      queryKey: ["requests", user, activeTab, page, debouncedSearch],
      queryFn: () => getRequests(user.email, activeTab, page, debouncedSearch),
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
        if (data.requestStatus === "approved") {
          mutate({ email: data.requesterEmail, role: data.requestType });
        }
        if (data.requestStatus === "denied") {
          sendMail({
            subject: "הרשאה ליומנך נדחתה",
            body: declinePermissionEmail(user.email, user.name),
            to: data.requesterEmail,
          });
        }
        queryClient.invalidateQueries("permissions");
      },
    });
  };
  const ownerUpdatePermissionMutation = () => {
    return useMutation({
      mutationKey: ["updatePermission"],
      mutationFn: (params) => updatePermission(params),
      onSuccess: (data) => {
        if (data.requestStatus === "approved") {
          // mutate({ email: data.requesterEmail, role: data.requestType });
          console.log("ownerUpdatePermissionMutation", data);
        } else {
          console.log("Error occured...");
        }

        // if (data.requestStatus === "denied") {
        //   sendMail({
        //     subject: "הרשאה ליומנך נדחתה",
        //     body: declinePermissionEmail(user.email, user.name),
        //     to: data.requesterEmail,
        //   });
        // }
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
    ownerUpdatePermissionMutation,
  };
};
