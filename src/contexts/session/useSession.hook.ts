import { useContext } from "react";
import { SessionContext } from "./session.context";
import type { SessionState } from "./session.definition";

export const useSession = (): SessionState => useContext(SessionContext);
