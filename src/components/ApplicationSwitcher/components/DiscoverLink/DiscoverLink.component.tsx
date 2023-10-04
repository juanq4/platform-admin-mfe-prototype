import { Text, TextPreset, TextShade, TextSize, TextTheme, TextWeight } from "@q4/nimbus-ui";
import type { MouseEvent } from "react";
import { memo, useCallback } from "react";
import EngagementsAnalytics from "../../../../assets/icons/engagement-analytics.svg";
import Website from "../../../../assets/icons/website-management.svg";
import Q4Desktop from "../../../../assets/icons/x-q4-desktop.svg";
import { Application, Applications } from "../../../../configurations/application.configuration";
import type { DiscoverLinkProps } from "./DiscoverLink.definition";
import { DescriptionContainer, Icon, Link, TitleContainer, TrialBadge } from "./DiscoverLink.style";

// @todo : Remove this logic once routes icons are updated
const IconSVGs = {
  [Application.Desktop]: Q4Desktop,
  [Application.EngagementAnalytics]: EngagementsAnalytics,
  [Application.Website]: Website,
};

export const Component = (props: DiscoverLinkProps): JSX.Element => {
  const { route, onClick } = props;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      window.open(route.websiteLink, "_blank");

      onClick();
    },
    [route, onClick],
  );

  const application = Applications[route.id as Application];

  return (
    <Link id={route.id} onClick={handleClick}>
      <Icon className="icon">
        <img src={IconSVGs[route.id as keyof typeof IconSVGs] || null} alt={application.name} />
      </Icon>
      <div>
        <TitleContainer>
          <Text preset={TextPreset.Normal} size={TextSize.LG} weight={TextWeight.Semibold}>
            {route.discoverLabel ?? application.name}
          </Text>
          {route?.activeCrossSelling && (
            <TrialBadge>
              <Text
                preset={TextPreset.Normal}
                weight={TextWeight.Semibold}
                theme={TextTheme.Primary}
                shade={TextShade.Shade500}
              >
                Try free
              </Text>
            </TrialBadge>
          )}
        </TitleContainer>
        <DescriptionContainer>
          <Text preset={TextPreset.Paragraph} theme={TextTheme.Neutral} shade={TextShade.Shade700}>
            {route.description}
          </Text>
        </DescriptionContainer>
      </div>
    </Link>
  );
};

export const DiscoverLink = memo(Component);
