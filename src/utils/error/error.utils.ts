import { ErrorModel, isEmpty } from "@q4/nimbus-ui";
import type { ErrorHandlerMessage } from "@q4/nimbus-ui";
import type { AppFallbackType } from "../../components/Errors/AppFallback.definition";

export function mapErrorsToKey<TError, TKey, TEntity>(acc: TError, x: ErrorHandlerMessage<TKey, TEntity>): TError {
  return isEmpty(x)
    ? acc
    : {
        ...acc,
        [x.prop]: new ErrorModel(x.message, x.visible),
      };
}
export function throwError(type: AppFallbackType, cause: Error): void {
  throw new Error(type, { cause });
}
