import type { ErrorModel } from "@q4/nimbus-ui";
import {
  ButtonIdModel,
  FieldIdModel,
  IdModelBase,
  isNullOrWhiteSpace,
  ModalIdModel,
  RadioButtonIdModel,
  SelectIdModel,
  SelectTheme,
  TextboxIdModel,
  TextboxTheme,
} from "@q4/nimbus-ui";
import type { Key } from "react";
import { OrganizationFeatureManagementIdModel } from "../../../../components/Admin/FeatureManagement/FeatureManagement.definition";

export interface OrganizationsEditParam {
  id: string;
}

export const OrganizationsEditErrorTextboxTheme = TextboxTheme.Spice;
export const OrganizationsEditErrorSelectTheme = SelectTheme.Spice;

export enum OrganizationDetailsTitle {
  View = "Organization",
  Edit = "Edit Organization",
  Create = "Create Organization",
}

export enum OrganizationDetailsLabel {
  View = "Close",
  Edit = "Save Organization",
  Create = "Create Organization",
  Name = "Organization Name",
  StockTicker = "Stock Ticker",
  Status = "Status",
  Id = "Organization ID",
  Type = "Organization Type",
  Region = "Region",
  Currency = "Currency",
}

export enum OrganizationRegionLabel {
  NORTH_AMERICA = "North America",
  EUROPE = "Europe",
}

export enum OrganizationCurrencyLabel {
  CHF = "Swiss Franc (CHF)",
  DKK = "Danish Krone (DKK)",
  EUR = "Euro (EUR)",
  GBP = "British Pound Sterling (GBP)",
  NOK = "Norwegian Krone (NOK)",
  SEK = "Swedish Krona (SEK)",
  USD = "United States Dollar (USD)",
}

export enum OrganizationDetailsClassName {
  Base = "organizations-detail",
  Section = "organizations-detail_section",
  SectionWithPaddingModifier = "organizations-detail_section--padding",
  SectionAndSectionWithPaddingModifier = "organizations-detail_section organizations-detail_section--padding",
  Stock = "organizations-detail_stock",
  StockTicker = "organizations-detail_stock-ticker",
  StockExchange = "organizations-detail_stock-exchange",
  Status = "organizations-detail_status",
  Field = "organizations-detail_field",
  FieldCaption = "organizations-detail_field-caption",
  TextboxCopy = "organizations-detail_textbox-copy",
  Type = "organizations-detail_type",
  Region = "organizations-detail_region",
  Currency = "organizations-detail_currency",
}

export interface OrganizationDetailsError {
  name?: ErrorModel;
  stockTicker?: ErrorModel;
  type?: ErrorModel;
  region?: ErrorModel;
  currency?: ErrorModel;
}

export enum OrganizationDetailsMode {
  Create,
  Edit,
  View,
}

export type OrganizationDetailsModeData = {
  title: string;
  buttonLabel: string;
  saveErrMsg: string;
  saveSuccessMsg: string;
};

export const OrganizationDetailsModeData: { [key: string]: OrganizationDetailsModeData } = {
  [OrganizationDetailsMode.Create]: {
    title: OrganizationDetailsTitle.Create,
    buttonLabel: OrganizationDetailsLabel.Create,
    saveErrMsg: "Failed to create organization",
    saveSuccessMsg: "Success",
  },
  [OrganizationDetailsMode.Edit]: {
    title: OrganizationDetailsTitle.Edit,
    buttonLabel: OrganizationDetailsLabel.Edit,
    saveErrMsg: "fail",
    saveSuccessMsg: "success",
  },
  [OrganizationDetailsMode.View]: {
    title: OrganizationDetailsTitle.View,
    buttonLabel: OrganizationDetailsLabel.View,
    saveErrMsg: "",
    saveSuccessMsg: "",
  },
};

class OrganizationDetailsIdModel extends IdModelBase {
  modal: ModalIdModel;
  name: TextboxIdModel;
  nameField: FieldIdModel;
  typeField: FieldIdModel;
  ticker: TextboxIdModel;
  exchange: TextboxIdModel;
  symbol: SelectIdModel;
  stockField: FieldIdModel;
  organizationId: TextboxIdModel;
  save: ButtonIdModel;
  type: SelectIdModel;
  featureManagement: OrganizationFeatureManagementIdModel;
  regionField: FieldIdModel;
  currencyField: FieldIdModel;
  regionNorthAmericaRadioButton: RadioButtonIdModel;
  regionEuropeRadioButton: RadioButtonIdModel;
  currency: SelectIdModel;

  constructor(id: string, index?: Key, postfix?: string) {
    super(id, index, postfix);
    if (isNullOrWhiteSpace(this.id)) {
      this.name = new TextboxIdModel(null);
      this.nameField = new FieldIdModel(null);
      this.typeField = new FieldIdModel(null);
      this.ticker = new TextboxIdModel(null);
      this.exchange = new TextboxIdModel(null);
      this.symbol = new SelectIdModel(null);
      this.stockField = new FieldIdModel(null);
      this.save = new ButtonIdModel(null);
      this.type = new SelectIdModel(null);
      this.featureManagement = new OrganizationFeatureManagementIdModel(null);
      this.regionField = new FieldIdModel(null);
      this.currencyField = new FieldIdModel(null);
      this.regionNorthAmericaRadioButton = new RadioButtonIdModel(null);
      this.regionEuropeRadioButton = new RadioButtonIdModel(null);
      this.currency = new SelectIdModel(null);

      return;
    }

    this.modal = new ModalIdModel(`${this.id}Modal`);
    this.name = new TextboxIdModel(`${this.id}NameTextbox`);
    this.nameField = new FieldIdModel(`${this.id}NameField`);
    this.typeField = new FieldIdModel(`${this.id}TypeField`);
    this.ticker = new TextboxIdModel(`${this.id}TickerTextbox`);
    this.exchange = new TextboxIdModel(`${this.id}ExchangeTextbox`);
    this.symbol = new SelectIdModel(`${this.id}SymbolSelect`);
    this.stockField = new FieldIdModel(`${this.id}StockField`);
    this.organizationId = new TextboxIdModel(`${this.id}OrganizationIdTextbox`);
    this.save = new ButtonIdModel(`${this.id}SaveButton`);
    this.type = new SelectIdModel(`${this.id}TypeSelect`);
    this.featureManagement = new OrganizationFeatureManagementIdModel(`${this.id}OrganizationFeatureManagement`);
    this.regionField = new FieldIdModel(`${this.id}RegionField`);
    this.currencyField = new FieldIdModel(`${this.id}CurrencyField`);
    this.regionNorthAmericaRadioButton = new RadioButtonIdModel(`${this.id}RegionNorthAmericaRadioButton`);
    this.regionEuropeRadioButton = new RadioButtonIdModel(`${this.id}RegionEuropeRadioButton`);
    this.currency = new SelectIdModel(`${this.id}CurrencySelect`);
  }
}

export const OrganizationDetailsViewIdModel = new OrganizationDetailsIdModel("OrganizationsDetailsView");
