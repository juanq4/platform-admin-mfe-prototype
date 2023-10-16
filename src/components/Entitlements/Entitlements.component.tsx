import "./Entitlements.scss";
import type { SwapableProps } from "@q4/nimbus-ui";
import {
  Button,
  ButtonTheme,
  Message,
  PopoverMenu,
  PopoverMenuSize,
  PopoverMenuTheme,
  Swapable,
  Tabs,
  Toolbar,
  useVisibility,
} from "@q4/nimbus-ui";
import { Entitlement as EntitlementConstant } from "@q4/platform-definitions";
import { camelCase, startCase } from "lodash";
import type { ReactNode } from "react";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import type { CamelCaseEntitlement } from "../../configurations/entitlement.configuration";
import { EntitlementLabel } from "../../configurations/entitlement.configuration";
import { FeatureFlag } from "../../configurations/feature.configuration";
// // import { useClaims } from "../../hooks/useClaims/useClaims.hook";
import { useFeatureFlags } from "../../hooks/useFeatureFlags/useFeatureFlags.hook";
import { isEngagementAnalyticsEntitlement, getDefaultEntitlementSelection } from "../../utils/entitlement/entitlement.utils";
import { getOrganizationDetailsMode } from "../../utils/organization/organization.utils";
import { OrganizationDetailsMode } from "../AdminContent/Organizations/Details/OrganizationDetails.definition";
import { AdminStudioSitesTable } from "../Tables/sites/AdminStudioSitesTable.component";
import { EngagementAnalyticsTierSelectorComponent } from "./EngagementAnalyticsTierSelector/EngagementAnalyticsTierSelector.component";
import type { EntitlementsProps, Entitlement } from "./Entitlements.definition";
import { EntitlementsClassName, EntitlementsIdModel, BaseEntitlementKeys } from "./Entitlements.definition";

