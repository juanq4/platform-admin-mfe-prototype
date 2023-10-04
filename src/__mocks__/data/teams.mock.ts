import { Team } from "../../definitions";
import { MockOrganization1, MockOrganization2, MockOrganization10 } from "./organizations.mock";
import { MockUser, MockUser1, MockUser2, MockUser4, MockUser8 } from "./users.mock";

const miningTeam = {
  id: "111111-222222-333333-00000",
  name: "Mining",
  organizationId: "aaaaa-sssss-ddddd-77777",
};

export const MockTeam1 = new Team({
  id: "111111-222222-333333-44444",
  name: "Shield",
  organizationId: "aaaaa-sssss-ddddd-ffff",
  managedOrganizationIds: [MockOrganization1.id],
  userIds: [],
});

export const MockTeam2 = new Team({
  id: "111111-222222-333333-44444",
  name: "Shield",
  organizationId: "aaaaa-sssss-ddddd-ffff",
  managedOrganizationIds: [],
  userIds: [MockUser1.id],
});

export const MockTeam3 = new Team({
  ...miningTeam,
  managedOrganizationIds: [MockOrganization1.id],
  userIds: [MockUser2.id, MockUser1.id],
});

export const MockTeam4 = new Team({
  ...miningTeam,
  managedOrganizationIds: [MockOrganization2.id],
  userIds: [MockUser2.id, MockUser1.id],
});

export const MockTeam5 = new Team({
  ...miningTeam,
  managedOrganizationIds: [MockOrganization10.id],
  userIds: [MockUser1.id],
});

export const MockTeam6 = new Team({
  ...miningTeam,
  managedOrganizationIds: [MockOrganization1.id],
  userIds: [MockUser1.id],
});

export const MockTeam7 = new Team({
  ...miningTeam,
  managedOrganizationIds: [MockOrganization1.id],
  userIds: [MockUser.id, MockUser1.id, MockUser4.id],
});

export const MockTeam8 = new Team({
  id: "2591fd5b-9484-4cd2-8a2e-fbd8e7db7353",
  name: "Avengers",
  organizationId: "7532dde1-4b64-4524-94ff-da57dd8feb13",
  managedOrganizationIds: [MockOrganization1.id],
  userIds: [MockUser8.id],
});

export const MockTeams = [MockTeam1, MockTeam2, MockTeam3];
