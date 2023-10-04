import { AnchorIdModel, isNullOrWhiteSpace, TextIdModel } from "@q4/nimbus-ui";

export enum ClientAccountsFooterLanguage {
  MessageOne = "To add a new client account, contact ",
  MessageTwo = ". For all other support, contact ",
  AgencySubject = "Q4 Platform - Add new client account",
  SupportSubject = "Q4 Platform - Client accounts support",
  Body = "Please describe the issue and our team will get back to you as soon as possible!",
}

export type ClientAccountsFooterProps = {
  id?: string;
};

export class ClientAccountsFooterIdModel extends TextIdModel {
  agencyEmail: AnchorIdModel;
  supportEmail: AnchorIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(id)) {
      this.agencyEmail = new AnchorIdModel(null);
      this.supportEmail = new AnchorIdModel(null);

      return;
    }

    this.agencyEmail = new AnchorIdModel(`${id}EmailAgency`);
    this.supportEmail = new AnchorIdModel(`${id}EmailSupport`);
  }
}
