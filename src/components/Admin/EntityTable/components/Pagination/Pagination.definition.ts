import type { BaseComponentProps } from "@q4/nimbus-ui";
import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";

export const EntityTablePaginationDefault = {
  InitialPage: 1,
};

export enum EntityTablePaginationDirection {
  Next,
  Previous,
}

export enum EntityTablePaginationLabels {
  Next = "Next",
  Previous = "Previous",
}

export interface EntityTablePaginationProps extends Pick<BaseComponentProps, "id" | "key"> {
  disabled?: boolean;
  page: number;
  pageCount: number;
  onPageChange: (page: number, direction: EntityTablePaginationDirection) => void;
}

export enum EntityTablePaginationClassName {
  Base = "entity-table-pagination",
  Button = "entity-table-pagination_button",
  ButtonLabel = "entity-table-pagination_button-label",
  ButtonIcon = "entity-table-pagination_button-icon",
  ButtonWithLeftIconModifier = "entity-table-pagination_button--left-icon",
}

export class EntityTablePaginationIdModel extends IdModelBase {
  next: ButtonIdModel;
  previous: ButtonIdModel;

  constructor(id: string) {
    super(id);
    if (isNullOrWhiteSpace(this.id)) {
      this.next = new ButtonIdModel(null);
      this.previous = new ButtonIdModel(null);
    }

    this.next = new ButtonIdModel(`${this.id}NextButton`);
    this.previous = new ButtonIdModel(`${this.id}PreviousButton`);
  }
}
