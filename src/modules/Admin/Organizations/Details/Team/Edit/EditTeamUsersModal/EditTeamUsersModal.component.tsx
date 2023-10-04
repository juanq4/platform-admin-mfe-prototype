import { ButtonTheme, isEmpty, isNullOrWhiteSpace, Modal, Text, TextPreset } from "@q4/nimbus-ui";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Role } from "../../../../../../../configurations";
import { useAdminData } from "../../../../../../../contexts/admin/data/data.hook";
import type { User } from "../../../../../../../definitions";
import { TeamDescriptions } from "../../OrganizationsTeam.definition";
import { CustomGrid, CustomGridColumn, WideTableWrapper } from "../../OrganizationsTeam.style";
import { AddUsersTeamsForm } from "../../components/AddUsersForm/AddUsersTeamsForm.component";
import {
  TeamEditLanguage,
  TeamEditModalDefaultProps,
  TeamEditViewIdModel as ViewIdModel,
} from "../OrganizationsTeamEdit.definition";
import { EditTeamUsersModalIdModel } from "./EditTeamUsersModal.definition";
import type { EditTeamUsersModalProps } from "./EditTeamUsersModal.definition";

const EditTeamUsersModalBase = (props: EditTeamUsersModalProps): JSX.Element => {
  const { id, title, isVisible, isLoading, isUpdating, error, onRefetchUsers, onUpdate, onClose } = props;
  const { team, teams, users } = useAdminData();

  const idModel = useMemo(() => new EditTeamUsersModalIdModel(id), [id]);

  const persistedUserSelection = useRef<Set<string>>(new Set(team?.userIds || []));
  const [selectedUsers, setSelectedUsers] = useState<User["id"][]>();
  const [userSelectionDeltas, setUserSelectionDeltas] = useState<{ add: Set<string>; remove: Set<string> }>({
    add: new Set(),
    remove: new Set(),
  });

  const footerActionsDisabled = isLoading || isUpdating || isEmpty(selectedUsers);

  const selectableUsers = (users || []).filter((user) => !user.roles?.every((role) => role === Role.Q4Admin));

  useEffect(() => {
    if (!isVisible) return;
    setSelectedUsers(team.userIds);

    persistedUserSelection.current = new Set(team?.userIds || []);
  }, [team, isVisible]);

  function handleUpdateUsers() {
    onUpdate(
      {
        ...team,
        userIds: selectedUsers,
      },
      { userDeltas: { add: [...userSelectionDeltas.add], remove: [...userSelectionDeltas.remove] } },
    );
  }

  function handleUserSelect(selectedUserId: User["id"]) {
    if (isNullOrWhiteSpace(selectedUserId) || selectedUsers.includes(selectedUserId)) return;

    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, selectedUserId]);

    const _add = userSelectionDeltas.add;

    // if user exists in persistence, no need to add to delta
    persistedUserSelection.current.has(selectedUserId) ? _add.delete(selectedUserId) : _add.add(selectedUserId);

    // if adding user, always remove from remove delta
    const _remove = userSelectionDeltas.remove;
    _remove.delete(selectedUserId);

    setUserSelectionDeltas((userSelectionDeltas) => ({
      ...userSelectionDeltas,
      add: _add,
      remove: _remove,
    }));
  }

  function handleUserRemove(selectedUserId: User["id"]) {
    setSelectedUsers((currentUsers) => currentUsers.filter((userId) => userId !== selectedUserId));

    const _add = userSelectionDeltas.add;
    _add.delete(selectedUserId);

    setUserSelectionDeltas((userSelectionDeltas) => ({
      ...userSelectionDeltas,
      add: _add,
      remove: userSelectionDeltas.remove.add(selectedUserId),
    }));
  }

  return (
    <Modal
      id={idModel.modal.id}
      targetElementId={ViewIdModel.teamNameEditModal.id}
      {...TeamEditModalDefaultProps}
      visible={isVisible}
      footerActions={[
        {
          id: idModel.update.id,
          label: TeamEditLanguage.UpdateUsers,
          theme: ButtonTheme.Citrus,
          disabled: footerActionsDisabled,
          onClick: handleUpdateUsers,
          loading: isUpdating,
        },
      ]}
      onCloseRequest={onClose}
    >
      <CustomGrid>
        <CustomGridColumn width="1-of-1">
          <CustomGrid>
            <Text preset={TextPreset.H2}>{title}</Text>
          </CustomGrid>
          <CustomGrid>
            <Text>{TeamDescriptions.Users}</Text>
          </CustomGrid>
        </CustomGridColumn>
        <WideTableWrapper width="1-of-1">
          <AddUsersTeamsForm
            id={idModel.addUsersTeamForm.id}
            users={selectableUsers}
            teams={teams}
            selectedUsers={selectedUsers}
            isLoading={isUpdating || isLoading}
            error={error}
            onUsersError={onRefetchUsers}
            onUserSelect={handleUserSelect}
            onUserRemove={handleUserRemove}
          />
        </WideTableWrapper>
      </CustomGrid>
    </Modal>
  );
};

export const EditTeamUsersModal = memo(EditTeamUsersModalBase);
