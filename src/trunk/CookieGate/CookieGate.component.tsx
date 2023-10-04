import type { PropsWithChildren } from "react";
import { Fragment } from "react";
import { cookieErrorMessage } from "./CookieGate.definition";

export const CookieGate = (props: PropsWithChildren): JSX.Element => {
  const isCookieEnabled = navigator.cookieEnabled;

  if (!isCookieEnabled) {
    return <div>{cookieErrorMessage}</div>;
  }

  return <Fragment {...props} />;
};
