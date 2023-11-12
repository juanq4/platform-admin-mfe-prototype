import { Route } from "react-router-dom";
import { NotFoundError } from "../Errors/NotFoundError/NotFoundError.component";
import type { ConditionalRouteProps } from "./ConditionalRoute.definition";

export const ConditionalRoute = (props: ConditionalRouteProps): JSX.Element => {
  const { isExposed, ...rest } = props;

  if (!isExposed) return <NotFoundError />;

  return <Route {...rest} />;
};
