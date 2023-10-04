import { isNil } from "@q4/nimbus-ui";
import { QueryPaginationDefault } from "./useQuery.definition";

export function getDefaultPageSize(pageSize: number): number {
  const defaultPageSize = QueryPaginationDefault.PageSize;
  if (isNil(pageSize)) return defaultPageSize;

  return Math.min(pageSize, defaultPageSize);
}
