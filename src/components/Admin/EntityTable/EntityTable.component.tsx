import "./EntityTable.component.scss";
import type { ButtonProps } from "@q4/nimbus-ui";
import {
  Search,
  Button,
  Collapsable,
  Ghostable,
  Swapable,
  Table,
  Text,
  TextPreset,
  Toolbar,
  ToolbarGroup,
  ToolbarTheme,
  isEmpty,
  PlaceholderContent,
  typedMemo,
  getClassName,
  isNil,
} from "@q4/nimbus-ui";
import { Environment } from "@q4/platform-sdk-definitions";
import { useMemo, useRef } from "react";
import { env } from "../../../../config/env/env";
import ErrorImage from "../../../assets/admin/adminError.svg";
import { useTable } from "../../../hooks/admin";
import { EntityTableClassName, EntityTableIdModel, EntityTableState } from "./EntityTable.definition";
import type { EntityTableProps } from "./EntityTable.definition";
import type { EntityTablePaginationDirection } from "./components/";
import { EntityTablePagination, EntityTablePaginationDefault } from "./components/";

const { InitialPage } = EntityTablePaginationDefault;

const EntityTableBase = <TEntity, TPageRef>(props: EntityTableProps<TEntity, TPageRef>): JSX.Element => {
  const {
    id,
    items,
    loading: loadingProp,
    error,
    page,
    pageRefs,
    placeholderProps,
    showToolbar: showToolbarProps,
    searchProps,
    tableProps,
    title,
    toolbarActions,
    onError,
    onPageChange,
  } = props;
  const loading = useMemo(() => !!loadingProp, [loadingProp]);
  const idModel = useMemo(() => new EntityTableIdModel(id), [id]);
  const baseClassName = useMemo(
    () =>
      getClassName(EntityTableClassName.Base, [
        { condition: loading, trueClassName: EntityTableClassName.BaseWithLoadingModifier },
      ]),
    [loading],
  );
  const showError = useMemo(() => !!error, [error]);
  const showToolbar = useMemo(() => showToolbarProps ?? true, [showToolbarProps]);
  const currentState = useMemo(getCurrentState, [error, items, loading, pageRefs, placeholderProps, showError]);

  const defaultColDef = useRef({
    lockPosition: true,
    suppressMovable: true,
  });

  const { handleGridReady } = useTable();

  function handlePageChange(updatedPage: number, direction: EntityTablePaginationDirection): void {
    /*
     * When Getting Paginated Data
     *
     * Page 1 requires no page reference and should be "undefined" and every other page requires an id and organization id.
     * So I decided to make the initial value of pageRefs "null" instead of "[null]".  So the first element in the pageRefs
     * is actually page 2 and that is why we need to minus 2 instead of 1.
     */
    const pageRefInitialPage = InitialPage + 1;
    const pageRef = pageRefs[updatedPage - pageRefInitialPage];
    onPageChange?.(pageRef, updatedPage, direction);
  }

  function getCurrentState(): number {
    const showPlaceholder = !loading && isNil(error) && isEmpty(items) && isEmpty(pageRefs) && !isEmpty(placeholderProps);
    if (showPlaceholder) return EntityTableState.Placeholder;
    if (showError) return EntityTableState.Error;
    return EntityTableState.Table;
  }

  function renderPlaceholder(): JSX.Element[] {
    if (isEmpty(placeholderProps)) return null;

    return [
      <PlaceholderContent
        key="entity-table-placeholder_content"
        id={idModel.placeholder.id}
        title={null}
        {...placeholderProps}
      />,
    ];
  }

  function renderTable(): JSX.Element {
    // disable virtualization for testing
    const suppressColumnVirtualisation = env.appEnv === Environment.Test;
    const pageCount = isNil(pageRefs?.length) ? 0 : pageRefs.length + InitialPage;

    return (
      <div className={EntityTableClassName.Content}>
        <Table
          id={idModel.table}
          domLayout="autoHeight"
          className={EntityTableClassName.Table}
          defaultColDef={defaultColDef.current}
          rowData={items}
          cacheQuickFilter
          suppressColumnVirtualisation={suppressColumnVirtualisation}
          onGridReady={handleGridReady}
          {...tableProps}
        />
        <Collapsable collapsed={isEmpty(pageRefs)}>
          <EntityTablePagination
            id={idModel.pagination.id}
            disabled={loading}
            page={page}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </Collapsable>
      </div>
    );
  }

  function renderError(): JSX.Element {
    return (
      <PlaceholderContent
        id={idModel.error.id}
        image={ErrorImage}
        title="Failed To Load Data"
        subtitle="Please click refresh to try again."
        actions={[
          {
            id: idModel.onError.id,
            label: "REFRESH",
            loading,
            onClick: onError,
          },
        ]}
      />
    );
  }

  function renderToolbarAction(buttonProps: ButtonProps, idx: number): JSX.Element {
    const { key: keyProp, disabled: disabledProps, ...rest } = buttonProps;
    const disabled = !!disabledProps;
    const defaultKey = `${idModel.id || "entity-table_"}${idx}`;
    const key = isNil(keyProp) ? defaultKey : keyProp;

    return <Button key={key} disabled={disabled || loading} {...rest} />;
  }

  return (
    <div id={idModel.id} className={baseClassName}>
      <Collapsable ghostableProps={{ appear: false }} collapsed={!showToolbar}>
        <Toolbar id={idModel.toolbar.id} className={EntityTableClassName.Toolbar} theme={ToolbarTheme.Q4Blue}>
          <ToolbarGroup className={EntityTableClassName.ToolbarGroup}>
            <Text className={EntityTableClassName.Title} preset={TextPreset.Title}>
              {title}
            </Text>
            <div className={EntityTableClassName.ToolbarActions}>{toolbarActions?.map(renderToolbarAction)}</div>
            <Ghostable appear={false} ghosted={isEmpty(searchProps)}>
              <div className={EntityTableClassName.Search}>
                <Search id={idModel.search.id} {...searchProps} />
              </div>
            </Ghostable>
          </ToolbarGroup>
        </Toolbar>
      </Collapsable>
      <Swapable selected={currentState} layers={[renderTable(), renderError(), renderPlaceholder()]} />
    </div>
  );
};

export const EntityTable = typedMemo(EntityTableBase);
