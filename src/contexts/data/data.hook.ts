import { useContext } from "react";
import { AdminDataContext } from "./data.context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAdminData = () => useContext(AdminDataContext);
