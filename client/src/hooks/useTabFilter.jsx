import { useState } from "react";

export const useTabFilter = () => {
  const [tab, setTab] = useState(null);

  const handleTabChange = (tab) => setTab(tab);

  const filterByTab = (data) => {
    if (tab === "granted")
      return data.filter((item) => item.requestStatus === "אושר");

    if (tab === "unGranted")
      return data.filter((item) => item.requestStatus === "לא אושר");

    if (tab === "awaiting")
      return data.filter((item) => item.requestStatus === "ממתין");

    return data;
  };

  return { handleTabChange, filterByTab };
};
