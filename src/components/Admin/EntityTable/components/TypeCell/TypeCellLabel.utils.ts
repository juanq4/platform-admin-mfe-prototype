import { OrganizationType } from "@q4/platform-definitions";
import { TypeCellLabel } from "./TypeCell.definition";

export function getTypeCellLabelFromOrganizationType(type: OrganizationType | null): TypeCellLabel {
  switch (type) {
    case OrganizationType.AGENCY:
      return TypeCellLabel.Agency;
    case OrganizationType.ADMIN:
      return TypeCellLabel.Admin;
    case OrganizationType.CORP:
    default:
      return TypeCellLabel.Corporate;
  }
}
