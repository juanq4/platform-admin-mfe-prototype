import { Button, ButtonTheme, isEmpty, isNullOrWhiteSpace, useVisibility } from "@q4/nimbus-ui";
import { Permission } from "@q4/platform-definitions";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import UnlinkOrganizationIcon from "../../../assets/icons/unlinkOrganization.svg";
import { useAdminLoadingContext } from "../../../contexts/admin/loading/useLoadingContext.hook";
import { OrganizationEditState } from "../../../definitions/organization.definition";
import type { Organization } from "../../../definitions/organization.definition";
import { useUnlinkOrganizations } from "../../../hooks/_apollo/useOrganization/useOrganization.hook";
import { usePagination } from "../../../hooks/admin/usePagination/usePagination.hook";
import { useSearch } from "../../../hooks/admin/useSearch/useSearch.hook";
import { useClaims } from "../../../hooks/useClaims/useClaims.hook";
import type { OrganizationsQueryVariables } from "../../../hooks/useOrganization/useOrganization.definition";
import { OrganizationUnlinkMessage } from "../../../hooks/useOrganization/useOrganization.definition";
import { QueryPaginationDefault } from "../../../hooks/useQuery/useQuery.definition";
import { useToastNotificationService } from "../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { useOrganizationsLazyQuery } from "../../../schemas/generated/graphql";
import { getOrganizationEditLinkedOrganizationsRoute } from "../../../utils/organization/organization.utils";
import { AdminOrganizationsTableCellRenderer } from "../../AdminContent/Organizations/Organizations.definition";
import type { CopyCellProps } from "../EntityTable/components/CopyCell/CopyCell.definition";
import { mapIdToCopyCell } from "../EntityTable/components/CopyCell/CopyCell.utils";
import type { StatusCellProps } from "../EntityTable/components/StatusCell/StatusCell.definition";
import { mapIdToStatusCell } from "../EntityTable/components/StatusCell/StatusCell.utils";
import { UnlinkOrganizationModal } from "../Modals/UnlinkOrganizationConfirmationModal/UnlinkOrganizationConfirmationModal.component";
import { LinkedOrganizationTable } from "../Tables/linked-organizations/LinkedOrganizationsTable.component";
import { AdminUserTableCellRenderer } from "../Tables/user/AdminUserTable.definition";
import { OrganizationsIdModel } from "./LinkedOrganizations.definition";
import type { OrganizationsProps } from "./LinkedOrganizations.definition";

const isValidKey = (lastOrganization: OrganizationEditState): boolean => !isNullOrWhiteSpace(lastOrganization?.id);

const generateRef = (lastOrganization: OrganizationEditState): OrganizationsQueryVariables["page"] =>
  isValidKey(lastOrganization) ? [lastOrganization.id] : null;

