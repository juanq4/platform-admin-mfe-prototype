import { AccountErrorModal } from "./AccountErrorModal/AccountErrorModal.component";
import { AppError } from "./AppError/AppError.component";
import type { AppFallbackProps, AppFallbackType } from "./AppFallback.definition";
import { SubscriptionErrorModal } from "./SubscriptionErrorModal/SubscriptionErrorModal.component";

export const AppFallback = (props: AppFallbackProps): JSX.Element => {
  const appFallbackType = props.error?.message as AppFallbackType;

  switch (appFallbackType) {
    case "Account":
      return <AccountErrorModal />;
    case "Subscription":
      return <SubscriptionErrorModal />;
    default:
      return <AppError />;
  }
};
