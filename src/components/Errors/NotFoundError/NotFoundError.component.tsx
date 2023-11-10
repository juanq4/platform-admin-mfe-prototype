import { Fallback, FallbackImage } from "@q4/nimbus-ui";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Email } from "../../../configurations/q4-platform-common.configuration";
import { isRoute } from "../../../utils/route/route.utils";
import {
  NotFoundErrorIdModel,
  noAccessErrorSubtitle,
  notExistErrorSubtitle,
  notFoundErrorTitle,
} from "./NotFoundError.definition";
import type { NotFoundErrorProps } from "./NotFoundError.definition";

export const NotFoundError = (props: NotFoundErrorProps): JSX.Element => {
  const { id } = props;

  const idModel = useMemo(() => new NotFoundErrorIdModel(id), [id]);
  const history = useHistory();
  const hasAccess = isRoute(history.location.pathname);

  return (
    <div id={idModel.id}>
      <Fallback
        email={Email.Support}
        image={hasAccess ? FallbackImage.Empty : FallbackImage.Fallback}
        placeholderContentProps={{
          title: notFoundErrorTitle,
          subtitle: hasAccess ? noAccessErrorSubtitle : notExistErrorSubtitle,
          actions: window.document.referrer ? [{ label: "Go Back", onClick: history.goBack }] : null,
        }}
      />
    </div>
  );
};
