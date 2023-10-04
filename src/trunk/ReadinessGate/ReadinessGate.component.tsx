import { LoadingScreen } from "@q4/nimbus-ui";
import { Permission } from "@q4/platform-definitions";
import { useLDClient } from "launchdarkly-react-client-sdk";
import type { PropsWithChildren } from "react";
import { useMemo, useEffect, useState, Fragment } from "react";
import { useUser } from "../../contexts";
import { TokenClaim } from "../../definitions";
import { useOrganizationQuery, useOrganizationsManagedByUserQuery, useUserQuery } from "../../schemas/generated/graphql";
import { useVersion } from "../VersionProvider";
import { VersionUpdatingWording } from "../VersionProvider/VersionProvider.definition";

export const ReadinessGate = (props: PropsWithChildren): JSX.Element => {
  const { isVersionUpdating } = useVersion();
  const { userId, organizationId, isManagedOrganizationLoading, claims, currentOrganizationId, isImpersonatingClient } =
    useUser();
  const ldClient = useLDClient();
  const [isDoneInitializing, setIsDoneInitializing] = useState(false);

  // TODO: Fetch myUser instead, which does not require variables
  const user = useUserQuery({
    variables: {
      id: organizationId,
      userId,
    },
    // TODO: Remove skip condition once organizationId is guaranteed
    skip: !organizationId,
  });

  // TODO: fetch myOrganization instead, which does not require variables
  const organization = useOrganizationQuery({
    variables: {
      id: currentOrganizationId,
    },
    notifyOnNetworkStatusChange: true,
    // TODO: Remove skip condition once organizationId is guaranteed
    skip: !currentOrganizationId,
  });

  const permissions = useMemo(() => claims?.[TokenClaim.Permissions], [claims]);

  const clientOrganizations = useOrganizationsManagedByUserQuery({
    skip: !permissions?.includes(Permission.ImpersonateClient),
    fetchPolicy: "no-cache", // Not caching this query because the results must be updated when the user switches organizations.
  });

  useEffect(() => {
    if (!ldClient || isDoneInitializing) return;

    ldClient.waitForInitialization().finally(() => setIsDoneInitializing(true));
  }, [isDoneInitializing, ldClient, setIsDoneInitializing]);

  if (
    user.loading ||
    organization.loading ||
    clientOrganizations.loading ||
    !isDoneInitializing ||
    isVersionUpdating ||
    isManagedOrganizationLoading ||
    isImpersonatingClient === undefined
  ) {
    return (
      <LoadingScreen
        label={isVersionUpdating ? VersionUpdatingWording.loading : undefined}
        subLabel={isVersionUpdating ? VersionUpdatingWording.loadingMessage : undefined}
      />
    );
  }

  return <Fragment {...props} />;
};
