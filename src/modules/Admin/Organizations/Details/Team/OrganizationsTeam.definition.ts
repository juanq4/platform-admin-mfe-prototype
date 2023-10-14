import type { ErrorModel } from "@q4/nimbus-ui";

export const fetchPolicy = "no-cache"; // Apollo
export const requestPolicy = "network-only"; // URQL

export interface OrganizationsTeamParam {
  id: string;
}

export interface TeamFormError {
  name?: ErrorModel;
}

export enum TeamDescriptions {
  Create = "Name your team and select organizations this team manages.",
  Edit = "Select organizations this team manages.",
  Organizations = "Select organizations this team manages.",
  Users = "Select the users you want to provide organization access to. Users may belong to more than one team.",
}

export enum TeamErrorsLanguage {
  Required = "Team Name is required.",
  MaxLength = "Team Name must be less than 250 characters.",
  Characters = "Team Name may only contain A-Z a-z 0-9 ‘ - & characters.",
}

export type TeamDeltaUpdates = {
  managedOrgDeltas?: { add: string[]; remove: string[] };
  userDeltas?: { add: string[]; remove: string[] };
};
