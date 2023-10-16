import type { BaseComponentProps } from "@q4/nimbus-ui";
import { ChipsIdModel, FieldIdModel, IdModelBase, isNullOrWhiteSpace, SelectIdModel } from "@q4/nimbus-ui";
import type { Organization, Team } from "../../../../../../definitions";

export enum OrganizationsSelectDropdownLanguage {
  Placeholder = "Select",
}

export interface OrganizationsSelectDropdownProps extends BaseComponentProps {
  organizations: Organization[];
  selectedOrganizations: Organization[];
  teams: Team[];
  isLoading?: boolean;
  isDisabled?: boolean;
  onChangeOrganizationsList: (selectedOrganizations: Organization[]) => void;
}

export class OrganizationsSelectDropdownIdModel extends IdModelBase {
  field: FieldIdModel;
  dropdown: SelectIdModel;
  selected: ChipsIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.field = new FieldIdModel(null);
      this.dropdown = new SelectIdModel(null);
      this.selected = new ChipsIdModel(null);

      return;
    }

    this.field = new FieldIdModel(`${this.id}OrganizationsField`);
    this.dropdown = new SelectIdModel(`${this.id}OrganizationsSelect`);
    this.selected = new ChipsIdModel(`${this.id}OrganizationsChips`);
  }
}
