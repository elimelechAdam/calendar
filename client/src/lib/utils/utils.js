export const changeRequestsTypeToHeb = (type) => {
  if (type === "read") return "קריאה בלבד";
  else return "קריאה ועריכה";
};

export const changeRequestsStatusToHeb = (status) => {
  if (status === "pending") return "ממתין";
  else if (status === "approved") return "אושר";
  else return "לא אושר";
};

export const changeNotificationTypeToHeb = (type) => {
  if (type === "You have a new request") return "יש לך בקשה חדשה";
  else if (type === "Permission denied") return "בקשה נדחתה";
  else return "הבקשה אושרה";
};

export const dateFormat = (date) => {
  return new Date(date).toLocaleDateString("he-IL");
};
