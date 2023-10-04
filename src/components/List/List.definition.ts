import type { ReactNode } from "react";

export interface ListProps<T> extends React.ComponentPropsWithoutRef<"ul"> {
  header?: ReactNode;
  dataSource?: T[];
  rowKey?: ((item: T) => React.Key) | keyof T;
  hasKeyLine?: boolean;
  footer?: React.ReactNode;
  renderItem?: (item: T, index: number) => React.ReactNode;
}
