import { isEmpty, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { RowClickedEvent } from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useAdminUserTable, useToastNotificationService } from "../../../hooks";
import { useOrganizationsQuery, useTeamsQuery } from "../../../schemas/generated/graphql";
import { getOrganizationEditTeamRoute } from "../../../utils";
import { AdminTeamTable } from "../Tables/team/";
import type { OrganizationTeamsProps } from "./Teams.definition";
import { OrganizationTeamsIdModel, OrganizationTeamsLanguage } from "./Teams.definition";

const Teams = (props: OrganizationTeamsProps): JSX.Element => {
  const history = useHistory();

  const { id, organizationId, onCreateTeam } = props;

  const adminUserTableHook = useAdminUserTable({
    organizationId,
    pause: isNullOrWhiteSpace(organizationId),
  });
  const organizationsResponse = useOrganizationsQuery({
    variables: { managedBy: organizationId, delegateOrganizationId: organizationId },
  });

  const {
    data: teamsData,
    loading,
    error,
    refetch,
  } = useTeamsQuery({
    variables: { organizationId, pageSize: 0 },
    fetchPolicy: "no-cache",
  });

  const { users } = adminUserTableHook;
  const notifications = useToastNotificationService();

  const idModel = useMemo(() => new OrganizationTeamsIdModel(id), [id]);
  const teams = useMemo(() => teamsData?.accessGroups?.items ?? [], [teamsData?.accessGroups?.items]);

  const enableCreateTeam = useMemo(() => {
    if (isEmpty(organizationsResponse?.data?.organizations?.items)) return false;
    return (users || []).some((user) => !!user?.active);
  }, [organizationsResponse, users]);

  useEffect(() => {
    if (error) notifications.current.error(OrganizationTeamsLanguage.ERROR);
  }, [error, notifications]);

  const handleRowClick = useCallback(
    (event: RowClickedEvent) => {
      if (isNullOrWhiteSpace(event?.data?.id) || isNullOrWhiteSpace(organizationId)) return;

      history.push(getOrganizationEditTeamRoute(organizationId, event.data.id));
    },
    [history, organizationId],
  );

  function handleError(): void {
    refetch();
  }

  return (
    <AdminTeamTable
      id={idModel.id}
      items={teams}
      error={error}
      loading={loading}
      placeholderProps={{ title: OrganizationTeamsLanguage.NO_TEAMS }}
      toolbarActions={[
        {
          id: idModel.addTeam.id,
          icon: "q4i-add-4pt",
          label: OrganizationTeamsLanguage.ADD,
          onClick: onCreateTeam,
          disabled: !enableCreateTeam,
          tooltip: {
            label: OrganizationTeamsLanguage.ADD_TOOLTIP,
          },
        },
      ]}
      tableProps={{ onRowClicked: handleRowClick }}
      onError={handleError}
    />
  );
};

export const OrganizationTeams = memo(Teams);
