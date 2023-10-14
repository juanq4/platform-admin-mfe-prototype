import type { OrganizationEditState, OrganizationStockInfo } from "../../../../../definitions";

export interface StockTickerProps {
  initValue: OrganizationEditState;
  disabled: boolean;
  onChange: (value: OrganizationStockInfo) => void;
}