const OrganizationsBase = (props: OrganizationsProps): JSX.Element => {
  const { id, organization } = props;
  const organizationId = organization?.id;
  const claims = useClaims();
  const history = useHistory();
  const idModel = useMemo(() => new OrganizationsIdModel(id), [id]);
  const [isVisible, handleModalOpen, handleModalClose] = useVisibility();
  const [selectedLinkedOrganization, setSelectedLinkedOrganization] = useState(null);

  const canManageLinkedOrgs = useMemo(() => claims.permissions.includes(Permission.ManageLinkedOrgs), [claims.permissions]);

  const onLinkedOrg = useCallback(() => {
    history.push(getOrganizationEditLinkedOrganizationsRoute(organizationId));
  }, [history, organizationId]);

  const pageState = useState<OrganizationsQueryVariables["page"]>(null);
  const [page] = pageState;

  const [organizationsResponse, handleOrganizationsQuery] = useOrganizationsLazyQuery();

  const linkedOrganizations = useMemo(
    () => organizationsResponse.data?.organizations?.items?.map((org) => new OrganizationEditState(org)) ?? [],
    [organizationsResponse.data],
  );

  const [isLoading] = useAdminLoadingContext(idModel.linkedOrganizationsTable.id, organizationsResponse.fetching);

  const {
    currentPage,
    pageRefs,
    handlePageChange: handlePageChangeBase,
    handleReset,
  } = usePagination({
    items: linkedOrganizations,
    pageSize: QueryPaginationDefault.PageSize,
    pageState,
    validKey: isValidKey,
    generateRef,
  });

  const handleQuery = useCallback(
    (updatedPage: string[], updatedTerm: string) => {
      handleOrganizationsQuery({
        variables: { page: updatedPage, searchTerm: updatedTerm, delegateOrganizationId: organizationId },
      });
    },
    [handleOrganizationsQuery, organizationId],
  );

  const { searchTerm, sanitizedSearchTerm, handlePageChange, handleSearchChange } = useSearch({
    page,
    handleReset,
    handlePageChangeBase,
    handleQuery,
  });

  const handleError = useCallback(() => {
    handleQuery(page, sanitizedSearchTerm);
  }, [page, sanitizedSearchTerm, handleQuery]);

  const showRemoveLinkedOrganizationModal = (selectedOrganization: Organization) => {
    setSelectedLinkedOrganization(selectedOrganization);
    handleModalOpen();
  };

  const notifications = useToastNotificationService();

  const [unlinkOrganizations, { error, loading: isUnlinkingOrganization }] = useUnlinkOrganizations();

  const handleRemoveLinkedOrganization = async (unlinkOrganization: Organization): Promise<void> => {
    if (isEmpty(unlinkOrganization)) return;

    try {
      await unlinkOrganizations({
        variables: { unlinkOrganizationId: unlinkOrganization?.id, delegateOrganizationId: organizationId },
      });

      if (error) {
        notifications.current.error(OrganizationUnlinkMessage.Failed);
        return;
      }

      notifications.current.success(OrganizationUnlinkMessage.Success);

      handleOrganizationsQuery({
        variables: { page, delegateOrganizationId: organizationId, searchTerm: searchTerm || undefined },
      });

      handleModalClose();
    } catch (err) {
      notifications.current.error(OrganizationUnlinkMessage.Failed);
    }
  };

  return (
    <div id={idModel.id}>
      <LinkedOrganizationTable
        id={idModel.linkedOrganizationsTable.id}
        error={organizationsResponse.error}
        onError={handleError}
        loading={isLoading}
        items={linkedOrganizations}
        page={currentPage}
        pageRefs={currentPage === 1 && linkedOrganizations.length < 10 ? undefined : pageRefs}
        onPageChange={handlePageChange}
        tableProps={{
          components: {
            [AdminUserTableCellRenderer.StatusCell]: (params: StatusCellProps) =>
              mapIdToStatusCell(params, idModel.statusCellList),
            [AdminUserTableCellRenderer.OrgIdCell]: (params: CopyCellProps) =>
              mapIdToCopyCell(params, idModel.orgIdCellList),
            [AdminOrganizationsTableCellRenderer.UnlinkOrganizationCell]: (params: { data: Organization }) => (
              <Button
                id={idModel.unlinkOrganizationButton.id}
                theme={ButtonTheme.Transparent}
                onClick={() => showRemoveLinkedOrganizationModal(params.data)}
                style={{ padding: 0 }}
                //TODO: All icons need to be added to nimbus-ui - then this can become an icon.
                label={<img src={UnlinkOrganizationIcon} />}
                disabled={!canManageLinkedOrgs}
              />
            ),
          },
        }}
        searchProps={{
          value: searchTerm,
          onInputChange: handleSearchChange,
        }}
        toolbarActions={[
          ...(canManageLinkedOrgs
            ? [{ id: idModel.linkOrganizations.id, icon: "q4i-add-4pt", label: "Link Organizations", onClick: onLinkedOrg }]
            : []),
        ]}
      />

      <UnlinkOrganizationModal
        id={idModel.unlinkOrganizationModal.id}
        linkedOrganization={selectedLinkedOrganization}
        agencyOrganization={organization}
        isModalVisible={isVisible}
        onModalClose={handleModalClose}
        onRemoveClick={handleRemoveLinkedOrganization}
        onCancelClick={handleModalClose}
        isUnlinkingOrganization={isUnlinkingOrganization}
      />
    </div>
  );
};

export const LinkedOrganizations = memo(OrganizationsBase);
