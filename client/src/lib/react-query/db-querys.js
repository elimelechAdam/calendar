import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../stores/user-store";
import {
  createPermission,
  createRequest,
  getPermissions,
  getRequests,
  updateRequest,
  updatePermission,
  removePermission,
  getNotifications,
  deleteAllNotifications,
  acceptRequestEmail,
  denyRequestEmail,
} from "../utils/db-api";
import { useMsgQuerys } from "./msg-querys";
import { sendMail } from "../utils/msg-api";
import getEmailContent from "../../components/email-template/askForPermissionEmail";
import { changeRequestsTypeToHeb, dateFormat } from "../utils/utils";
import { useDebounce } from "../../hooks/useDebounce";
import declinePermissionEmail from "../../components/email-template/declinePermissionEmail";
import { useAlertStore } from "../stores/alert-store";
import { useNavigate } from "react-router-dom";

export const useDbQuerys = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const { grantCalendarPermissionsMutation } = useMsgQuerys();
  const { mutate } = grantCalendarPermissionsMutation();
  const alert = useAlertStore((state) => state.setAlert);
  const navigate = useNavigate();

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
        const response = await createRequest(user.email, params);

        console.log("createaRequestMutation: ", response);
        await sendMail({
          subject: "בקשת הרשאה ליומנך",
          body: getEmailContent(
            user.email,
            user.name,
            changeRequestsTypeToHeb(params.requestType),
            response._id
          ),
          to: params.recipientEmail,
        });

        return response;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("requests");
        alert({
          content: "בקשת הרשאה נשלחה בהצלחה",
          color: "green",
        });
      },
      onError: (error) => {
        if (error.response.data.message === "cannot send request to yourself") {
          return alert({
            content: "לא ניתן לשלוח בקשה לעצמך",
            color: "red",
          });
        }
        if (error.response.data.message === "request already exist") {
          return alert({
            content: `בקשה כבר קיימת מ ${dateFormat(error.response.data.date)}`,
            color: "blue",
          });
        }
        alert({
          content: "שגיאה בשליחת בקשת הרשאה",
          color: "red",
        });
      },
    });
  };

  const updatePermissionMutation = () => {
    return useMutation({
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
        alert({
          content: "בקשת הרשאה עודכנה בהצלחה",
          color: "green",
        });
        queryClient.invalidateQueries("permissions");
      },
      onError: () => {
        alert({
          content: "שגיאה בעדכון הרשאה",
          color: "red",
        });
      },
    });
  };

  const ownerUpdatePermissionMutation = () => {
    return useMutation({
      mutationFn: (params) => updatePermission(params.id, params.requestType),
      onSuccess: (data) => {
        if (data.requestStatus === "approved") {
          mutate({ email: data.requesterEmail, role: data.requestType });
          alert({
            content: "הרשאה שונתה בהצלחה",
            color: "green",
          });
        }

        queryClient.invalidateQueries("permissions");
      },
      onError: () => {
        alert({
          content: "שגיאה בעדכון הרשאה",
          color: "red",
        });
      },
    });
  };

  const removePermissionMutation = () => {
    return useMutation({
      mutationFn: (data) => removePermission(data),
      onSuccess: async (data) => {
        console.log(data);

        mutate({ email: data, role: "freeBusyRead" });
        queryClient.invalidateQueries({
          queryKey: ["permissions"],
        });
        alert({
          content: "הרשאה הוסרה בהצלחה",
          color: "green",
        });
      },
      onError: () => {
        alert({
          content: "שגיאה בהסרת הרשאה",
          color: "red",
        });
      },
    });
  };

  const createPermissionMutation = () => {
    return useMutation({
      mutationFn: (params) => createPermission(user.email, params),
      onSuccess: (data) => {
        mutate({ email: data.requesterEmail, role: data.requestType });
        queryClient.invalidateQueries({
          queryKey: ["permissions"],
        });
        alert({
          content: "הרשאה נוצרה בהצלחה",
          color: "green",
        });
      },
      onError: () => {
        alert({
          content: "שגיאה ביצירת הרשאה",
          color: "red",
        });
      },
    });
  };

  const getNotificationsQuery = () => {
    return useQuery({
      queryKey: ["notifications", user],
      queryFn: () => getNotifications(user.email),
    });
  };

  const deleteNotificationsMutation = () => {
    return useMutation({
      mutationFn: () => deleteAllNotifications(user.email),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        });
      },
      onError: () => {
        alert({
          content: "הודעות לא נמחקו",
          color: "red",
        });
      },
    });
  };

  // Mutation to accept request
  const useAcceptRequestMutation = () => {
    return useMutation({
      mutationFn: (requestId) => acceptRequestEmail(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
        navigate("/requests");
        alert({
          content: "בקשה אושרה",
          color: "green",
        });
      },
      onError: (error) => {
        console.log(error.response.data.message);
        alert({
          content: error.response.data.message,
          color: "red",
        });
        navigate("/requests");
      },
    });
  };

  // Mutation to deny request
  const useDenyRequestMutation = () => {
    return useMutation({
      mutationFn: (requestId) => denyRequestEmail(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
        navigate("/requests");
        alert({
          content: "בקשה נדחתה",
          color: "green",
        });
      },
      onError: (error) => {
        alert({
          content: error.response.data.message,
          color: "red",
        });
        navigate("/requests");
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
    removePermissionMutation,
    getNotificationsQuery,
    deleteNotificationsMutation,
    useAcceptRequestMutation,
    useDenyRequestMutation,
  };
};
