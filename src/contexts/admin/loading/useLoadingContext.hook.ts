import type { Key } from "react";
import { useContext, useEffect } from "react";
import { AdminLoadingContext } from "./loading.context";
import type { AdminLoadingContextState } from "./loading.definition";

export const useAdminLoadingContext = (key: Key, loading: boolean): AdminLoadingContextState => {
  const [globalLoading, setGlobalLoading] = useContext(AdminLoadingContext);

  useEffect(() => {
    if (!loading) return;

    setGlobalLoading({ key, loading });
    return () => {
      setGlobalLoading({ key, loading: false });
    };
  }, [key, loading, setGlobalLoading]);

  return [globalLoading, setGlobalLoading];
};
