import { Pagination, Table, Toolbar, ToolbarTheme, typedMemo } from "@q4/nimbus-ui";
import { useMemo } from "react";
import { EntityTableClassName } from "../EntityTable/EntityTable.definition";
import type { EntityTableV2Props } from "./EntityTableV2.definition";
import { PaginationContainer, ToolbarGroupContainer } from "./EntityTableV2.style";

const EntityTableV2Base = (props: EntityTableV2Props): JSX.Element => {
  const {
    id,
    tableProps,
    totalPages,
    totalItems,
    currentPage,
    loading,
    showError,
    toolbarComponent,
    emptyStateComponent,
    errorStateComponent,
    handlePageChange,
  } = props;

  const isEmpty = useMemo(() => !tableProps.loading && totalItems < 1, [tableProps.loading, totalItems]);
  const showEmpty = useMemo(() => !showError && isEmpty, [isEmpty, showError]);
  const showTable = useMemo(() => !showError && !isEmpty && !tableProps.loading, [isEmpty, showError, tableProps.loading]);

  return (
    <>
      <Toolbar theme={ToolbarTheme.Q4Blue}>
        <ToolbarGroupContainer>{toolbarComponent}</ToolbarGroupContainer>
      </Toolbar>
      {showError && errorStateComponent}
      {showEmpty && emptyStateComponent}
      <div style={{ visibility: showTable ? "visible" : "hidden", opacity: loading ? 0.5 : 1 }}>
        <Table
          id={id}
          className={EntityTableClassName.Table}
          defaultColDef={{
            lockPosition: true,
            suppressMovable: true,
          }}
          domLayout="autoHeight"
          {...tableProps}
        />
        <PaginationContainer>
          <Pagination pageCount={totalPages} onPageChange={handlePageChange} forcePageSize={10} forcePage={currentPage} />
        </PaginationContainer>
      </div>
    </>
  );
};

export const EntityTableV2 = typedMemo(EntityTableV2Base);
