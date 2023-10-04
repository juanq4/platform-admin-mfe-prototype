import type { BaseComponentWithChildrenProps } from "@q4/nimbus-ui";
import type { Key } from "react";

export type AdminLoadingContextProps = Pick<BaseComponentWithChildrenProps, "children" | "key">;

export interface AdminLoadingState {
  key: Key;
  loading: boolean;
}

export type AdminLoadingContextState = [loading: boolean, setLoading: (props: AdminLoadingState) => void];
