import { useMemo } from "react";
import { useQuery } from "urql";
import type { UseMutationState, UseQueryResponse } from "urql";
import { Organization } from "../../definitions/organization.definition";
import { getOrganizationPayloadBase } from "../../utils/organization/organization.utils";
import type { QueryHookProps, QueryPaginationVariablesBase, LazyQueryHookResponse } from "../useQuery/useQuery.definition";
import { useLazyQuery, useMutation } from "../useQuery/useQuery.hook";
import { getDefaultPageSize } from "../useQuery/useQuery.utils";
import {
  OrganizationCreateMessage,
  OrganizationEditMessage,
  OrganizationGraphQuery,
  OrganizationPutKey,
  OrganizationPostKey,
} from "./useOrganization.definition";
import type {
  OrganizationPutPayload,
  OrganizationPostPayload,
  OrganizationPostResponse,
  OrganizationPutResponse,
  OrganizationSaveHookModel,
  OrganizationsQueryResponse,
  OrganizationMutationModel,
  SitesByOrganizationResponse,
  SitesByOrgQueryVariables,
} from "./useOrganization.definition";

export const useOrganizationsQuery = (
  props?: QueryHookProps<Organization[]>,
): UseQueryResponse<OrganizationsQueryResponse, QueryPaginationVariablesBase> => {
  const pageSize = useMemo(() => getDefaultPageSize(props?.variables?.pageSize), [props?.variables?.pageSize]);

  return useQuery<OrganizationsQueryResponse, QueryPaginationVariablesBase>({
    ...props,
    variables: { ...props?.variables, pageSize },
    query: OrganizationGraphQuery.Organizations,
  });
};

export const OrganizationsWithManagedByQuery = (
  props?: QueryHookProps<Organization[]>,
): UseQueryResponse<OrganizationsQueryResponse, QueryPaginationVariablesBase> => {
  return useQuery<OrganizationsQueryResponse, QueryPaginationVariablesBase>({
    ...props,
    query: OrganizationGraphQuery.OrganizationsWithManagedBy,
  });
};

// export const useOrganizationsLazyQuery = (): [
//   OrganizationsLazyQueryResponse & { fetching: boolean; isCalled: boolean },
//   (props?: QueryHookProps<Organization[]>) => void,
// ] => {
//   const { query } = useContext(GraphqlContext);

//   const [fetching, setFetching] = useState(false);
//   const [isCalled, setIsCalled] = useState(false);
//   const [data, setData] = useState<OrganizationsLazyQueryResponse>(null);

//   const getOrganizations = useCallback(
//     (props?: QueryHookProps<Organization[]>) => {
//       setFetching((current) => {
//         if (current) return current;
//         setFetching(true);
//         setIsCalled(true);
//         const { variables } = props || {};
//         const pageSize = getDefaultPageSize(variables?.pageSize);

//         query<OrganizationsQueryResponse, QueryPaginationVariablesBase>(OrganizationGraphQuery.Organizations, {
//           ...variables,
//           pageSize,
//         })
//           .toPromise()
//           .then((response) => {
//             setData(response);
//           })
//           .finally(() => {
//             setFetching(false);
//           });
//       });
//     },
//     [query],
//   );

//   return [{ ...data, fetching, isCalled }, getOrganizations];
// };

// export const useOrganizationQuery = (
//   props: QueryHookProps<Organization, QueryGetByIdVariablesBase>,
// ): UseQueryResponse<OrganizationQueryResponse, QueryGetByIdVariablesBase> => {
//   return useQuery<OrganizationQueryResponse, QueryGetByIdVariablesBase>({
//     query: OrganizationGraphQuery.Organization,
//     ...props,
//   });
// };

export const useOrganizationCreate = (): [
  UseMutationState<OrganizationPostResponse, OrganizationMutationModel | OrganizationPostPayload>,
  OrganizationSaveHookModel<OrganizationPostPayload>,
] => {
  return useMutation(
    OrganizationGraphQuery.CreateOrganization,
    OrganizationPostKey,
    OrganizationCreateMessage.Failed,
    OrganizationCreateMessage.Success,
    Organization,
    getOrganizationPayloadBase,
  );
};

export const useOrganizationUpdate = (): [
  UseMutationState<OrganizationPutResponse, OrganizationMutationModel | OrganizationPutPayload>,
  OrganizationSaveHookModel<OrganizationPutPayload>,
] => {
  return useMutation(
    OrganizationGraphQuery.UpdateOrganization,
    OrganizationPutKey,
    OrganizationEditMessage.Failed,
    OrganizationEditMessage.Success,
    Organization,
    getOrganizationPayloadBase,
  );
};

export const useSitesByOrganizationsLazyQuery = (): LazyQueryHookResponse<
  SitesByOrganizationResponse,
  SitesByOrgQueryVariables
> => useLazyQuery<SitesByOrganizationResponse, SitesByOrgQueryVariables>(OrganizationGraphQuery.SitesByOrganization);
