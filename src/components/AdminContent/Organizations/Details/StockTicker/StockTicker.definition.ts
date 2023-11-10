import type { OrganizationEditState, OrganizationStockInfo } from "../../../../../definitions/organization.definition";

export interface StockTickerProps {
  initValue: OrganizationEditState;
  disabled: boolean;
  onChange: (value: OrganizationStockInfo) => void;
}
