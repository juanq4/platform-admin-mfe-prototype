import type { OrganizationType } from "@q4/platform-definitions";
import type { OperationContext, OperationResult, UseQueryArgs } from "urql";
import type { EntityBase } from "../../definitions";

export class ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  offline?: boolean;
  totalCount?: number;
  isDeleted?: boolean;

  constructor(response: ApiResponse<T>) {
    Object.assign(this, {
      ...response,
      success: !!response?.success,
      offline: !!response?.offline,
      isDeleted: !!response?.isDeleted,
    });
  }
}

export interface QueryPaginationVariablesBase<TPageRef = string[]> {
  pageSize?: number;
  page?: TPageRef;
  searchTerm?: string;
  organizationId?: string;
  managedBy?: string;
  active?: boolean;
  type?: OrganizationType;
  delegateOrganizationId?: string;
}

export interface QueryGetByIdVariablesBase {
  id: string;
}

export type QueryHookProps<TEntity, TVariable = QueryPaginationVariablesBase> = Omit<
  UseQueryArgs<TVariable, TEntity>,
  "query"
>;

export const QueryPaginationDefault = {
  PageSize: 10,
};

export enum QueryRequestPolicy {
  CacheAndNetwork = "cache-and-network",
  CacheFirst = "cache-first",
  CacheOnly = "cache-only",
  NetworkOnly = "network-only",
}

export type MutationHookModel<TEntity extends EntityBase, TPayload extends EntityBase = TEntity> = (
  variables?: TPayload,
  context?: Partial<OperationContext>,
) => Promise<ApiResponse<TEntity>>;

export interface MutationResponse<T extends EntityBase> {
  [key: string]: T;
}

export type LazyQueryProps<TResponse, TVariable> = UseQueryArgs<TVariable, TResponse>["query"];

export type LazyQueryResponse<TResponse, TVariable> = OperationResult<TResponse, TVariable> & { fetching: boolean };

export type LazyQueryCallbackFunction<TVariable> = (variables?: TVariable, context?: Partial<OperationContext>) => void;

export type LazyQueryHookResponse<TResponse, TVariable> = [
  LazyQueryResponse<TResponse, TVariable>,
  LazyQueryCallbackFunction<TVariable>,
];
