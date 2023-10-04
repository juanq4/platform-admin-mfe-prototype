import type { ErrorStateProps } from "./useCreateTrial.definition";
import { trialErrorCode, trialErrorWording } from "./useCreateTrial.definition";

export const generateErrorState = (errorMsg?: string): ErrorStateProps => {
  switch (errorMsg) {
    case trialErrorCode.activeExists:
      return trialErrorWording.activeExists;

    case trialErrorCode.inCooldownPeriod:
      return trialErrorWording.inCooldownPeriod;

    default:
      return trialErrorWording.genericError;
  }
};
