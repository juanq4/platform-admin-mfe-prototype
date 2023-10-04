export interface ApplicationSummaryProps {
  name?: string;
  tier?: string;
}

export const TrialExpirationBreakpoint = 3;

export enum RemainingDaysMessageClass {
  Clock = "clock",
  Warning = "warning",
}
