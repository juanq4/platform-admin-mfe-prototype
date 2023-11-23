import { useContext } from "react";
import { AdminDataContext } from "../../contexts/data/data.context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAdminDataContext = () => useContext(AdminDataContext);
