import { isNullOrWhiteSpace, RadioButtonListId } from "@q4/nimbus-ui";
import type { OrganizationStudioDetails } from "../../../../definitions";
import type { LazyQueryResponse, SitesByOrganizationResponse, SitesByOrgQueryVariables } from "../../../../hooks";
import type { EntityTableProps } from "../../EntityTable";
import { EntityTableIdModel } from "../../EntityTable/EntityTable.definition";

export interface AdminStudioSitesViewModel {
  siteName: string;
  orgSubdomain: string;
  projectKey: string;
  status: string;
}

export class AdminStudioSitesTableIdModel extends EntityTableIdModel {
  primaryCellListId: RadioButtonListId;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.primaryCellListId = new RadioButtonListId(null);
    }

    this.primaryCellListId = new RadioButtonListId(this.id);
  }
}

export interface AdminStudioSitesTableProps extends Omit<EntityTableProps<AdminStudioSitesViewModel>, "items" | "error"> {
  orgSubdomain: OrganizationStudioDetails["subdomain"];
  onOrgSubdomainChange: (value: string) => void;
  sitesByOrgResp: LazyQueryResponse<SitesByOrganizationResponse, SitesByOrgQueryVariables>;
}

export const AdminStudioSitesTableNoDataText =
  "Missing a site? It may not be linked to this organization yet. Copy the organization ID and link it from Studio CMS.";
