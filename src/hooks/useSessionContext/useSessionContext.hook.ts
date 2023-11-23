import { useContext } from "react";
import { SessionContext } from "../../contexts/session/session.context";
import type { SessionState } from "../../contexts/session/session.definition";

export const useSessionContext = (): SessionState => useContext(SessionContext);
