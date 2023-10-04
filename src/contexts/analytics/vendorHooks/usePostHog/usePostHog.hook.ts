import { posthog } from "posthog-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { env } from "../../../../../config";
import { useUser } from "../../../user";
import type { TrackEvents } from "../../analytics.definition";
import type { PostHogHook } from "./usePostHog.definition";

export const usePostHog = (): PostHogHook => {
  const { user, organizationId, organization } = useUser();

  const [initialized, setInitiatlized] = useState(false);

  const userIdentification = useMemo(
    () => ({
      // user fields
      email: user?.email,
      userFirstName: user?.firstName,
      userId: user?.id,
      userLastName: user?.lastName,
      userRoles: user?.roles,
      // organization fields
      orgActive: organization?.active,
      orgEntitlements: organization?.entitlements,
      orgId: organization?.id,
      orgName: organization?.name,
      orgType: organization?.type,
    }),
    [user, organization],
  );

  useEffect(
    function init() {
      const isInternalUser = (userIdentification?.email || "")?.endsWith("q4inc.com");
      if (!userIdentification?.email || isInternalUser || initialized) return;

      posthog?.init?.(env.analytics.postHog.key, {
        api_host: env.analytics.postHog.apiHost,
        loaded: () => {
          setInitiatlized(true);
        },
      });
    },
    [userIdentification, initialized],
  );

  useEffect(
    function identifyUser() {
      if (!initialized || !user?.email) return;

      posthog?.identify?.(user?.email, {
        env: env.appEnv,
        ...userIdentification,
      });
    },
    [user, userIdentification, initialized],
  );

  const handleTrack = useCallback(
    (event: TrackEvents, properties = {}) => {
      if (!user?.email || !organizationId) {
        console.warn("Not captured. Missing valid user information");
        return;
      }

      posthog?.capture?.(event, { identity: userIdentification, ...properties });
      console.log("Event logged", event);
    },
    [user, organizationId, userIdentification],
  );

  return { onTrack: handleTrack };
};
