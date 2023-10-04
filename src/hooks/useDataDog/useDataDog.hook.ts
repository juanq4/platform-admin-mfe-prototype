import { datadogRum } from "@datadog/browser-rum";
import { useCallback, useRef } from "react";
import { env } from "../../../config";
import type { useDataDogHook } from "./useDataDog.definition";

export const useDataDog = (): useDataDogHook => {
  const recordingInProgress = useRef(false);

  const initializeRUM = useCallback(() => {
    datadogRum.init({
      applicationId: env.dataDog.applicationId,
      clientToken: env.dataDog.clientToken,
      defaultPrivacyLevel: env.dataDog.defaultPrivacyLevel,
      env: env.appEnv,
      service: env.appName,
      sessionReplaySampleRate: env.dataDog.sessionReplaySampleRate,
      sessionSampleRate: env.dataDog.sessionSampleRate,
      site: env.dataDog.site,
      trackInteractions: env.dataDog.trackInteractions,
      version: env.appVersion,
    });

    if (recordingInProgress.current) return;

    datadogRum.startSessionReplayRecording();
    recordingInProgress.current = true;
  }, []);

  return {
    initializeRUM,
  };
};