const EntitlementsBase = (props: EntitlementsProps): JSX.Element => {
  const {
    id,
    organizationId,
    entitlements,
    orgSubdomain,
    sitesByOrgResp,
    onOrgSubdomainChange,
    onAdd,
    onRemove,
    getSitesByOrg,
  } = props;

  const [selectedEntitlement, setSelectedEntitlement] = useState(0);

  const entitlementToRemove = useRef<Entitlement>(null);

  const [menuVisible, handleMenuShow, handleMenuHide] = useVisibility();
  const [messageVisible, handleMessageShow, handleMessageHide] = useVisibility();
  const claims = useClaims();
  const flags = useFeatureFlags();

  const idModel = useMemo(() => new EntitlementsIdModel(id), [id]);

  const handleMenuClick = useCallback(
    (entitlement: Entitlement) => {
      onAdd(entitlement);
      handleMenuHide();
    },
    [onAdd, handleMenuHide],
  );

  function handleRemoveEntitlement(entitlement: Entitlement) {
    onRemove(entitlement);
    handleMessageHide();
  }

  const handleRemoveEntitlementClick = useCallback(
    (entitlement: Entitlement) => {
      entitlementToRemove.current = entitlement;
      handleMessageShow();
    },
    [handleMessageShow],
  );

  const handleEngagementAnalyticsTierSelection = useCallback(
    (tier: string) => {
      entitlements.forEach(
        (currentEntitlementTier) =>
          isEngagementAnalyticsEntitlement(currentEntitlementTier) && onRemove(currentEntitlementTier),
      );

      onAdd(tier);
    },
    [entitlements, onAdd, onRemove],
  );

  const tabs = useMemo(
    () =>
      entitlements?.sort().map((entitlement) => {
        const baseEntitlement = isEngagementAnalyticsEntitlement(entitlement)
          ? EntitlementConstant.EngagementAnalytics
          : entitlement;
        const camelCaseEntitlement = camelCase(baseEntitlement) as CamelCaseEntitlement;
        const label = startCase(baseEntitlement);

        return {
          id: idModel[`${camelCaseEntitlement}Tab`],
          label: (
            <>
              {label}
              {getOrganizationDetailsMode(claims.permissions, organizationId) === OrganizationDetailsMode.Edit && (
                <Button
                  className={EntitlementsClassName.DeleteButton}
                  id={idModel[`${camelCaseEntitlement}TabRemove`].id}
                  icon="q4i-trashbin-4pt"
                  theme={ButtonTheme.None}
                  onClick={() => handleRemoveEntitlementClick(entitlement)}
                />
              )}
            </>
          ),
          value: entitlement,
        };
      }),
    [entitlements, idModel, claims.permissions, organizationId, handleRemoveEntitlementClick],
  );

  const entitlementLayers = useMemo<SwapableProps["layers"]>(() => {
    const entitlementElements: { element: ReactNode; associatedEntitlement: Entitlement }[] = [
      {
        element: (
          <AdminStudioSitesTable
            id={idModel.sitesTable.id}
            onError={getSitesByOrg}
            sitesByOrgResp={sitesByOrgResp}
            orgSubdomain={orgSubdomain}
            onOrgSubdomainChange={onOrgSubdomainChange}
          />
        ),
        associatedEntitlement: EntitlementConstant.Studio,
      },
      {
        element: (
          <EngagementAnalyticsTierSelectorComponent
            id={idModel.engagementAnalyticsTierSelector.id}
            entitlements={entitlements}
            onTierSelect={handleEngagementAnalyticsTierSelection}
          />
        ),
        associatedEntitlement: EntitlementConstant.EngagementAnalytics,
      },
    ];

    return entitlements?.map((currentEntitlement) => {
      const baseEntitlement = isEngagementAnalyticsEntitlement(currentEntitlement)
        ? EntitlementConstant.EngagementAnalytics
        : currentEntitlement;

      return entitlementElements.find(
        (currentEntitlementElement) => currentEntitlementElement.associatedEntitlement === baseEntitlement,
      )?.element;
    });
  }, [
    entitlements,
    idModel.sitesTable.id,
    idModel.engagementAnalyticsTierSelector.id,
    getSitesByOrg,
    sitesByOrgResp,
    orgSubdomain,
    onOrgSubdomainChange,
    handleEngagementAnalyticsTierSelection,
  ]);

  function handleEntitlementTabChange(_index: number, value: string) {
    setSelectedEntitlement(tabs.findIndex((t) => t.value === value));
  }

  const entitlementOptions = useMemo(() => {
    let baseEntitlementKeys = BaseEntitlementKeys;

    if (!flags?.[FeatureFlag.MeetingScheduler]) {
      baseEntitlementKeys = baseEntitlementKeys.filter(
        (currentBaseEntitlement) => currentBaseEntitlement !== "MeetingScheduler",
      );
    }

    return baseEntitlementKeys.map((currentEntitlementKey) => {
      const defaultTierSelection = getDefaultEntitlementSelection(EntitlementConstant[currentEntitlementKey]);

      return {
        id: idModel[`menuAdd${currentEntitlementKey}`].id,
        label: EntitlementLabel[currentEntitlementKey],
        onClick: () => handleMenuClick(defaultTierSelection),
      };
    });
  }, [flags, idModel, handleMenuClick]);

  return (
    <div className={EntitlementsClassName.Base} id={idModel.id}>
      <Toolbar className={EntitlementsClassName.Toolbar}>
        <Tabs
          className={EntitlementsClassName.Tabs}
          items={tabs}
          selected={selectedEntitlement}
          onChange={handleEntitlementTabChange}
        />
        {getOrganizationDetailsMode(claims.permissions, organizationId) !== OrganizationDetailsMode.component && (
          <Button
            id={idModel.menuButton.id}
            label="Add Entitlement"
            icon="q4i-add-4pt"
            theme={ButtonTheme.Steel}
            onClick={handleMenuShow}
          />
        )}
        <PopoverMenu
          anchorTargetElementId={idModel.menuButton.id}
          id={idModel.menu.id}
          size={PopoverMenuSize.Small}
          theme={PopoverMenuTheme.White}
          visible={menuVisible}
          options={entitlementOptions}
          onCloseRequest={handleMenuHide}
        />
      </Toolbar>

      <Swapable selected={selectedEntitlement} layers={entitlementLayers} />

      <Message
        id={idModel.removeMessage.id}
        title="Remove Entitlement"
        message="Are you sure you want to remove this entitlement?"
        visible={messageVisible}
        targetElementId={idModel.id}
        primaryActionProps={{
          id: idModel.removeMessageConfirm.id,
          label: "Confirm",
          onClick: () => handleRemoveEntitlement(entitlementToRemove.current),
        }}
        secondaryActionProps={{ id: idModel.removeMessageCancel.id, label: "Cancel", onClick: handleMessageHide }}
        onCloseRequest={handleMessageHide}
      />
    </div>
  );
};

export const Entitlements = memo(EntitlementsBase);
