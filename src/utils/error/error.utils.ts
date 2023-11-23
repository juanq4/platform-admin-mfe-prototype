import { ErrorModel, isEmpty } from "@q4/nimbus-ui";
import type { ErrorHandlerMessage } from "@q4/nimbus-ui";

export function mapErrorsToKey<TError, TKey, TEntity>(acc: TError, x: ErrorHandlerMessage<TKey, TEntity>): TError {
  return isEmpty(x)
    ? acc
    : {
        ...acc,
        [x.prop]: new ErrorModel(x.message, x.visible),
      };
}
