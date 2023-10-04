import { useContext } from "react";
import { VersionContext } from "./VersionProvider.component";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useVersion = () => useContext(VersionContext);
