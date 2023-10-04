import { Text, TextPreset, TextTheme, TextSize } from "@q4/nimbus-ui";
import { memo } from "react";
import { useHistory } from "react-router-dom";
import { ApplicationName } from "../../configurations/application.configuration";
import { useTrialRemainingDays } from "../../hooks/useTrialRemainingDays/useTrialRemainingDays.hook";
import { ApplicationTierBadge } from "../ApplicationTierBadge/ApplicationTierBadge.component";
import type { ApplicationSummaryProps } from "./ApplicationSummary.definition";
import { RemainingDaysMessageClass, TrialExpirationBreakpoint } from "./ApplicationSummary.definition";
import {
  RemainingDaysContainer,
  RemainingDaysMessage,
  RemainingDaysLink,
  Container,
  ApplicationTitleContainer,
  ApplicationTitle,
} from "./ApplicationSummary.style";

const Component = (props: ApplicationSummaryProps): JSX.Element => {
  const { name, tier } = props;

  const history = useHistory();
  const remainingDays = useTrialRemainingDays();

  const remainingDaysMessageClass =
    remainingDays > TrialExpirationBreakpoint ? RemainingDaysMessageClass.Clock : RemainingDaysMessageClass.Warning;
  const remainingDaysMessage =
    remainingDays > 0 ? `${remainingDays} day${remainingDays === 1 ? "" : "s"} left in your trial` : "Your trial ends today";
  const applicationKey = Object.keys(ApplicationName).find(
    (key) => ApplicationName[key as keyof typeof ApplicationName] === name,
  );
  const handleClick = () => history.push(`/purchase-intent?trialType=${applicationKey}`);

  return (
    <Container>
      <ApplicationTitleContainer>
        <ApplicationTitle>{name}</ApplicationTitle>
        {tier && <ApplicationTierBadge name={tier} />}
      </ApplicationTitleContainer>
      {!isNaN(remainingDays) && (
        <RemainingDaysContainer>
          <RemainingDaysMessage className={remainingDaysMessageClass}>{remainingDaysMessage}</RemainingDaysMessage>
          <RemainingDaysLink onClick={handleClick}>
            <Text preset={TextPreset.Normal} theme={TextTheme.White} size={TextSize.SM}>
              Upgrade
            </Text>
          </RemainingDaysLink>
        </RemainingDaysContainer>
      )}
    </Container>
  );
};

export const ApplicationSummary = memo(Component);
