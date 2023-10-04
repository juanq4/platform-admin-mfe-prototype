import { TextPreset } from "@q4/nimbus-ui";
import { Entitlement } from "@q4/platform-definitions";
import { memo } from "react";
import { isEngagementAnalyticsEntitlement } from "../../../../utils";
import type { EngagementAnalyticsTierSelectorProps } from "./EngagementAnalyticsTierSelector.definition";
import {
  EngagementAnalyticsTierFriendlyNames,
  EngagementAnalyticsTierSelectorIdModel,
  StringConstants,
} from "./EngagementAnalyticsTierSelector.definition";
import { Container, Selection, Title } from "./EngagementAnalyticsTierSelector.style";

const EngagementAnalyticsTierSelector = (props: EngagementAnalyticsTierSelectorProps): JSX.Element => {
  const { id, entitlements, onTierSelect } = props;

  const idModel = new EngagementAnalyticsTierSelectorIdModel(id);

  const currentEngagementAnalyticsTier = entitlements?.find((currentEntitlement) =>
    isEngagementAnalyticsEntitlement(currentEntitlement),
  );

  function handleTierChange(_checked: boolean, value: string): void {
    onTierSelect?.(value);
  }

  return (
    <Container>
      <Title id={idModel.title.id} preset={TextPreset.Title}>
        {StringConstants.title}
      </Title>
      <Selection
        id={idModel.legacyRadioButton.id}
        name={EngagementAnalyticsTierFriendlyNames.Legacy}
        label={EngagementAnalyticsTierFriendlyNames.Legacy}
        value={Entitlement.EngagementAnalytics}
        checked={currentEngagementAnalyticsTier === Entitlement.EngagementAnalytics}
        disabled
        onChange={handleTierChange}
      />
      <Selection
        id={idModel.starterRadioButton.id}
        name={EngagementAnalyticsTierFriendlyNames.Starter}
        label={EngagementAnalyticsTierFriendlyNames.Starter}
        value={Entitlement.EngagementAnalyticsStarter}
        checked={currentEngagementAnalyticsTier === Entitlement.EngagementAnalyticsStarter}
        onChange={handleTierChange}
      />
      <Selection
        id={idModel.baseRadioButton.id}
        name={EngagementAnalyticsTierFriendlyNames.Base}
        label={EngagementAnalyticsTierFriendlyNames.Base}
        value={Entitlement.EngagementAnalyticsBase}
        checked={currentEngagementAnalyticsTier === Entitlement.EngagementAnalyticsBase}
        onChange={handleTierChange}
      />
    </Container>
  );
};

export const EngagementAnalyticsTierSelectorComponent = memo(EngagementAnalyticsTierSelector);
