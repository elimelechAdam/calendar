export const changeRequestsTypeToHeb = (type) => {
  if (type === "read") return "קריאה בלבד";
  else return "קריאה ועריכה";
};

export const changeRequestsStatusToHeb = (status) => {
  if (status === "pending") return "ממתין";
  else if (status === "approved") return "אושר";
  else return "לא אושר";
};
