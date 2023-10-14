import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { BaseComponentProps } from "@q4/nimbus-ui";

export const notFoundErrorTitle = "Oops! Page not found.";

export const noAccessErrorSubtitle = "The page you are trying to access cannot be loaded.";

export const notExistErrorSubtitle =
  "It looks like the page you are looking for doesn't exist. Try going back to the previous page, or contact us for more information.";

export type NotFoundErrorProps = Pick<BaseComponentProps, "id">;

export class NotFoundErrorIdModel extends IdModelBase {
  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);
    if (isNullOrWhiteSpace(this.id)) return;
  }
}
