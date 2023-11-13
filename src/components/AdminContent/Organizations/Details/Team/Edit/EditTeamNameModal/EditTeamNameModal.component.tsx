import {
  ButtonTheme,
  ErrorHandlerService,
  ErrorModel,
  isEmpty,
  isNullOrWhiteSpace,
  SpinnerTheme,
  Text,
  TextPreset,
} from "@q4/nimbus-ui";
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AdminDataContext } from "../../../../../../../contexts/data/data.context";
import type { Organization } from "../../../../../../../definitions/organization.definition";
import type { Team } from "../../../../../../../definitions/team.definition";
import type { User } from "../../../../../../../definitions/user.definition";
import { mapErrorsToKey } from "../../../../../../../utils/error/error.utils";
import { orderOrganizationsAlphabetically } from "../../../../../../../utils/organization/organization.utils";
import { getUsersWithTeams, orderUsersAlphabetically } from "../../../../../../../utils/user/user.utils";
import { AdminLoadingSpinner } from "../../../../../../LoadingSpinner/LoadingSpinner.component";
import type { TeamFormError } from "../../OrganizationsTeam.definition";
import { TeamDescriptions, TeamErrorsLanguage } from "../../OrganizationsTeam.definition";
import { CustomGrid, CustomGridColumn } from "../../OrganizationsTeam.style";
import { EditTeamTablesForm } from "../../components/EditTeamTables/EditTeamTables.component";
import { TeamNameField } from "../../components/TeamNameField/TeamNameField.component";
import { TeamEditModal } from "../OrganizationTeamEdit.style";
import { TeamEditLanguage, TeamEditModalDefaultProps } from "../OrganizationsTeamEdit.definition";
import { EditTeamNameModalIdModel, maxTeamNameLength } from "./EditTeamNameModal.definition";
import type { EditTeamNameModalProps } from "./EditTeamNameModal.definition";

const EditTeamNameModalBase = (props: EditTeamNameModalProps): JSX.Element => {
  const {
    id,
    title,
    isLoading,
    isUpdating,
    organizationsError,
    usersError,
    onRefetchOrganizations,
    onRefetchUsers,
    onEditOrganizations,
    onEditUsers,
    onUpdate,
    onRemove,
    onClose,
  } = props;
  const { team, teams, users, organizations } = useContext(AdminDataContext);
  const idModel = useMemo(() => new EditTeamNameModalIdModel(id), [id]);
  const [teamName, setTeamName] = useState<Team["name"]>();
  const [fieldsErrors, setFieldsErrors] = useState<TeamFormError>();

  const footerActionsDisabled = isLoading || isUpdating;

  const managedOrganizations = useMemo(() => {
    if (isEmpty(team)) return [];

    const filteredOrgs = organizations.filter((org: Organization) => team.managedOrganizationIds.includes(org.id));

    return orderOrganizationsAlphabetically(filteredOrgs);
  }, [organizations, team]);
  const managedUsers = useMemo(() => {
    if (isEmpty(team)) return [];

    const filteredUsers = orderUsersAlphabetically(users.filter((user: User) => team.userIds.includes(user.id)));

    return getUsersWithTeams(filteredUsers, teams);
  }, [users, team, teams]);

  const errorService = useRef(new ErrorHandlerService<number, Team>([]));

  const checkForErrors = useCallback(() => {
    const currentErrors = errorService.current.getAll().reduce<TeamFormError>(mapErrorsToKey, {});

    const hasInvalidName = isNullOrWhiteSpace(teamName);
    if (!currentErrors.name && hasInvalidName) {
      currentErrors.name = new ErrorModel(TeamErrorsLanguage.Required, hasInvalidName);
    }

    const hasInvalidNameLength = teamName?.trim().length >= maxTeamNameLength;
    if (!currentErrors.name && hasInvalidNameLength) {
      currentErrors.name = new ErrorModel(TeamErrorsLanguage.MaxLength, hasInvalidNameLength);
    }

    const hasInvalidCharacters = !/^[a-zA-Z0-9'\-&\s]+$/g.test(teamName);
    if (!currentErrors.name && hasInvalidCharacters) {
      currentErrors.name = new ErrorModel(TeamErrorsLanguage.Characters, hasInvalidCharacters);
    }

    setFieldsErrors(currentErrors);

    return hasInvalidCharacters || hasInvalidNameLength || hasInvalidName;
  }, [teamName]);

  useEffect(() => {
    setTeamName(team?.name);
  }, [team]);

  const handleSaveTeamName = useCallback(() => {
    if (checkForErrors()) return;

    onUpdate({ ...team, name: teamName });
  }, [checkForErrors, onUpdate, team, teamName]);

  function handleOnChangeName(name: Team["name"]): void {
    if (isEmpty(managedOrganizations)) return;
    setTeamName(name);
  }

  return (
    <TeamEditModal
      id={idModel.modal.id}
      {...TeamEditModalDefaultProps}
      visible={true}
      footerActions={[
        {
          id: idModel.remove.id,
          label: TeamEditLanguage.RemoveTeamButton,
          theme: ButtonTheme.Cherry,
          disabled: footerActionsDisabled,
          onClick: onRemove,
        },
        {
          id: idModel.save.id,
          label: TeamEditLanguage.SaveTeamButton,
          theme: ButtonTheme.Citrus,
          disabled: footerActionsDisabled,
          onClick: handleSaveTeamName,
          loading: isUpdating,
        },
      ]}
      onCloseRequest={onClose}
    >
      <AdminLoadingSpinner loading={isLoading} theme={SpinnerTheme.Citrus} fixed />
      <CustomGrid>
        <CustomGridColumn width="1-of-1">
          <CustomGrid>
            <Text preset={TextPreset.H2}>{title}</Text>
          </CustomGrid>
          <CustomGrid>
            <Text>{TeamDescriptions.Edit}</Text>
          </CustomGrid>
        </CustomGridColumn>
        <CustomGridColumn width="1-of-4" mediumWidth="1-of-3" smallWidth="1-of-2">
          <TeamNameField
            id={idModel.nameField.id}
            teamName={teamName}
            disabled={isUpdating}
            errors={fieldsErrors}
            onChangeName={handleOnChangeName}
          />
        </CustomGridColumn>
        <EditTeamTablesForm
          id={idModel.dataTables.id}
          organizationTable={{
            items: managedOrganizations,
            error: organizationsError,
            loading: isLoading,
            onError: onRefetchOrganizations,
          }}
          usersTable={{
            items: managedUsers,
            loading: isLoading,
            error: usersError,
            onError: onRefetchUsers,
          }}
          onEditOrganizations={onEditOrganizations}
          onEditUsers={onEditUsers}
        />
      </CustomGrid>
    </TeamEditModal>
  );
};

export const EditTeamNameModal = memo(EditTeamNameModalBase);
