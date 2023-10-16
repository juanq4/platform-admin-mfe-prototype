import { ButtonTheme, isEmpty, Modal, Text, TextPreset } from "@q4/nimbus-ui";
import type { Organization } from "@q4/platform-definitions";
import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AdminDataContext } from "../../../../../../../contexts/data/data.context";
import type { Team } from "../../../../../../../definitions/team.definition";
import { TeamDescriptions } from "../../OrganizationsTeam.definition";
import { CustomGrid, CustomGridColumn } from "../../OrganizationsTeam.style";
import { OrganizationsSelectDropdown } from "../../components/OrganizationsSelectDropdown/OrganizationsSelectDropdown.component";
import {
  TeamEditLanguage,
  TeamEditModalDefaultProps,
  TeamEditViewIdModel as ViewIdModel,
} from "../OrganizationsTeamEdit.definition";
import type { EditTeamOrganizationsModalProps } from "./EditTeamOrganizationsModal.definition";
import { EditTeamOrganizationsModalIdModel } from "./EditTeamOrganizationsModal.definition";

const EditTeamOrganizationsModalBase = (props: EditTeamOrganizationsModalProps): JSX.Element => {
  const { id, title, isVisible, isLoading, isUpdating, onUpdate, onClose } = props;
  const { team, teams, organizations } = useContext(AdminDataContext);
  const idModel = useMemo(() => new EditTeamOrganizationsModalIdModel(id), [id]);

  const persistedOrgSelection = useRef<Set<string>>();
  const [selectedOrganizations, setSelectedOrganizations] = useState<Organization[]>([]);
  const [orgSelectionDeltas, setOrgSelectionDeltas] = useState<{ add: string[]; remove: string[] }>({
    add: [],
    remove: [],
  });
  const footerActionsDisabled = isLoading || isUpdating || isEmpty(selectedOrganizations);
  const filteredTeams = useMemo(() => teams.filter((tm: Team) => tm.id !== team.id), [team, teams]);

  useEffect(() => {
    if (isEmpty(team) && !isVisible) return;

    const _selectedOrgs = organizations.filter((org: Organization) => team.managedOrganizationIds.includes(org.id));
    setSelectedOrganizations(_selectedOrgs);

    persistedOrgSelection.current = new Set(_selectedOrgs.map(({ id }) => id));
  }, [team, organizations, isVisible]);

  const handleUpdateOrganizations = useCallback(() => {
    onUpdate(
      {
        ...team,
        managedOrganizationIds: selectedOrganizations.map((org: Organization) => org.id),
      },
      { managedOrgDeltas: orgSelectionDeltas },
    );
  }, [orgSelectionDeltas, selectedOrganizations, team, onUpdate]);

  const handleOrgsSelected = useCallback((_selectedOrgs: Organization[]) => {
    setSelectedOrganizations(_selectedOrgs);

    // Creating Sets for constant time lookup
    const oldSelection = persistedOrgSelection.current;
    const newSelection = new Set(_selectedOrgs.map((org) => org.id));

    // if new selection has this org, but old selectiond doesn't, add
    const addedOrgs = _selectedOrgs.filter((org) => !oldSelection.has(org.id)).map((org) => org.id);

    // if orgs in old selection, and not in new selection, remove
    const removedOrgsIds = [...oldSelection].filter((orgId) => !newSelection.has(orgId));

    setOrgSelectionDeltas({
      add: addedOrgs,
      remove: removedOrgsIds,
    });
  }, []);

  return (
    <Modal
      id={idModel.modal.id}
      targetElementId={ViewIdModel.teamNameEditModal.id}
      {...TeamEditModalDefaultProps}
      visible={isVisible}
      footerActions={[
        {
          id: idModel.update.id,
          label: TeamEditLanguage.UpdateOrganizations,
          theme: ButtonTheme.Citrus,
          disabled: footerActionsDisabled,
          onClick: handleUpdateOrganizations,
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
            <Text>{TeamDescriptions.Organizations}</Text>
          </CustomGrid>
        </CustomGridColumn>
        <CustomGridColumn width="1-of-4" mediumWidth="1-of-3" smallWidth="1-of-2">
          <OrganizationsSelectDropdown
            id={idModel.organizationsSelector.id}
            organizations={organizations}
            selectedOrganizations={selectedOrganizations}
            teams={filteredTeams}
            isLoading={isLoading}
            isDisabled={isUpdating}
            onChangeOrganizationsList={handleOrgsSelected}
          />
        </CustomGridColumn>
      </CustomGrid>
    </Modal>
  );
};

export const EditTeamOrganizationsModal = memo(EditTeamOrganizationsModalBase);
