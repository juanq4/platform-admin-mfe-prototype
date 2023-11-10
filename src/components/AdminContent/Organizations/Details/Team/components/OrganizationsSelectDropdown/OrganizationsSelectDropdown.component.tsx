import "./OrganizationsSelectDropdown.scss";
import type { ChipsItemProps } from "@q4/nimbus-ui";
import { Chips, Field, isEmpty, isNullOrWhiteSpace, SelectPreset, Text } from "@q4/nimbus-ui";
import { memo, useCallback, useMemo } from "react";
import type { Organization, OrganizationTeamOption } from "../../../../../../../definitions/organization.definition";
import type { Team } from "../../../../../../../definitions/team.definition";
import {
  orderOrganizationsAlphabetically,
  getOrganizationLabelWithTicker,
} from "../../../../../../../utils/organization/organization.utils";
import { StatusCellLabel } from "../../../../../../EntityTable/components/StatusCell/StatusCell.definition";
import { CustomGrid } from "../../Create/OrganizationTeamCreate.style";
import {
  CustomAsyncSelect,
  CustomOption,
  CustomOptionLabel,
  CustomOptionStatus,
} from "../AddOrganizationsForm/AddOrganizationsForm.style";
import type { OrganizationsSelectDropdownProps } from "./OrganizationsSelectDropdown.definition";
import {
  OrganizationsSelectDropdownIdModel,
  OrganizationsSelectDropdownLanguage,
} from "./OrganizationsSelectDropdown.definition";

const OrganizationsSelectDropdownBase = (props: OrganizationsSelectDropdownProps): JSX.Element => {
  const { id, isLoading, isDisabled, organizations, selectedOrganizations, teams, onChangeOrganizationsList } = props;
  const idModel = useMemo(() => new OrganizationsSelectDropdownIdModel(id), [id]);

  const sortedOrganizations = useMemo(() => orderOrganizationsAlphabetically(organizations), [organizations]);
  const getOrganizationLabel = useCallback((organization: Organization) => {
    const label = getOrganizationLabelWithTicker(organization);
    if (organization.active) return label;

    return `${label} (${StatusCellLabel.Deactivated})`;
  }, []);
  const getMappedChips = useMemo<ChipsItemProps<Record<string, string>>[]>(() => {
    return selectedOrganizations.map((addedOrganization: Organization) => {
      return {
        value: addedOrganization.id,
        label: getOrganizationLabel(addedOrganization),
        locked: isDisabled,
      };
    });
  }, [getOrganizationLabel, isDisabled, selectedOrganizations]);

  const organizationStatus = useCallback(
    (option: Organization) => {
      if (isEmpty(teams)) return;

      const selectedTeam = teams.find((team: Team) => team.managedOrganizationIds.includes(option.id));

      return selectedTeam?.name;
    },
    [teams],
  );

  const asyncOptions = useMemo(
    () =>
      sortedOrganizations.map((organization: Organization) => {
        const team = organizationStatus(organization);
        const isSelected = !isEmpty((selectedOrganizations || []).filter((org) => org.id === organization.id));

        return {
          label: getOrganizationLabel(organization),
          value: organization.id,
          isDisabled: !organization.active,
          isSelected,
          team,
          ...organization,
        };
      }),
    [organizationStatus, selectedOrganizations, sortedOrganizations, getOrganizationLabel],
  );

  const selectedItems = useMemo(
    () => asyncOptions.filter((option) => selectedOrganizations.some((org) => org.id === option.id)),
    [asyncOptions, selectedOrganizations],
  );

  const getFilteredOrganizationOptions = (inputStr: string) => {
    if (isNullOrWhiteSpace(inputStr)) {
      return asyncOptions;
    }
    return asyncOptions.filter((i) => i.label && i.label.toLowerCase().includes(inputStr.toLowerCase()));
  };

  const loadOptions = (inputStr: string, callback: (options: Organization[]) => void): void => {
    setTimeout(() => {
      callback(getFilteredOrganizationOptions(inputStr));
    }, 1000);
  };

  const formatOptionLabel = (option: OrganizationTeamOption) => {
    return (
      <CustomOption>
        <CustomOptionLabel>{option?.label}</CustomOptionLabel>
        <CustomOptionStatus>{option?.team}</CustomOptionStatus>
      </CustomOption>
    );
  };

  function handleAddOrganization(selected: Organization[]): void {
    onChangeOrganizationsList(selected);
  }

  function handleRemoveOrganization(removeOrganizationId: Organization["id"]): void {
    onChangeOrganizationsList(selectedOrganizations.filter((selectedOrg) => selectedOrg.id !== removeOrganizationId));
  }

  return (
    <CustomGrid id={idModel.id}>
      <Field id={idModel.field.id} className="organizations-link_organizations" truncate={false} required>
        <Text>Managed Organizations</Text>
        <CustomAsyncSelect
          placeholder={OrganizationsSelectDropdownLanguage.Placeholder}
          id={idModel.dropdown.id}
          classNamePrefix="add-organizations-dropdown nui-select"
          value={selectedItems}
          valueKey={"id"}
          loading={isLoading}
          preset={SelectPreset.Autocomplete}
          disable={isDisabled}
          isMulti={true}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          closeMenuOnSelect={false}
          cacheOptions
          showMultiCheckboxes={true}
          defaultOptions={asyncOptions}
          loadOptions={loadOptions}
          formatOptionLabel={formatOptionLabel}
          onChange={handleAddOrganization}
        />
      </Field>
      <Chips id={idModel.selected.id} onRemove={handleRemoveOrganization} items={getMappedChips} inline={false} />
    </CustomGrid>
  );
};

export const OrganizationsSelectDropdown = memo(OrganizationsSelectDropdownBase);
