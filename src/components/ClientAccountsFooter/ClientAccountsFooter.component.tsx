import { AnchorTarget, TextPreset, TextSize } from "@q4/nimbus-ui";
import { memo } from "react";
import { Email } from "../../configurations";
import { ClientAccountsFooterLanguage } from "./ClientAccountsFooter.definition";
import type { ClientAccountsFooterProps } from "./ClientAccountsFooter.definition";
import { AnchorNoUnderline, MessageText } from "./ClientAccountsFooter.style";

export const ClientAccountFooterBase = (props: ClientAccountsFooterProps): JSX.Element => {
  const { id } = props;

  return (
    <MessageText id={id} preset={TextPreset.Normal} size={TextSize.MD}>
      {ClientAccountsFooterLanguage.MessageOne}
      <AnchorNoUnderline
        target={AnchorTarget.Blank}
        url={`mailto:${Email.Agency}?subject=${ClientAccountsFooterLanguage.AgencySubject}&body=${ClientAccountsFooterLanguage.Body}`}
      >
        {Email.Agency}
      </AnchorNoUnderline>
      {ClientAccountsFooterLanguage.MessageTwo}
      <AnchorNoUnderline
        target={AnchorTarget.Blank}
        url={`mailto:${Email.Support}?subject=${ClientAccountsFooterLanguage.SupportSubject}&body=${ClientAccountsFooterLanguage.Body}`}
      >
        {Email.Support}
      </AnchorNoUnderline>
    </MessageText>
  );
};

export const ClientAccountsFooter = memo(ClientAccountFooterBase);
