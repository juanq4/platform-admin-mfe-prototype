import { arrayIndexFound, isEmpty } from "@q4/nimbus-ui";
import React, { createContext, useCallback, useState } from "react";
import type { AdminLoadingContextProps, AdminLoadingContextState, AdminLoadingState } from "./loading.definition";

export const AdminLoadingContext = createContext<Partial<AdminLoadingContextState>>([false]);

export const AdminLoadingProvider = (props: AdminLoadingContextProps): JSX.Element => {
  const [loadingQueue, setLoadingQueue] = useState<AdminLoadingState[]>([]);

  const handleLoadingChange = useCallback((state: AdminLoadingState) => {
    if (isEmpty(state)) return;

    setLoadingQueue((queue) => {
      const updated = [...queue];
      const { loading, key } = state;

      const index = updated.findIndex((x) => x.key === key);
      const exists = arrayIndexFound(index);
      if (exists) {
        const loadingState = updated[index];
        if (loadingState.loading !== loading) {
          updated.splice(index, 1);
        }
      } else if (loading) {
        updated.push(state);
      }

      return updated;
    });
  }, []);

  return (
    <AdminLoadingContext.Provider value={[!!loadingQueue?.length, handleLoadingChange]}>
      {props.children}
    </AdminLoadingContext.Provider>
  );
};
