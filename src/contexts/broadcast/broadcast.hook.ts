import { useContext } from "react";
import { BroadcastContext } from "./broadcast.context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBroadcast = () => useContext(BroadcastContext);
