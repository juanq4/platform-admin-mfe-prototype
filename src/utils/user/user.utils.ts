import type { User as AuthUser } from "@auth0/auth0-react";
import { isEmpty, isNil } from "@q4/nimbus-ui";
import type { Team } from "../../definitions/team.definition";
import type { User, UserWithTeams } from "../../definitions/user.definition";

export const getInitials = (name: string): string => {
  if (!name) return "";

  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
};

export const getLoggedInUserName = (user: AuthUser): string => {
  const { nickname, email, given_name, family_name } = user;

  const friendlyName = nickname?.trim();
  const emailLocal = email?.split("@")[0];
  const isUserSubmittedNickName = friendlyName && friendlyName !== emailLocal;

  if (friendlyName && isUserSubmittedNickName) {
    return family_name ? `${friendlyName} ${family_name}` : friendlyName;
  }

  if (given_name) {
    return family_name ? `${given_name} ${family_name}` : given_name;
  }

  return "";
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
