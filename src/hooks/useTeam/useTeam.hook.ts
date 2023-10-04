import { useMemo } from "react";
import type { UseMutationState, UseQueryResponse } from "urql";
import { useQuery } from "urql";
import { Team } from "../../definitions";
import type { QueryHookProps, QueryPaginationVariablesBase } from "../useQuery";
import { getDefaultPageSize, useMutation } from "../useQuery";
import { TeamPostKey, TeamsGraphQuery, TeamCreateMessage } from "./useTeam.definition";
import type {
  QueryGetTeamByIdVariablesBase,
  TeamPostPayload,
  TeamPostResponse,
  TeamQueryResponse,
  TeamSaveHookModel,
  TeamsQueryResponse,
} from "./useTeam.definition";

// Todo: qp-1570 - [Technical Debt] Convert useTeam queries and mutations to use Apollo Client
export const useTeamQuery = (
  props?: QueryHookProps<Team, QueryGetTeamByIdVariablesBase>,
): UseQueryResponse<TeamQueryResponse, QueryGetTeamByIdVariablesBase> => {
  return useQuery<TeamQueryResponse, QueryGetTeamByIdVariablesBase>({
    query: TeamsGraphQuery.Team,
    ...props,
  });
};

export const useTeamsQuery = (
  props?: QueryHookProps<Team[]>,
): UseQueryResponse<TeamsQueryResponse, QueryPaginationVariablesBase> => {
  const pageSize = useMemo(() => getDefaultPageSize(props?.variables?.pageSize), [props?.variables?.pageSize]);

  return useQuery<TeamsQueryResponse, QueryPaginationVariablesBase>({
    ...props,
    variables: { ...props?.variables, pageSize },
    query: TeamsGraphQuery.Teams,
  });
};

export const useTeamCreate = (): [
  UseMutationState<TeamPostResponse, TeamPostPayload>,
  TeamSaveHookModel<TeamPostPayload>,
] => {
  return useMutation(TeamsGraphQuery.CreateTeam, TeamPostKey, TeamCreateMessage.Failed, TeamCreateMessage.Success, Team);
};
