import "./FeatureManagement.component.scss";
import { ButtonSize, getClassName, isNullOrWhiteSpace, Swapable, ToggleButtons, ToggleButtonsTheme } from "@q4/nimbus-ui";
import type { ToggleButtonsProps } from "@q4/nimbus-ui";
import type { Organization } from "@q4/platform-definitions";
import { OrganizationType, Permission } from "@q4/platform-definitions";
import type { KeyboardEvent, MouseEvent } from "react";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FeatureFlag } from "../../../configurations/feature.configuration";
import { useClaims } from "../../../hooks/useClaims/useClaims.hook";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags/useFeatureFlags.hook";
import { useManagedByAdminOrganization } from "../../../hooks/useManagedByAdminOrganization/useManagedByAdminOrganization.hook";
import { Entitlements } from "../Entitlements/Entitlements.component";
import { LinkedOrganizations } from "../LinkedOrganizations/LinkedOrganizations.component";
import { OrganizationTeams } from "../Teams/Teams.component";
import { OrganizationUsers } from "../Users/Users.component";
import type { ToggleButtonState, OrganizationFeatureManagementProps } from "./FeatureManagement.definition";
import {
  OrganizationFeatureManagementClassName,
  OrganizationFeatureManagementIdModel,
  OrganizationFeatureManagementLanguage,
  OrganizationFeatureManagementSection,
} from "./FeatureManagement.definition";
import { FeatureHeadContainer } from "./FeatureManagement.style";
import { ManagedLink } from "./ManagedLink/ManagedLink.component";

