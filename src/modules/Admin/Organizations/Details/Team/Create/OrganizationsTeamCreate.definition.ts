import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace, ModalIdModel } from "@q4/nimbus-ui";
import { Team } from "../../../../../../definitions/team.definition";
import { AddOrganizationsFormIdModel } from "../components/AddOrganizationsForm/AddOrganizationsForm.definition";
import { AddUsersTeamsFormIdModel } from "../components/AddUsersForm/AddUsersTeamsForm.definition";

export enum TeamFormStates {
  AddTeam = "add-team",
  AddUsers = "add-users",
}

export enum TeamCreateLanguage {
  Title = "Add Team",
  BackButton = "Back",
  CreateTeamButton = "Create Team",
  AddUsersButton = "Add Users",
}

export const OrganizationTeamCreateDefaultTeam = new Team();

class TeamCreateIdModel extends IdModelBase {
  modal: ModalIdModel;
  back: ButtonIdModel;
  add: ButtonIdModel;
  create: ButtonIdModel;
  addOrganizationsForm: AddOrganizationsFormIdModel;
  addUsersTeamForm: AddUsersTeamsFormIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.modal = new ModalIdModel(null);
      this.add = new ButtonIdModel(null);
      this.back = new ButtonIdModel(null);
      this.create = new ButtonIdModel(null);
      this.addOrganizationsForm = new AddOrganizationsFormIdModel(null);
      this.addUsersTeamForm = new AddUsersTeamsFormIdModel(null);

      return;
    }

    this.modal = new ModalIdModel(`${this.id}Modal`);
    this.add = new ButtonIdModel(`${this.id}Add`);
    this.back = new ButtonIdModel(`${this.id}Back`);
    this.create = new ButtonIdModel(`${this.id}Create`);
    this.addOrganizationsForm = new AddOrganizationsFormIdModel(`${this.id}AddOrgForm`);
    this.addUsersTeamForm = new AddUsersTeamsFormIdModel(`${this.id}AddUsersForm`);
  }
}

export const TeamCreateViewIdModel = new TeamCreateIdModel("TeamCreate");
