import { isEmpty, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { useCallback, useEffect, useMemo } from "react";
import { useUser } from "../../../user";
import type { TrackEvents } from "../../analytics.definition";
import type { PendoHookType } from "./usePendo.definition";

export const usePendo = (): PendoHookType => {
  const { user, organization } = useUser();

  const userIdentification = useMemo(
    () => ({
      email: user?.email,
      userFirstName: user?.firstName,
      userId: user?.id,
      userLastName: user?.lastName,
      userRoles: user?.roles,
    }),
    [user],
  );

  const orgIdentification = useMemo(
    () => ({
      orgName: organization?.name,
      orgId: organization?.id,
      orgEntitlements: organization?.entitlements,
      orgType: organization?.type,
      orgActive: organization?.active,
    }),
    [organization],
  );

  useEffect(() => {
    if (!user || !pendo) return;

    pendo?.initialize?.({
      visitor: { ...userIdentification, id: user?.email, userName: `${user?.firstName} ${user?.lastName}` },
      account: { ...orgIdentification, id: organization?.id },
    });
  }, [user, userIdentification, organization, orgIdentification]);

  const handleTrack = useCallback(
    (event: TrackEvents, properties = {}) => {
      if (!pendo) {
        console.warn("Pendo is not initialized");
        return;
      }

      if (isNullOrWhiteSpace(event)) {
        console.warn("Tracking event not supplied");
        return;
      }

      if (isEmpty(user) || isNullOrWhiteSpace(user?.email) || isNullOrWhiteSpace(organization?.id)) {
        console.warn("Missing valid user information");
        return;
      }

      pendo?.track?.(event, {
        ...userIdentification,
        ...orgIdentification,
        organization: organization?.id,
        ...properties,
      });
      console.log(`Event logged: ${event}`);
    },
    [user, organization, userIdentification, orgIdentification],
  );

  return { onTrack: handleTrack };
};
