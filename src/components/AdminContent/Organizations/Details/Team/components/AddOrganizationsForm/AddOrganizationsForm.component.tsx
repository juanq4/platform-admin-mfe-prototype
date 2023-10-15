import React, { memo, useMemo } from "react";
import { CustomGridColumn } from "../../OrganizationsTeam.style";
import { OrganizationsSelectDropdown } from "../OrganizationsSelectDropdown/OrganizationsSelectDropdown.component";
import { TeamNameField } from "../TeamNameField/TeamNameField.component";
import { AddOrganizationsFormIdModel } from "./AddOrganizationsForm.definition";
import type { AddOrganizationsFormProps } from "./AddOrganizationsForm.definition";

const AddOrganizationsFormBase = (props: AddOrganizationsFormProps): JSX.Element => {
  const {
    id,
    managedOrganizations,
    selectedOrganizations,
    isLoading,
    teamName,
    teams,
    errors,
    onChangeName,
    onChangeOrganizationsList,
  } = props;
  const idModel = useMemo(() => new AddOrganizationsFormIdModel(id), [id]);

  return (
    <CustomGridColumn id={idModel.id} width="1-of-4" mediumWidth="1-of-3" smallWidth="1-of-2">
      <TeamNameField id={idModel.teamNameField.id} teamName={teamName} errors={errors} onChangeName={onChangeName} />
      <OrganizationsSelectDropdown
        id={idModel.organizationsSelector.id}
        organizations={managedOrganizations}
        selectedOrganizations={selectedOrganizations}
        teams={teams}
        isLoading={isLoading}
        onChangeOrganizationsList={onChangeOrganizationsList}
      />
    </CustomGridColumn>
  );
};

export const AddOrganizationsForm = memo(AddOrganizationsFormBase);
