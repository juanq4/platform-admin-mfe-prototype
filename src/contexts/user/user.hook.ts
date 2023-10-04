import { useContext } from "react";
import { UserContext } from "./user.context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUser = () => useContext(UserContext);
