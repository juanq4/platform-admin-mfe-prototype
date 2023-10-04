import { useContext } from "react";
import { AnalyticsContext } from "./analytics.context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAnalytics = () => useContext(AnalyticsContext);