const OrganizationFeatureManagementBase = (props: OrganizationFeatureManagementProps): JSX.Element => {
  const {
    id,
    organization,
    sectionClassName,
    sitesByOrgResp,
    getSitesByOrg,
    onOrgSubdomainChange,
    onEntitlementAdd,
    onEntitlementRemove,
    onCreateUser,
    onCreateTeam,
  } = props;

  const claims = useClaims();
  const features = useFeatureFlags();

  const idModel = useMemo(() => new OrganizationFeatureManagementIdModel(id), [id]);
  const initialToggleState: ToggleButtonState = useMemo(
    () => ({ index: OrganizationFeatureManagementSection.Entitlements, id: idModel.entitlementToggle.id }),
    [idModel],
  );
  const [section, setSection] = useState<ToggleButtonState>(initialToggleState);
  const organizationId = useMemo(() => organization?.id, [organization?.id]);

  const canReadLinkedOrgs = useMemo(
    () =>
      claims.permissions.some(
        (permission) => permission === Permission.ManageLinkedOrgs || permission === Permission.ReadLinkedOrgs,
      ),
    [claims.permissions],
  );

  const orgIsAdminType = organization?.type === OrganizationType.ADMIN;
  const orgIsAgencyType = organization?.type === OrganizationType.AGENCY;
  const orgIsCorpType = organization?.type === OrganizationType.CORP;
  const teamsFeatureEnabled = features[FeatureFlag.AgencyTeams];

  const shouldShowTeamsTab = useMemo(
    () => (orgIsAgencyType && teamsFeatureEnabled) || orgIsAdminType,
    [orgIsAgencyType, teamsFeatureEnabled, orgIsAdminType],
  );
  const shouldShowEntitlementsTab = orgIsCorpType;
  const shouldShowLinkedOrganizationsTab = useMemo(
    () => (orgIsAgencyType && canReadLinkedOrgs) || orgIsAdminType,
    [orgIsAgencyType, canReadLinkedOrgs, orgIsAdminType],
  );

  const getSectionClassName = useCallback(
    (className: string) => {
      return getClassName(className, [
        { condition: isNullOrWhiteSpace(sectionClassName), falseClassName: sectionClassName },
      ]);
    },
    [sectionClassName],
  );

  const toggleClassName = useMemo(
    () => getSectionClassName(OrganizationFeatureManagementClassName.Toggle),
    [getSectionClassName],
  );

  const toggleButtonItems = useMemo(() => {
    const items = [
      {
        key: idModel.entitlementToggle.id,
        id: idModel.entitlementToggle.id,
        label: OrganizationFeatureManagementLanguage.Entitlements,
        dependency: shouldShowEntitlementsTab,
      },
      {
        key: idModel.userToggle.id,
        id: idModel.userToggle.id,
        label: OrganizationFeatureManagementLanguage.Users,
        dependency: true,
      },
      {
        key: idModel.teamsToggle.id,
        id: idModel.teamsToggle.id,
        label: OrganizationFeatureManagementLanguage.Teams,
        dependency: shouldShowTeamsTab,
      },
      {
        key: idModel.linkedOrganizationsToggle.id,
        id: idModel.linkedOrganizationsToggle.id,
        label: OrganizationFeatureManagementLanguage.LinkedOrganizations,
        dependency: shouldShowLinkedOrganizationsTab,
      },
    ]
      .filter((item) => !!item.dependency)
      .map(({ dependency, ...rest }) => rest);

    return items as ToggleButtonsProps["items"];
  }, [idModel, shouldShowLinkedOrganizationsTab, shouldShowEntitlementsTab, shouldShowTeamsTab]);

  useEffect(() => {
    if (orgIsAgencyType && !teamsFeatureEnabled && section.id === idModel.teamsToggle.id) setSection(initialToggleState);
  }, [idModel, orgIsAgencyType, teamsFeatureEnabled, toggleButtonItems, section, initialToggleState]);

  function handleTabChange(index: number, event: MouseEvent | KeyboardEvent): void {
    setSection({ index, id: event.currentTarget.id });
  }

  const { adminOrganizations, adminOrganizationsLoading } = useManagedByAdminOrganization(organization);

  const managedByAgencyId = useMemo(
    () =>
      organization?.delegateOrganizationIds?.find(
        (organizationId) => !adminOrganizations?.some((adminOrg: Organization) => adminOrg.id === organizationId),
      ),
    [adminOrganizations, organization.delegateOrganizationIds],
  );

  return (
    <div id={idModel.id} className={OrganizationFeatureManagementClassName.Base}>
      <FeatureHeadContainer>
        <ToggleButtons
          className={toggleClassName}
          id={idModel.sectionToggle.id}
          selected={section.index}
          items={toggleButtonItems}
          size={ButtonSize.Small}
          theme={ToggleButtonsTheme.White}
          onChange={handleTabChange}
        />
        {orgIsCorpType && canReadLinkedOrgs && managedByAgencyId && !adminOrganizationsLoading && (
          <ManagedLink managedByOrganizationId={managedByAgencyId} id={idModel.managedLink.id} />
        )}
      </FeatureHeadContainer>
      <Swapable
        selected={section.index}
        layers={[
          ...(shouldShowEntitlementsTab
            ? [
                <Entitlements
                  key={idModel.entitlements.id}
                  id={idModel.entitlements.id}
                  organizationId={organization?.id}
                  entitlements={organization?.entitlements}
                  sitesByOrgResp={sitesByOrgResp}
                  getSitesByOrg={getSitesByOrg}
                  orgSubdomain={organization?.studio?.subdomain}
                  onOrgSubdomainChange={onOrgSubdomainChange}
                  onAdd={onEntitlementAdd}
                  onRemove={onEntitlementRemove}
                />,
              ]
            : []),
          <OrganizationUsers
            id={idModel.users.id}
            key={idModel.users.id}
            organizationId={organizationId}
            onCreateUser={onCreateUser}
          />,
          ...(shouldShowTeamsTab
            ? [
                <OrganizationTeams
                  id={idModel.teams.id}
                  key={idModel.teams.id}
                  organizationId={organizationId}
                  onCreateTeam={onCreateTeam}
                />,
              ]
            : []),
          <LinkedOrganizations id={idModel.organizations.id} key={idModel.organizations.id} organization={organization} />,
        ]}
      />
    </div>
  );
};

export const OrganizationFeatureManagement = memo(OrganizationFeatureManagementBase);
