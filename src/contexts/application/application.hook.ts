import { useContext } from "react";
import { ApplicationContext } from "./application.context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useApplication = () => useContext(ApplicationContext);
