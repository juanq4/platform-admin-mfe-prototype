import { Role } from "../../configurations/access.configuration";
import { User } from "../../definitions/user.definition";

const organizationId = "c249912d-8a48-44af-b265-45f192b895bd";

export const MockUser = new User({
  email: "star-lord@guardians.com",
  firstName: "Peter",
  lastName: "Quill",
  friendlyName: "Star-Lord",
  title: "Leader",
  organizationId: "bc5b65eb-c4e3-45ed-9e52-a02e77167c75",
  roles: [Role.Q4Admin],
});

export const MockUserNoRoles = new User({
  email: "star-lord@guardians.com",
  firstName: "Peter",
  lastName: "Quill",
  friendlyName: "Star-Lord",
  title: "Leader",
  organizationId: "bc5b65eb-c4e3-45ed-9e52-a02e77167c75",
});

export const MockUserWithId = new User({
  id: "bc5b65eb-c4e3-45ed-9e52-a02e77167c72",
  email: "testUser@guardians.com",
  firstName: "Peter",
  lastName: "Quill",
  friendlyName: "Star-Lord",
  title: "Leader",
  organizationId: "bc5b65eb-c4e3-45ed-9e52-a02e77167c21",
  roles: [Role.Q4Admin],
});

export const MockUserNoRolesWithId = new User({
  id: "bc5b65eb-c4e3-45ed-9e52-a02e77167c72",
  email: "testUser@guardians.com",
  firstName: "Peter",
  lastName: "Quill",
  friendlyName: "Star-Lord",
  title: "Leader",
  organizationId: "bc5b65eb-c4e3-45ed-9e52-a02e77167c21",
});

export const MockUser1 = new User({
  id: "bc5b65eb-c4e3-45ed-9e52-a02e77167c11",
  email: "testUser@gmail.com",
  firstName: "Peter",
  lastName: "Quill",
  friendlyName: "Star-Lord",
  title: "Leader",
  organizationId: "bc5b65eb-c4e3-45ed-9e52-a02e77167c33",
  roles: [Role.Q4Admin],
});

export const MockUser2 = new User({
  email: "peterparker@dailybugle.com",
  firstName: "Peter",
  lastName: "Parker",
  friendlyName: "Pete",
  title: "Photographer",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser3 = new User({
  id: "5250528e-4467-4586-a14e-da81d3199020",
  email: "tonyStark@stark.com",
  firstName: "Anthony",
  lastName: "Stark",
  friendlyName: "Tony",
  title: "Iron Man",
  organizationId,
  roles: [Role.CorporateAdmin],
  search: "5250528e-4467-4586-a14e-da81d3199020 tonyStark@stark.com Anthony Stark",
});

export const MockUser4 = new User({
  id: "bed2c6c2-ddee-41ca-82ac-ba71ca41857c",
  email: "steve@gmail.com",
  firstName: "Steven",
  lastName: "Rogers",
  friendlyName: "Cap",
  title: "Solder",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser5 = new User({
  id: "ac4fc5f5-57f5-4acc-b4da-5c0f6acc862f",
  email: "bruce@banner.com",
  firstName: "Bruce",
  lastName: "Banner",
  friendlyName: "Bruce",
  title: "Doctor",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser6 = new User({
  id: "d0492428-65f7-4a60-8a01-84b40a18ca13",
  email: "blackwidow@shield.com",
  firstName: "Natasha",
  lastName: "Romanov",
  friendlyName: "Widow",
  title: "Spy",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser7 = new User({
  id: "9d55c4c7-10d0-4540-b822-aaaf69b909a9",
  email: "thor@stark.com",
  firstName: "Thor",
  lastName: "Odison",
  friendlyName: "Thor",
  title: "God",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser8 = new User({
  id: "fc0c565f-4583-4b27-ab75-9b462378a192",
  email: "janet@pym.com",
  firstName: "Janet",
  lastName: "Van Dyne",
  friendlyName: "Janet",
  title: "Wasp",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser9 = new User({
  id: "90bb11d7-5e28-4b0e-bda0-87d5acbff030",
  email: "scott@pym.com",
  firstName: "Scott",
  lastName: "Lang",
  friendlyName: "Scott",
  title: "Ant-Man",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser10 = new User({
  id: "90bb11d7-5e28-4b0e-bda0-87d5acbff030",
  email: "vision@stark.com",
  firstName: "Victor",
  lastName: "Shade",
  friendlyName: "Vision",
  title: "Synthezoid",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser11 = new User({
  id: "4bc937d9-7769-42d2-891b-779543d1a971",
  email: "Wanda@stark.com",
  firstName: "Wanda",
  lastName: "Maximoff",
  friendlyName: "Wanda",
  title: "Sorcerer",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser12 = new User({
  id: "13e36146-85fa-4534-b354-99095ccfd251",
  email: "james@airforce.com",
  firstName: "James",
  lastName: "Rhodes",
  friendlyName: "Rhodey",
  title: "Colonel",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser13 = new User({
  id: "05dc1ae6-6833-46f6-9fef-cea0271c60b1",
  email: "hawkeye@shield.com",
  firstName: "Clinton",
  lastName: "Barton",
  friendlyName: "Hawkeye",
  title: "Archer",
  organizationId,
  roles: [Role.CorporateAdmin],
});

export const MockUser14 = new User({
  id: "a2af0bb7-ca59-458c-b270-4cc99efbfe73",
  email: "q4_client_team_user@gmail.com",
  firstName: "Dan",
  lastName: "Brown",
  friendlyName: "Db",
  title: "Writer",
  organizationId: "bc5b65eb-c4e3-45ed-9e52-a02e77167c33",
  roles: [Role.Q4ManageClientRole],
});

export const MockQ4AdminUser = new User({
  id: "a2af0bb7-ca59-458c-b270-4cc99efbfe11",
  email: "MockQ4AdminUser@q4inc.com",
  firstName: "Q4 Admin",
  lastName: "User",
  friendlyName: "Db",
  title: "Writer",
  organizationId,
  roles: [Role.Q4Admin],
});

export const MockNoRolesUser = new User({
  id: "55e26197-2554-4ed8-a6ce-fe7339e0082a",
  email: "MockUserNoRoles@q4inc.com",
  firstName: "Mock User",
  lastName: "NoRoles",
  friendlyName: "NO",
  title: "Roles",
  organizationId,
  roles: [],
});

export const MockUsers = [MockUser, MockUser1, MockUser2, MockUser4];
export const MockUsersLong = [
  MockUser13,
  MockUser12,
  MockUser11,
  MockUser10,
  MockUser9,
  MockUser8,
  MockUser7,
  MockUser6,
  MockUser5,
  MockUser4,
  MockUser3,
];
