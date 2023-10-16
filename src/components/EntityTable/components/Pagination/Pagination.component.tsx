import "./Pagination.scss";
import { Button, ButtonTheme } from "@q4/nimbus-ui";
import React, { memo, useMemo } from "react";
import {
  EntityTablePaginationClassName,
  EntityTablePaginationDefault,
  EntityTablePaginationDirection,
  EntityTablePaginationIdModel,
  EntityTablePaginationLabels,
} from "./Pagination.definition";
import type { EntityTablePaginationProps } from "./Pagination.definition";

const Pagination = (props: EntityTablePaginationProps): JSX.Element => {
  const { id, disabled: disabledProp, page: pageProp, pageCount: pageCountProps, onPageChange } = props;

  const idModel = useMemo(() => new EntityTablePaginationIdModel(id), [id]);
  const page = useMemo(() => pageProp ?? 0, [pageProp]);
  const pageCount = useMemo(() => pageCountProps ?? 0, [pageCountProps]);
  const disabled = useMemo(() => !!disabledProp, [disabledProp]);

  function handleNext(): void {
    const updated = Math.min(page + 1, pageCount);
    onPageChange(updated, EntityTablePaginationDirection.Next);
  }

  function handlePrevious(): void {
    const updated = Math.max(page - 1, 0);
    onPageChange(updated, EntityTablePaginationDirection.Previous);
  }

  return (
    <div id={idModel.id} className={EntityTablePaginationClassName.Base}>
      <Button
        id={idModel.previous.id}
        className={EntityTablePaginationClassName.Button}
        icon="q4i-arrow-left-4pt"
        theme={ButtonTheme.LightGrey}
        label={EntityTablePaginationLabels.Previous}
        disabled={page === EntityTablePaginationDefault.InitialPage || disabled}
        onClick={handlePrevious}
      />
      <Button
        id={idModel.next.id}
        className={`${EntityTablePaginationClassName.Button} ${EntityTablePaginationClassName.ButtonWithLeftIconModifier}`}
        theme={ButtonTheme.LightGrey}
        disabled={page === pageCount || disabled}
        label={
          <span>
            <span className={EntityTablePaginationClassName.ButtonLabel}>{EntityTablePaginationLabels.Next}</span>
            <span className={`${EntityTablePaginationClassName.ButtonIcon} q4i-arrow-right-4pt`} />
          </span>
        }
        onClick={handleNext}
      />
    </div>
  );
};

export const EntityTablePagination = memo(Pagination);
