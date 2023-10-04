import type { ReactNode } from "react";

export const updateVersionOnRefresh = "updateVersionOnRefresh";

export enum VersionUpdatingWording {
  loading = "Update in progress",
  loadingMessage = "Fetching latest version...",
  successful = "You are now using the latest version of Q4\xa0Platform.",
}

export interface VersionGateProps {
  isVersionUpdating?: boolean;
  setIsVersionUpdating: (updating: boolean) => void;
  children: ReactNode;
}

export interface VersionContextValues {
  isVersionUpdating: boolean;
  setIsVersionUpdating: (value: boolean) => void;
}
