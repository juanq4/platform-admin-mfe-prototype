import {
  ButtonIdModel,
  IdModelBase,
  isNullOrWhiteSpace,
  PlaceholderContentIdModel,
  SearchIdModel,
  ToolbarIdModel,
} from "@q4/nimbus-ui";
import type { BaseComponentProps, ButtonProps, PlaceholderContentProps, SearchProps, TableProps } from "@q4/nimbus-ui";
import type {
  ColDef,
  GetQuickFilterTextParams,
  ICellRendererParams,
  ValueFormatterParams,
} from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import { EntityTablePaginationIdModel } from "./components/Pagination/Pagination.definition";
import type {
  EntityTablePaginationProps,
  EntityTablePaginationDirection,
} from "./components/Pagination/Pagination.definition";

export enum EntityTableState {
  Table,
  Error,
  Placeholder,
}

export type EntityTableColumnDef<TEntity = Record<string, unknown>> = {
  field: keyof TEntity;
  headerName: string;
  sortable?: boolean;
  sort?: ColDef["sort"];
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  cellRenderer?: string;
  wrapText?: boolean;
  autoHeight?: boolean;
  flex?: number;
  headerCheckboxSelection?: boolean;
  checkboxSelection?: boolean;
  showDisabledCheckboxes?: boolean;
  valueFormatter?: (params: ValueFormatterParams | GetQuickFilterTextParams) => string;
  getQuickFilterText?: (params: ValueFormatterParams | GetQuickFilterTextParams) => string;
};

export interface EntityTableProps<TEntity, TPageRef = string[]> extends Pick<BaseComponentProps, "id"> {
  items: TEntity[];
  title?: string;
  error: Error;
  loading?: boolean;
  page?: EntityTablePaginationProps["page"];
  pageRefs?: TPageRef[];
  placeholderProps?: Partial<PlaceholderContentProps>;
  showToolbar?: boolean;
  searchProps?: Omit<SearchProps, "onClear">;
  tableProps?: Omit<TableProps, "rowData" | "className" | "loading" | "onGridReady">;
  toolbarActions?: ButtonProps[];
  onError: () => void;
  onPageChange?: (pageRef: TPageRef, page: number, direction: EntityTablePaginationDirection) => void;
}

export interface EntityTableCellPropsBase<T = unknown>
  extends Pick<BaseComponentProps, "id" | "key">,
    Partial<ICellRendererParams> {
  value: T;
}

export enum EntityTableClassName {
  Base = "entity-table",
  BaseWithLoadingModifier = "entity-table--loading",
  Title = "entity-table_title",
  Search = "entity-table_search",
  Toolbar = "entity-table_toolbar",
  ToolbarGroup = "entity-table_toolbar-group",
  ToolbarActions = "entity-table_toolbar-actions",
  Content = "entity-table_content",
  Placeholder = "entity-table_placeholder",
  Table = "entity-table_table",
  TableCell = "entity-table_table-cell",
  TableCellWithCenteredModifier = "entity-table_table-cell--centered",
  TableCellWithIconModifier = "entity-table_table-cell--icon",
}

export class EntityTableIdModel extends IdModelBase {
  error: PlaceholderContentIdModel;
  onError: ButtonIdModel;
  table: string;
  toolbar: ToolbarIdModel;
  pagination: EntityTablePaginationIdModel;
  placeholder: PlaceholderContentIdModel;
  search: SearchIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.error = new PlaceholderContentIdModel(null);
      this.onError = new ButtonIdModel(null);
      this.pagination = new EntityTablePaginationIdModel(null);
      this.toolbar = new ToolbarIdModel(null);
      this.placeholder = new PlaceholderContentIdModel(null);
      this.search = new SearchIdModel(null);

      return;
    }

    this.error = new PlaceholderContentIdModel(`${this.id}PlaceholderContent`);
    this.onError = new ButtonIdModel(`${this.error.id}OnErrorButton`);
    this.table = `${this.id}Table`;
    this.toolbar = new ToolbarIdModel(`${this.id}Toolbar`);
    this.pagination = new EntityTablePaginationIdModel(`${this.id}Pagination`);
    this.placeholder = new PlaceholderContentIdModel(`${this.id}Placeholder`);
    this.search = new SearchIdModel(`${this.id}Search`);
  }
}
