import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useTabState = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || "emprunt");

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  return { activeTab, setActiveTab };
};
