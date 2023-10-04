import { useMutation, useQuery } from "@apollo/client";
import type { ButtonProps } from "@q4/nimbus-ui";
import { ButtonTheme, Text, TextPreset, isNullOrWhiteSpace, useVisibility } from "@q4/nimbus-ui";
import { OrganizationType } from "@q4/platform-definitions";
import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AdminDataContext } from "../../../../../../contexts";
import { Team } from "../../../../../../definitions";
import { useToastNotificationService } from "../../../../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { EditTeamNameModal } from "../../../../../../modules/Admin/Organizations/Details/Team/Edit/EditTeamNameModal/EditTeamNameModal.component";
import { EditTeamOrganizationsModal } from "../../../../../../modules/Admin/Organizations/Details/Team/Edit/EditTeamOrganizationsModal/EditTeamOrganizationsModal.component";
import {
  DELETE_TEAM,
  GET_ORGANIZATION,
  GET_ORGANIZATIONS,
  GET_TEAM,
  GET_TEAMS,
  GET_USERS_QUERY,
  UPDATE_TEAM,
} from "../../../../../../schemas";
import { getOrganizationViewRoute, orderUsersAlphabetically } from "../../../../../../utils";
import { fetchPolicy } from "../OrganizationsTeam.definition";
import type { EditTeamOrganizationsModalProps } from "./EditTeamOrganizationsModal/EditTeamOrganizationsModal.definition";
import { EditTeamUsersModal } from "./EditTeamUsersModal/EditTeamUsersModal.component";
import { RemoveTeamWarning, RemoveTeamWarningHeader, RemoveTeamWarningSubHeader } from "./OrganizationTeamEdit.style";
import type { OrganizationsTeamEditParam } from "./OrganizationsTeamEdit.definition";
import {
  TeamEditLanguage,
  TeamEditMessage,
  TeamEditResponseErrors,
  TeamEditState,
  TeamRemoveMessage,
  TeamEditViewIdModel as ViewIdModel,
} from "./OrganizationsTeamEdit.definition";

