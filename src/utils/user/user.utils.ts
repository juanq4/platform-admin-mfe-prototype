import type { User as AuthUser } from "@auth0/auth0-react";
import { isEmpty, isNil, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { Team, User, UserWithTeams } from "../../definitions";

export const getLoggedInUserName = (user: AuthUser): string => {
  const nickName = user?.nickname?.trim();
  const emailLocal = user?.email?.split("@")[0];

  if (!isNullOrWhiteSpace(nickName) && nickName !== emailLocal) {
    return nickName;
  }

  if (user?.given_name && user?.family_name) {
    // User name should be First Name and Last Name initial (e.g Garry C.)
    return `${user.given_name} ${user.family_name[0]}.`;
  }

  return user?.email;
};

export function orderUsersAlphabetically(users: User[] = []): User[] {
  return [...users].sort((a, b) => a?.email.localeCompare(b?.email));
}

export function getUsersWithTeams(users: User[] = [], teams: Team[] = []): UserWithTeams[] {
  if (isEmpty(users) || isEmpty(teams)) return users;

  const userIdTeamName: Record<string, string> = {};
  teams.forEach((team: Team) => {
    team.userIds.forEach((id) => {
      userIdTeamName[id] = isNil(userIdTeamName[id]) ? team.name : userIdTeamName[id] + ", " + team.name;
    });
  });

  return users.map((user) => {
    return {
      ...user,
      teams: userIdTeamName[user.id],
    };
  });
}

export function searchUserFromList(users: User[], searchTerm: string): User[] {
  const processedTerm = searchTerm.trim().toLowerCase();
  return users.filter((user: User) => (user.search || "").toLowerCase().includes(processedTerm));
}
