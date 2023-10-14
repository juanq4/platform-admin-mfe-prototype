import {
  ButtonTheme,
  ErrorHandlerField,
  ErrorHandlerService,
  ErrorModel,
  isEmpty,
  isNullOrWhiteSpace,
  Modal,
  SpinnerTheme,
  Swapable,
  Text,
  TextPreset,
  useVisibility,
} from "@q4/nimbus-ui";
import type { Organization } from "@q4/platform-definitions";
import { OrganizationType } from "@q4/platform-definitions";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AdminLoadingSpinner } from "../../../../../../components/Admin/LoadingSpinner/LoadingSpinner.component";
import { Role } from "../../../../../../configurations/access.configuration";
import type { Team } from "../../../../../../definitions/team.definition";
import type { User } from "../../../../../../definitions/user.definition";
import { useClaims } from "../../../../../../hooks/useClaims/useClaims.hook";
import { TeamCreateMessage } from "../../../../../../hooks/useTeam/useTeam.definition";
import { useTeamCreate } from "../../../../../../hooks/useTeam/useTeam.hook";
import { useToastNotificationService } from "../../../../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { AddOrganizationsForm } from "../../../../../../modules/Admin/Organizations/Details/Team/components/AddOrganizationsForm/AddOrganizationsForm.component";
import {
  useOrganizationQuery,
  useOrganizationsQuery,
  useTeamsQuery,
  useUsersQuery,
} from "../../../../../../schemas/generated/graphql";
import { mapErrorsToKey } from "../../../../../../utils/error/error.utils";
import {
  orderOrganizationsAlphabetically,
  getOrganizationViewRoute,
} from "../../../../../../utils/organization/organization.utils";
import { getOrganizationRouteBasedOnPermission } from "../../../../../../utils/route/route.utils";
import { fetchPolicy, requestPolicy, TeamDescriptions, TeamErrorsLanguage } from "../OrganizationsTeam.definition";
import type { TeamFormError, OrganizationsTeamParam } from "../OrganizationsTeam.definition";
import { CustomGrid, CustomGridColumn, WideTableWrapper } from "../OrganizationsTeam.style";
import { AddUsersTeamsForm } from "../components/AddUsersForm/AddUsersTeamsForm.component";
import {
  OrganizationTeamCreateDefaultTeam,
  TeamCreateLanguage,
  TeamCreateViewIdModel as ViewIdModel,
  TeamFormStates,
} from "./OrganizationsTeamCreate.definition";

