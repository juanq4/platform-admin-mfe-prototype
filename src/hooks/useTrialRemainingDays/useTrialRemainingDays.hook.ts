import type { TrialType } from "@q4/platform-sdk-definitions";
import { useMemo } from "react";
import { useApplication } from "../../contexts/application/application.hook";
import { useOrganizationTrialsQuery } from "../../schemas/generated/graphql";

export const useTrialRemainingDays = (): number => {
  const organizationTrials = useOrganizationTrialsQuery({ variables: { expired: false }, fetchPolicy: "no-cache" });
  const application = useApplication();

  const trial = useMemo(() => {
    return organizationTrials?.data?.organizationTrials.find(
      (trial) => application?.name === trial.product && application?.elegibleTrials.includes(trial.trialType as TrialType),
    );
  }, [organizationTrials, application]);

  return useMemo(() => {
    // trial.expiryDate is represented as Unix time (Epoch)
    const timeDifference = parseInt(trial?.expiryDate) - new Date().getTime();
    return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  }, [trial]);
};
