import { TrialType } from "@q4/platform-sdk-definitions";
import { EngagementAnalyticsLink } from "../../configurations";

export interface TrialContextValues {
  isTrialInitializing: boolean;
}

export interface TrialMessageProps {
  title: string;
  message: string;
}

export interface InitiateTrialProps {
  trialType: TrialType;
  path: string;
  trialMessage: string;
}

export interface ErrorStateProps {
  title: string;
  description: string;
  type: string;
}

export const eaTrialButtonConfig = {
  trialType: TrialType.EA_BASE_TRIAL,
  path: EngagementAnalyticsLink.path,
  trialMessage: "You are now on a free trial for Engagement Analytics Base.",
};

export const trialButtonConfigs = [eaTrialButtonConfig];

// TODO: update to pull from @platform-sdk/definitions - https://q4websystems.atlassian.net/browse/PLATFORM-3863
export const trialErrorCode = {
  activeExists: "ERR_ACTIVE_EXISTS",
  inCooldownPeriod: "ERR_IN_COOLDOWN_PERIOD",
};

export const trialErrorWording = {
  activeExists: {
    title: "Trial is already active",
    description: "Your organization is already trialling Engagement Analytics Base.",
    type: "warn",
  },

  inCooldownPeriod: {
    title: "Your organization is not yet eligible to repeat this trial",
    description: "Get in touch with a Q4 representative to request a new trial.",
    type: "error",
  },

  genericError: {
    title: "We weren't able to start your trial",
    description: "Please try again.",
    type: "error",
  },
};
