import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { BaseComponentProps } from "@q4/nimbus-ui";

export enum OrganizationTeamsLanguage {
  ADD = "ADD TEAM",
  ADD_TOOLTIP = "Create a new team to provide a group of users with access to specific organizations",
  NO_TEAMS = "There are currently no teams",
  ERROR = "Failed to load Teams information.",
}

export interface OrganizationTeamsProps extends Omit<BaseComponentProps, "className" | "dataId"> {
  organizationId: string;
  onCreateTeam: () => void;
}

export class OrganizationTeamsIdModel extends IdModelBase {
  addTeam: ButtonIdModel;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.addTeam = new ButtonIdModel(null);

      return;
    }

    this.addTeam = new ButtonIdModel(`${this.id}AddTeam`);
  }
}
