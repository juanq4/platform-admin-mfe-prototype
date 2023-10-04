import { AnchorTarget, Button, ButtonSize, ButtonTheme } from "@q4/nimbus-ui";
import { memo, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useClaims, useOrganizationQuery } from "../../../../hooks";
import { getOrganizationRouteBasedOnPermission } from "../../../../utils";
import type { ManagedLinkProps } from "./ManagedLink.definition";

const Link = (props: ManagedLinkProps): JSX.Element => {
  const { id, managedByOrganizationId } = props;

  const history = useHistory();
  const claims = useClaims();
  const [{ data, fetching: isLoading }] = useOrganizationQuery({
    variables: { id: managedByOrganizationId },
  });

  const label = useMemo(() => `Agency Managed • ${data?.organization ? data?.organization.name : ""}`, [data?.organization]);

  const handleClick = useCallback(() => {
    const organizationRoute = getOrganizationRouteBasedOnPermission(claims.permissions, managedByOrganizationId);
    history.push(organizationRoute);
  }, [history, managedByOrganizationId, claims.permissions]);

  return (
    <Button
      id={id}
      theme={ButtonTheme.DarkSlate}
      label={label}
      linkTarget={AnchorTarget.Blank}
      size={ButtonSize.Small}
      loading={isLoading}
      onClick={handleClick}
      icon="q4i-q4-team-4pt"
      style={{ textTransform: "none" }}
    />
  );
};

export const ManagedLink = memo(Link);