const OrganizationTeamCreateBase = (): JSX.Element => {
  const params = useParams<OrganizationsTeamParam>();
  const notifications = useToastNotificationService();
  const history = useHistory();
  const organizationId = useMemo(() => params.id, [params.id]);

  const [isModalVisible, handleCloseRequest] = useVisibility();
  const [formState, setFormState] = useState<TeamFormStates>(TeamFormStates.AddTeam);
  const [team, setTeam] = useState(OrganizationTeamCreateDefaultTeam);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [fieldsErrors, setFieldsErrors] = useState<TeamFormError>();

  const [{ fetching: isLoadingOrganization, data: currentOrganizationData }] = useOrganizationQuery({
    variables: { id: organizationId },
    pause: isNullOrWhiteSpace(organizationId),
  });

  const { loading: isLoadingManagedOrganizations, data: managedOrganizationsData } = useOrganizationsQuery({
    variables: {
      pageSize: 0,
      type: OrganizationType.CORP,
      active: true,
      managedBy: organizationId,
      delegateOrganizationId: organizationId,
    },
    skip: isNullOrWhiteSpace(organizationId),
    fetchPolicy,
  });

  const [{ fetching: isLoadingTeams, data: currentTeamsData }] = useTeamsQuery({
    variables: {
      organizationId,
      pageSize: 0,
    },
    pause: isNullOrWhiteSpace(organizationId),
    requestPolicy,
  });

  const [{ fetching: savingTeam }, postCreateTeam] = useTeamCreate();

  const [{ fetching: isLoadingUsers, data: currentUsersData, error: errorUser }, handleUsersQuery] = useUsersQuery({
    variables: { organizationId, pageSize: 0 },
    requestPolicy,
  });

  const organization = useMemo(() => currentOrganizationData?.organization, [currentOrganizationData]);
  const managedOrganizations = useMemo(
    () => orderOrganizationsAlphabetically(managedOrganizationsData?.organizations?.items || []),
    [managedOrganizationsData],
  );
  const teams = useMemo(() => currentTeamsData?.accessGroups?.items || [], [currentTeamsData]);
  const users = useMemo(() => {
    // TODO: PLATFORM-2336 - Add relationship between roles and permissions to platform-definitions then reference it here
    const selectableUsers = (currentUsersData?.users?.items || []).filter(
      (user) => !user.roles?.every((role) => role === Role.Q4Admin),
    );
    return orderUsersAlphabetically(selectableUsers);
  }, [currentUsersData]);

  const isLoading = useMemo(
    () => isLoadingManagedOrganizations || isLoadingOrganization || isLoadingTeams || isLoadingUsers,
    [isLoadingManagedOrganizations, isLoadingOrganization, isLoadingTeams, isLoadingUsers],
  );

  const isAddUsersDisabled = useMemo(
    () => isLoading || isNullOrWhiteSpace(team?.name) || isEmpty(selectedOrganizations),
    [isLoading, selectedOrganizations, team?.name],
  );

  const errorService = useRef(
    new ErrorHandlerService<number, Team>([
      new ErrorHandlerField(
        "name",
        TeamErrorsLanguage.Characters,
        (value: string) => /^[a-zA-Z0-9'\-&\s]+$/g.test(value) || value?.trim().length === 0,
      ),
    ]),
  );

  const checkForErrors = useCallback(() => {
    errorService.current.checkForErrors(0, team);
    const currentErrors = errorService.current.getAll().reduce<TeamFormError>(mapErrorsToKey, {});

    const invalidNameLength = team.name?.trim().length >= 250;
    currentErrors.name = currentErrors.name ?? new ErrorModel(TeamErrorsLanguage.MaxLength, invalidNameLength);

    setFieldsErrors(currentErrors);

    return errorService.current.hasErrors() || invalidNameLength;
  }, [team]);

  const handleAddUsers = useCallback(() => {
    if (checkForErrors()) {
      return;
    }
    setFormState(TeamFormStates.AddUsers);
  }, [checkForErrors]);

  const handleBack = useCallback(() => {
    setFormState(TeamFormStates.AddTeam);
  }, []);

  const handleGetUsersList = useCallback(() => {
    handleUsersQuery({
      variables: { organizationId, pageSize: 0 },
    });
  }, [handleUsersQuery, organizationId]);

  const handleCloseModal = useCallback(() => {
    handleCloseRequest();
    history.push(getOrganizationViewRoute(organizationId));
  }, [handleCloseRequest, history, organizationId]);

  const handleCreateTeam = useCallback(() => {
    const payload = {
      ...team,
      organizationId,
      managedOrganizationIds: selectedOrganizations.map((org) => org.id),
      userIds: addedUsers,
    };
    postCreateTeam(payload).then((response) => {
      if (!response.success) {
        notifications.current.error(`${TeamCreateMessage.Failed}: ${response.message}`);
        return;
      }

      notifications.current.success(TeamCreateMessage.Success);
      handleCloseModal();
    });
  }, [addedUsers, handleCloseModal, notifications, organizationId, postCreateTeam, selectedOrganizations, team]);

  const footerActions = useMemo(() => {
    if (formState === TeamFormStates.AddUsers) {
      return [
        {
          id: ViewIdModel.back.id,
          label: TeamCreateLanguage.BackButton,
          theme: ButtonTheme.DarkSlate,
          disabled: savingTeam,
          onClick: handleBack,
        },
        {
          id: ViewIdModel.create.id,
          label: TeamCreateLanguage.CreateTeamButton,
          theme: ButtonTheme.Citrus,
          disabled: isLoading || isEmpty(addedUsers),
          onClick: handleCreateTeam,
          loading: savingTeam,
        },
      ];
    }

    return [
      {
        id: ViewIdModel.add.id,
        label: TeamCreateLanguage.AddUsersButton,
        theme: ButtonTheme.Citrus,
        disabled: isAddUsersDisabled,
        onClick: handleAddUsers,
      },
    ];
  }, [addedUsers, formState, handleAddUsers, handleBack, handleCreateTeam, isAddUsersDisabled, isLoading, savingTeam]);

  function handleTeamChange<T>(key: keyof Team): (value: T) => void {
    return (value: T): void => {
      setTeam((state) => ({
        ...state,
        [key]: value,
      }));
    };
  }

  function handleChangeOrganizationsList(selectedOrganizations: Organization[]): void {
    setSelectedOrganizations(selectedOrganizations);
  }

  function handleUserSelect(userId: User["id"]) {
    setAddedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
  }

  function handleUserRemove(userId: User["id"]) {
    setAddedUsers(addedUsers.filter((addedUser) => addedUser !== userId));
  }

  const claims = useClaims();

  const handleExit = () => {
    const organizationRoute = getOrganizationRouteBasedOnPermission(claims.permissions, organization.id);
    history.replace(organizationRoute);
  };

  function renderAddOrganizationsForm(): JSX.Element {
    return (
      <AddOrganizationsForm
        id={ViewIdModel.addOrganizationsForm.id}
        isLoading={isLoading}
        teamName={team?.name}
        teams={teams}
        errors={fieldsErrors}
        selectedOrganizations={selectedOrganizations}
        managedOrganizations={managedOrganizations}
        onChangeName={handleTeamChange("name")}
        onChangeOrganizationsList={handleChangeOrganizationsList}
      />
    );
  }

  function renderAddUsersForm(): JSX.Element {
    return (
      <WideTableWrapper width="1-of-1">
        <AddUsersTeamsForm
          id={ViewIdModel.addUsersTeamForm.id}
          users={users}
          teams={teams}
          selectedUsers={addedUsers}
          error={errorUser}
          isLoading={savingTeam}
          onUsersError={handleGetUsersList}
          onUserSelect={handleUserSelect}
          onUserRemove={handleUserRemove}
        />
      </WideTableWrapper>
    );
  }

  return (
    <div id={ViewIdModel.id}>
      <Modal
        fullscreen
        scrollable
        id={ViewIdModel.modal.id}
        title="Add Team"
        className="organizations-team"
        badgeIcon="q4i-team-2pt"
        visible={!isModalVisible}
        focusOnProps={{
          autoFocus: false,
        }}
        footerActions={footerActions}
        includeExit={!savingTeam}
        onCloseRequest={handleExit}
      >
        <AdminLoadingSpinner loading={isLoading} theme={SpinnerTheme.Citrus} fixed />
        <CustomGrid>
          <CustomGridColumn width="1-of-1">
            <CustomGrid>
              <Text preset={TextPreset.H2}>
                {TeamCreateLanguage.Title} • {organization?.name}
              </Text>
            </CustomGrid>
            <CustomGrid>
              <Text>{TeamFormStates.AddUsers === formState ? TeamDescriptions.Users : TeamDescriptions.Create}</Text>
            </CustomGrid>
          </CustomGridColumn>
          <Swapable
            layers={[renderAddOrganizationsForm(), renderAddUsersForm()]}
            selected={+(TeamFormStates.AddUsers === formState)}
          />
        </CustomGrid>
      </Modal>
    </div>
  );
};

export const OrganizationTeamCreate = memo(OrganizationTeamCreateBase);
