import { createContext } from "react";
import type { SessionProviderProps, SessionState } from "./session.definition";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SessionContext = createContext<SessionState>(undefined!);

export const SessionProvider = (props: SessionProviderProps): JSX.Element => {
  return <SessionContext.Provider value={props}>{props.children}</SessionContext.Provider>;
};
