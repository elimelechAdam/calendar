import { useState, useEffect } from "react";

function useTabWithPagination(initialTab = "all") {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  return { activeTab, setActiveTab, page, setPage };
}

export default useTabWithPagination;
