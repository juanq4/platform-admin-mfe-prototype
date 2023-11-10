import { isEmpty, CheckboxTheme, RadioButton } from "@q4/nimbus-ui";
import { memo, useMemo, useRef } from "react";
import { EntityTable } from "../../EntityTable/EntityTable.component";
import type { EntityTableColumnDef, EntityTableCellPropsBase } from "../../EntityTable/EntityTable.definition";
import type { AdminStudioSitesTableProps, AdminStudioSitesViewModel } from "./AdminStudioSitesTable.definition";
import { AdminStudioSitesTableIdModel, AdminStudioSitesTableNoDataText } from "./AdminStudioSitesTable.definition";

const StudioSitesTable = (props: AdminStudioSitesTableProps): JSX.Element => {
  const {
    id,
    sitesByOrgResp,
    tableProps: additionalTableProps = {},
    orgSubdomain,
    onOrgSubdomainChange,
    ...remainingProps
  } = props;

  const {
    columnDefs: additionalColumnDefs = [],
    components: remainingFrameworkComponents = {},
    ...remainingTableProps
  } = additionalTableProps;

  const idModel = useMemo(() => new AdminStudioSitesTableIdModel(id), [id]);

  const columnDefs = useRef<EntityTableColumnDef<AdminStudioSitesViewModel>[]>([
    {
      field: "siteName",
      headerName: "Site Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "orgSubdomain",
      headerName: "Primary",
      maxWidth: 100,
      minWidth: 100,
      cellRenderer: "PrimarySubdomainCellRenderer",
    },
    {
      field: "projectKey",
      headerName: "Project Key",
      maxWidth: 150,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      maxWidth: 150,
      minWidth: 150,
    },
  ]);

  function handlePrimaryCellChange(_checked: boolean, value: string) {
    onOrgSubdomainChange(value);
  }

  function renderPrimarySubdomainCell(params: EntityTableCellPropsBase<string>) {
    const { projectKey: subdomain, orgSubdomain: organizationSubdomain } = params?.data || {};
    const radioId = idModel.primaryCellListId.getId(subdomain);

    return (
      <RadioButton
        id={radioId}
        name="primary-radio"
        value={subdomain}
        checked={subdomain === organizationSubdomain}
        checkboxTheme={CheckboxTheme.Steel}
        onChange={handlePrimaryCellChange}
      />
    );
  }

  const sitesItems: AdminStudioSitesViewModel[] = useMemo(
    () =>
      sitesByOrgResp?.data?.organizationSites?.items?.map((s) => ({
        siteName: s.siteName,
        orgSubdomain,
        projectKey: s.subdomain,
        status: "Active",
      })),
    [sitesByOrgResp, orgSubdomain],
  );

  const sitesError = useMemo(
    () => (isEmpty(sitesByOrgResp?.error) ? null : new Error("Error loading sites")),
    [sitesByOrgResp],
  );

  return (
    <EntityTable
      id={idModel.id}
      showToolbar={false}
      tableProps={{
        columnDefs: [...columnDefs.current, ...additionalColumnDefs],
        components: {
          PrimarySubdomainCellRenderer: renderPrimarySubdomainCell,
          ...remainingFrameworkComponents,
        },
        overlayNoRowsTemplate: AdminStudioSitesTableNoDataText,
        ...remainingTableProps,
      }}
      loading={sitesByOrgResp?.fetching}
      items={sitesItems}
      error={sitesError}
      {...remainingProps}
    />
  );
};

export const AdminStudioSitesTable = memo(StudioSitesTable);
