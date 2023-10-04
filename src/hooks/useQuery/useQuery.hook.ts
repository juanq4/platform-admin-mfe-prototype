import { isEmpty, isNil } from "@q4/nimbus-ui";
import { useCallback, useContext, useRef, useState } from "react";
import { useMutation as useMutationHook, Context as GraphqlContext } from "urql";
import type { OperationResult, UseMutationState } from "urql";
import type { EntityBase, EntityModel } from "../../definitions";
import type {
  MutationResponse,
  MutationHookModel,
  ApiResponse,
  LazyQueryProps,
  LazyQueryHookResponse,
  LazyQueryCallbackFunction,
} from "./useQuery.definition";

export const useMutation = <
  TEntity extends EntityBase,
  TResponse extends MutationResponse<TEntity>,
  TVariables extends TEntity,
  TModel extends EntityModel<TEntity>,
  TPayload extends TEntity,
>(
  mutation: string,
  key: string,
  errorMessage: string,
  successMessage: string,
  model: TModel,
  payloadMapper?: (variables: TVariables) => TPayload,
): [UseMutationState<TResponse, TVariables | TPayload>, MutationHookModel<TEntity, TVariables>] => {
  const create = useRef(mutation);
  const [result, onMutate] = useMutationHook<TResponse, TVariables | TPayload>(create.current);

  const handleMutation = useCallback<MutationHookModel<TEntity, TVariables>>(
    (variables, context) => {
      const isMapperValid = !isEmpty(payloadMapper) && typeof payloadMapper === "function";
      const sanitized = sanitizePayload(variables);
      const payload = isMapperValid ? payloadMapper(sanitized) : sanitized;

      return onMutate(payload, context).then((response) =>
        mapResponseToApiResponse(response, payload, key, errorMessage, successMessage, model),
      );
    },
    [errorMessage, key, model, successMessage, payloadMapper, onMutate],
  );

  return [result, handleMutation];
};

function mapResponseToApiResponse<
  TEntity extends EntityBase,
  TResponse extends MutationResponse<TEntity>,
  TVariables extends TEntity,
>(
  response: OperationResult<TResponse>,
  variables: TVariables,
  key: string,
  errorMessage: string,
  successMessage: string,
  model: EntityModel<TEntity>,
): ApiResponse<TEntity> {
  const data = response?.data?.[key];
  const error = response?.error;
  if (!isNil(error)) return { data, success: false, message: response?.error?.message ?? errorMessage };

  const organization = new model({ ...variables, ...data });
  return { data: organization, success: true, message: successMessage };
}

// TODO: Safely eliminate sanitizePayload.
// Sometimes you want to send null values to the server.
function sanitizePayload<T>(user: T): T {
  const { ...payload } = user;

  for (const k in payload) {
    if (payload[k] == null && k !== "q4SecurityId") {
      delete payload[k];
    }
  }
  return payload;
}

export const useLazyQuery = <TResponse, TVariable extends object>(
  query: LazyQueryProps<TResponse, TVariable>,
): LazyQueryHookResponse<TResponse, TVariable> => {
  const { query: graphqlQuery } = useContext(GraphqlContext);

  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<OperationResult<TResponse, TVariable>>(null);

  const queryCallback = useCallback<LazyQueryCallbackFunction<TVariable>>(
    (variables, context) => {
      if (isEmpty(query)) {
        console.error("No query provided when instancing useLazyQuery");
        return;
      }

      setFetching((current) => {
        if (current) return current;
        setFetching(true);

        graphqlQuery<TResponse, TVariable>(query, variables, context)
          .toPromise()
          .then((response) => {
            setData(response);
          })
          .finally(() => {
            setFetching(false);
          });
      });
    },
    [graphqlQuery, query],
  );

  return [{ ...data, fetching }, queryCallback];
};