const OrganizationTeamEditBase = (): JSX.Element => {
  const params = useParams<OrganizationsTeamEditParam>();
  const { team, setTeam, setTeams, setUsers, setOrganizations } = useContext(AdminDataContext);
  const notifications = useToastNotificationService();
  const history = useHistory();
  const organizationId = useMemo(() => params.id, [params.id]);
  const teamId = useMemo(() => params.teamId, [params.teamId]);

  const [deleteTeamWarningVisible, showDeleteTeamWarning, hideDeleteTeamWarning] = useVisibility();
  const [editState, setEditState] = useState(TeamEditState.Name);

  const getTeamQuery = useQuery(GET_TEAM, {
    variables: { id: teamId, organizationId },
    skip: isNullOrWhiteSpace(teamId) || isNullOrWhiteSpace(organizationId),
    fetchPolicy,
  });

  const getOrganizationQuery = useQuery(GET_ORGANIZATION, {
    variables: { id: organizationId },
    skip: isNullOrWhiteSpace(organizationId),
  });

  const organization = useMemo(() => getOrganizationQuery.data?.organization, [getOrganizationQuery]);

  const getOrganizationsQuery = useQuery(GET_ORGANIZATIONS, {
    variables: {
      pageSize: 0,
      type: OrganizationType.CORP,
      managedBy: organizationId,
      delegateOrganizationId: organizationId,
    },
    skip: isNullOrWhiteSpace(organizationId),
    fetchPolicy,
  });

  const getUsersQuery = useQuery(GET_USERS_QUERY, {
    variables: { organizationId, pageSize: 0 },
    skip: isNullOrWhiteSpace(organizationId),
    fetchPolicy,
  });

  const getTeamsQuery = useQuery(GET_TEAMS, {
    variables: { organizationId, pageSize: 0 },
    skip: isNullOrWhiteSpace(organizationId),
    fetchPolicy,
  });

  const [deleteTeam, { loading: deletingTeam }] = useMutation(DELETE_TEAM, {
    variables: { id: teamId, organizationId },
  });

  const handleGetOrganizationsList = useCallback(() => {
    getOrganizationsQuery.refetch({
      pageSize: 0,
      type: OrganizationType.CORP,
      delegateOrganizationId: organizationId,
    });
  }, [getOrganizationsQuery, organizationId]);

  const handleGetUsersList = useCallback(() => {
    if (getUsersQuery.error) {
      getUsersQuery.refetch({
        organizationId,
        pageSize: 0,
      });
    }
    if (getTeamsQuery.error) {
      getTeamsQuery.refetch({
        organizationId,
        pageSize: 0,
      });
    }
  }, [organizationId, getTeamsQuery, getUsersQuery]);

  const [updateTeam, { loading: isUpdatingTeam, reset: resetUpdateTeam }] = useMutation(UPDATE_TEAM, {
    onCompleted: (data: { updateAccessGroup: Team }) => {
      const updatedTeam = new Team(data.updateAccessGroup);
      setTeam(updatedTeam);
      setTeams((teams) => teams.map((team) => (team?.id === updatedTeam?.id ? updatedTeam : team)));
      setEditState(TeamEditState.Name);
      notifications.current.success(TeamEditMessage.Success);
    },
    onError: (error) => {
      if (
        [TeamEditResponseErrors.OrganizationUnlinked, TeamEditResponseErrors.OrganizationHasTeam].includes(
          error.message as TeamEditResponseErrors,
        )
      ) {
        if (TeamEditResponseErrors.OrganizationUnlinked === error.message) {
          notifications.current.error(TeamEditMessage.FailedUnlinked);
        } else {
          notifications.current.error(TeamEditMessage.FailedBelongsTeam);
        }

        handleGetOrganizationsList();
        getTeamQuery.refetch({ id: teamId, organizationId });
        return;
      }

      notifications.current.error(TeamEditMessage.Failed);
    },
  });

  useEffect(() => {
    setTeam(new Team(getTeamQuery.data?.accessGroup || {}));
  }, [getTeamQuery, setTeam]);

  useEffect(() => {
    setTeams(getTeamsQuery.data?.accessGroups?.items || []);
  }, [getTeamsQuery.data?.accessGroups?.items, setTeams]);

  useEffect(() => {
    setUsers(orderUsersAlphabetically(getUsersQuery.data?.users?.items));
  }, [getUsersQuery.data?.users?.items, setUsers]);

  useEffect(() => {
    setOrganizations(getOrganizationsQuery.data?.organizations?.items || []);
  }, [getOrganizationsQuery.data?.organizations?.items, setOrganizations]);

  const isLoading = useMemo(
    () =>
      getOrganizationsQuery.loading ||
      getOrganizationQuery.loading ||
      getUsersQuery.loading ||
      getTeamQuery.loading ||
      getTeamsQuery.loading,
    [getOrganizationsQuery, getOrganizationQuery.loading, getUsersQuery, getTeamQuery, getTeamsQuery],
  );

  const handleCloseModal = useCallback(() => {
    if (isUpdatingTeam) return;

    if (editState !== TeamEditState.Name) {
      setEditState(TeamEditState.Name);
      setTeam(new Team(getTeamQuery.data?.accessGroup || {}));
      return;
    }

    history.push(getOrganizationViewRoute(organizationId));
  }, [isUpdatingTeam, editState, history, organizationId, setTeam, getTeamQuery.data?.accessGroup]);

  const handleUpdateTeam: EditTeamOrganizationsModalProps["onUpdate"] = useCallback(
    async (payload, updateTeamDelta) => {
      try {
        // unset unrequired payload, using update deltas instead
        delete payload?.managedOrganizationIds;
        delete payload?.userIds;

        await updateTeam({ variables: { ...payload, ...updateTeamDelta } });
      } catch (error) {
        console.error(error);
      } finally {
        resetUpdateTeam();
      }
    },
    [updateTeam, resetUpdateTeam],
  );

  const handleDeleteTeam = useCallback(() => {
    deleteTeam()
      .then(() => {
        notifications.current.success(TeamRemoveMessage.Success);
        handleCloseModal();
      })
      .catch(() => {
        hideDeleteTeamWarning();
        notifications.current.error(TeamRemoveMessage.Failed);
      });
  }, [deleteTeam, notifications, handleCloseModal, hideDeleteTeamWarning]);

  const removeTeamWarningFooterActions: ButtonProps[] = [
    {
      id: ViewIdModel.cancelRemove.id,
      label: TeamEditLanguage.CancelRemoveTeamButton,
      theme: ButtonTheme.DarkSlate,
      disabled: deletingTeam,
      onClick: hideDeleteTeamWarning,
    },
    {
      id: ViewIdModel.confirmRemove.id,
      label: TeamEditLanguage.RemoveTeamButton,
      theme: ButtonTheme.Cherry,
      loading: deletingTeam,
      onClick: handleDeleteTeam,
    },
  ];

  const modalTitle = `${TeamEditLanguage.Title} • ${organization?.name} • ${team?.name}`;

  function handleEditOrganizations(): void {
    setEditState(TeamEditState.Organizations);
  }

  function handleEditUsers(): void {
    setEditState(TeamEditState.Users);
  }

  return (
    <div id={ViewIdModel.id}>
      <EditTeamNameModal
        id={ViewIdModel.teamNameEditModal.id}
        title={modalTitle}
        organizationsError={getOrganizationsQuery.error}
        usersError={getUsersQuery.error || getTeamsQuery.error}
        isLoading={isLoading}
        isUpdating={isUpdatingTeam}
        onEditOrganizations={handleEditOrganizations}
        onEditUsers={handleEditUsers}
        onUpdate={handleUpdateTeam}
        onRemove={showDeleteTeamWarning}
        onClose={handleCloseModal}
        onRefetchOrganizations={handleGetOrganizationsList}
        onRefetchUsers={handleGetUsersList}
      />
      <EditTeamOrganizationsModal
        id={ViewIdModel.organizationsEditModal.id}
        title={modalTitle}
        isVisible={editState === TeamEditState.Organizations}
        isLoading={isLoading}
        isUpdating={isUpdatingTeam}
        onUpdate={handleUpdateTeam}
        onClose={handleCloseModal}
      />
      <EditTeamUsersModal
        id={ViewIdModel.usersEditModal.id}
        title={modalTitle}
        isVisible={editState === TeamEditState.Users}
        isLoading={isLoading}
        isUpdating={isUpdatingTeam}
        error={getUsersQuery.error}
        onRefetchUsers={handleGetUsersList}
        onUpdate={handleUpdateTeam}
        onClose={handleCloseModal}
      />
      <RemoveTeamWarning
        id={ViewIdModel.confirmationModal.id}
        title=""
        visible={deleteTeamWarningVisible}
        includeCancel={false}
        footerActions={removeTeamWarningFooterActions}
        onCloseRequest={hideDeleteTeamWarning}
      >
        <RemoveTeamWarningHeader preset={TextPreset.H1}>{TeamEditLanguage.RemoveTeamWarningHeader}</RemoveTeamWarningHeader>
        <RemoveTeamWarningSubHeader preset={TextPreset.H3}>
          Are you sure you want to remove the <strong>{team?.name}</strong> team?
        </RemoveTeamWarningSubHeader>
        <Text preset={TextPreset.H3}>{TeamEditLanguage.RemoveTeamWarningMessage}</Text>
      </RemoveTeamWarning>
    </div>
  );
};

export const OrganizationTeamEdit = memo(OrganizationTeamEditBase);
