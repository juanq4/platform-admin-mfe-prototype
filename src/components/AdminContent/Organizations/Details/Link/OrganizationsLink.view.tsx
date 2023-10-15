import "./OrganizationsLink.view.scss";
import type { ChipsItemProps } from "@q4/nimbus-ui";
import {
  ButtonTheme,
  Field,
  Grid,
  GridColumn,
  Modal,
  useVisibility,
  SpinnerTheme,
  Text,
  Chips,
  isNullOrWhiteSpace,
  AsyncSelect,
  SelectPreset,
  isEmpty,
  InfoIcon,
  Origin,
  TooltipTheme,
} from "@q4/nimbus-ui";
import type { Organization } from "@q4/platform-definitions";
import { OrganizationType } from "@q4/platform-definitions";
import React, { memo, useMemo, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import type { LinkedOrganization, OrganizationLinkedOption } from "../../../../../definitions/organization.definition";
import { OrganizationEditState, OrganizationLinkedStatus } from "../../../../../definitions/organization.definition";
import { useLinkOrganizations } from "../../../../../hooks/_apollo/useOrganization/useOrganization.hook";
import { useManagedByAdminOrganization } from "../../../../../hooks/useManagedByAdminOrganization/useManagedByAdminOrganization.hook";
import { OrganizationsLinkMessage } from "../../../../../hooks/useOrganization/useOrganization.definition";
import { OrganizationsWithManagedByQuery } from "../../../../../hooks/useOrganization/useOrganization.hook";
import { useToastNotificationService } from "../../../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { useOrganizationQuery } from "../../../../../schemas/generated/graphql";
import { getOrganizationEditRoute } from "../../../../../utils/organization/organization.utils";
import { AdminLoadingSpinner } from "../../../../Admin/LoadingSpinner/LoadingSpinner.component";
import type { OrganizationsLinkParam } from "./OrganizationsLink.definition";
import {
  OrganizationLinkAdminWording,
  OrganizationLinkAgencyWording,
  OrganizationsLinkViewIdModel as ViewIdModel,
} from "./OrganizationsLink.definition";

const OrganizationsLinkBase = (): JSX.Element => {
  const [isVisible, handleCloseRequest] = useVisibility();
  const [linkedOrganizations, setLinkedOrganizations] = useState([]);

  const params = useParams<OrganizationsLinkParam>();

  const organizationId = useMemo(() => params.id, [params.id]);

  const pauseQuery = useRef(isNullOrWhiteSpace(organizationId));

  const [{ data, fetching: isLoadingGet }] = OrganizationsWithManagedByQuery({
    variables: { pageSize: 0, type: OrganizationType.CORP, active: true },
    pause: pauseQuery.current,
  });

  const corporateOrganizations = useMemo(() => {
    const organizations = data?.organizations?.items || [];
    // PLATFORM-2208: Exclude Q4 Inc. Corporate Org
    return organizations
      .filter((organization) => !organization.name.startsWith("Q4 Inc."))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data?.organizations]);

  const [{ fetching: isLoadingOrganization, data: currentOrganizationData }] = useOrganizationQuery({
    variables: { id: organizationId },
    pause: isNullOrWhiteSpace(organizationId),
  });

  const organization = useMemo(() => currentOrganizationData?.organization, [currentOrganizationData?.organization]);

  const [linkOrganizations, { loading: isLinkingOrganization, error }] = useLinkOrganizations();

  const isLoading = useMemo(() => isLoadingGet || isLoadingOrganization, [isLoadingGet, isLoadingOrganization]);

  const notifications = useToastNotificationService();

  const history = useHistory();

  const handleLinkOrganizations = (): void => {
    const managedOrganizationIds = linkedOrganizations.map((linkedOrganization) => linkedOrganization.id);

    linkOrganizations({
      variables: { linkOrganizationsId: organizationId, managedOrganizationIds },
    }).then(() => {
      if (error) {
        notifications.current.error(`${OrganizationsLinkMessage.Failed}: ${error.message}`);
        return;
      }
      notifications.current.success(OrganizationsLinkMessage.Success);
      history.push(getOrganizationEditRoute(organizationId));
    });
  };

  const handleExit = (): void => {
    history.push(getOrganizationEditRoute(organizationId));
  };

  const handleOrganizationLinkRemoval = (linkedOrgId: Organization["id"]) => {
    setLinkedOrganizations(linkedOrganizations.filter((linkedOrg) => linkedOrg.id !== linkedOrgId));
  };

  const handleChange = (selectedLinkedOrganizations: LinkedOrganization[]) => {
    setLinkedOrganizations(selectedLinkedOrganizations);
  };

  const getMappedChips = (): ChipsItemProps<Record<string, string>>[] => {
    return linkedOrganizations?.map((linkedOrganization) => {
      const corporateWithIdentifier = new OrganizationEditState(linkedOrganization);
      return {
        value: corporateWithIdentifier.id,
        label: [corporateWithIdentifier.name, corporateWithIdentifier.ticker].filter(Boolean).join(" | "),
      };
    });
  };

  const asyncOptions = useMemo(
    () =>
      corporateOrganizations.map((corporateOrganization: Organization) => {
        return {
          label: corporateOrganization.name,
          value: corporateOrganization.id,
          ...corporateOrganization,
        };
      }),
    [corporateOrganizations],
  );

  const filterOptions = (inputStr: string) => {
    if (isNullOrWhiteSpace(inputStr)) {
      return asyncOptions;
    }
    return asyncOptions.filter((i) => i.label && i.label.toLowerCase().includes(inputStr.toLowerCase()));
  };

  const loadOptions = (inputStr: string, callback: (options: Organization[]) => void): void => {
    setTimeout(() => {
      callback(filterOptions(inputStr));
    }, 1000);
  };

  const { adminOrganizations, isManagedByAdmin } = useManagedByAdminOrganization(organization);

  const isManagedByAgency = (organization: Organization) =>
    organization?.delegateOrganizationIds?.some(
      (org) => !adminOrganizations.some((adminOrg: Organization) => adminOrg.id === org),
    );

  const isOptionDisabled = (organizationItem: Organization) => {
    const isManagedByCurrentOrganization = organizationItem?.delegateOrganizationIds?.includes(organization.id);
    const orgIsAdminType = organization?.type === OrganizationType.ADMIN;

    return (isManagedByAgency(organizationItem) && !isManagedByAdmin && !orgIsAdminType) || isManagedByCurrentOrganization;
  };

  const linkedOrganizationLabel = (option: OrganizationLinkedOption) => {
    if (!isManagedByAgency(option) || isManagedByAdmin) {
      return;
    }

    return option.delegateOrganizationIds.includes(organizationId)
      ? OrganizationLinkedStatus.LINKED
      : OrganizationLinkedStatus.MANAGED;
  };

  const formatOptionLabel = (option: OrganizationLinkedOption) => {
    // TODO: update to Async v2 when ready
    if (isManagedByAgency(option)) {
      setTimeout(() => {
        document.querySelector(`[id^="option-${option.value}"]`)?.setAttribute("data-org-linked", "true");
      }, 500);
    }

    return (
      <div className="nui-select__custom-option">
        <div className="nui-select__custom-option-label">{option?.label}</div>
        <div className="nui-select__custom-option-status">{linkedOrganizationLabel(option)}</div>
      </div>
    );
  };

  return (
    <div id={ViewIdModel.id}>
      <Modal
        fullscreen
        scrollable
        id={ViewIdModel.modal.id}
        title="Link Organizations"
        className="organizations-link"
        badgeIcon="q4i-suitcase-cog-2pt"
        visible={!isVisible}
        focusOnProps={{
          autoFocus: false,
        }}
        footerActions={[
          {
            id: ViewIdModel.save.id,
            label: "Link Organizations",
            theme: ButtonTheme.Citrus,
            disabled: isLoading || isEmpty(linkedOrganizations),
            onClick: handleLinkOrganizations,
            loading: isLinkingOrganization,
          },
        ]}
        ghostableProps={{ onExited: handleExit }}
        onCloseRequest={handleCloseRequest}
      >
        <AdminLoadingSpinner loading={isLoading} theme={SpinnerTheme.Citrus} fixed />
        <Grid className="organizations-link_section organizations-link_section--padding">
          <GridColumn width="1-of-1">
            <Grid className="organizations-link_title">
              <Text>Link Organizations • {organization?.name}</Text>
            </Grid>
            <Grid>
              <Text>
                {organization?.type === OrganizationType.ADMIN
                  ? OrganizationLinkAdminWording
                  : OrganizationLinkAgencyWording}
              </Text>
            </Grid>
            <Grid className="organizations-link_field">
              <Field id={ViewIdModel.organizationsField.id} className="organizations-link_organizations" truncate={false}>
                <Text className="nui-field_label-text">
                  Select Organizations{" "}
                  {organization?.type === OrganizationType.AGENCY && (
                    <InfoIcon
                      tooltipProps={{
                        label: "Agency managed refers to organizations that have already been linked to another agency",
                        position: Origin.Top,
                        theme: TooltipTheme.Slate,
                      }}
                    />
                  )}
                </Text>
                <AsyncSelect
                  placeholder="Select"
                  id={ViewIdModel.organizations.id}
                  classNamePrefix="organization-link nui-select"
                  value={linkedOrganizations}
                  loading={isLoading}
                  preset={SelectPreset.Autocomplete}
                  onChange={handleChange}
                  loadOptions={loadOptions}
                  isMulti={true}
                  controlShouldRenderValue={false}
                  defaultOptions={asyncOptions}
                  hideSelectedOptions={false}
                  closeMenuOnSelect={false}
                  cacheOptions
                  isOptionDisabled={isOptionDisabled}
                  showMultiCheckboxes={true}
                  formatOptionLabel={formatOptionLabel}
                />
              </Field>
              <Chips onRemove={handleOrganizationLinkRemoval} items={getMappedChips()} inline={false} />
            </Grid>
          </GridColumn>
        </Grid>
      </Modal>
    </div>
  );
};

export const OrganizationsLink = memo(OrganizationsLinkBase);
