import type { BaseComponentProps } from "@q4/nimbus-ui";
import { RadioButtonIdModel, IdModelBase, isNullOrWhiteSpace, TextIdModel } from "@q4/nimbus-ui";
import type { Entitlement } from "@q4/platform-definitions";
import type React from "react";

export enum EngagementAnalyticsTierFriendlyNames {
  Legacy = "Legacy",
  Base = "Base",
  Starter = "Starter",
}

export const StringConstants = {
  title: "Select Entitlement Tier:",
};

export interface EngagementAnalyticsTierSelectorProps extends BaseComponentProps {
  entitlements: Entitlement[] | string[];
  onTierSelect: (entitlement: Entitlement | string) => void;
}

export class EngagementAnalyticsTierSelectorIdModel extends IdModelBase {
  title: TextIdModel;
  legacyRadioButton: RadioButtonIdModel;
  starterRadioButton: RadioButtonIdModel;
  baseRadioButton: RadioButtonIdModel;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.title = new TextIdModel(null);
      this.legacyRadioButton = new RadioButtonIdModel(null);
      this.starterRadioButton = new RadioButtonIdModel(null);
      this.baseRadioButton = new RadioButtonIdModel(null);

      return;
    }

    this.title = new TextIdModel(`${this.id}Title`);
    this.legacyRadioButton = new RadioButtonIdModel(`${this.id}LegacyRadioButton`);
    this.starterRadioButton = new RadioButtonIdModel(`${this.id}StarterRadioButton`);
    this.baseRadioButton = new RadioButtonIdModel(`${this.id}BaseRadioButton`);
  }
}
