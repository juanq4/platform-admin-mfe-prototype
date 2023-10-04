import { Text, TextPreset, TextSize, TextWeight } from "@q4/nimbus-ui";
import type { MouseEvent } from "react";
import { memo, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Admin from "../../assets/icons/admin.svg";
import EarningsManagement from "../../assets/icons/earnings-management.svg";
import EngagementsAnalytics from "../../assets/icons/engagement-analytics.svg";
import EventManagement from "../../assets/icons/event-management.svg";
import Insight from "../../assets/icons/insight.svg";
import MeetingScheduler from "../../assets/icons/meeting-scheduler.svg";
import HomeDefault from "../../assets/icons/q4-home-default.svg";
import Website from "../../assets/icons/website-management.svg";
import CRM from "../../assets/icons/x-crm.svg";
import Q4Desktop from "../../assets/icons/x-q4-desktop.svg";
import { Application, Applications } from "../../configurations/application.configuration";
import { TrackEvents } from "../../contexts/analytics/analytics.definition";
import { useAnalytics } from "../../contexts/analytics/useAnalytics.hook";
import type { ApplicationLinkProps } from "./ApplicationLink.definition";
import { Icon, Link } from "./ApplicationLink.style";

// @todo : Remove this logic once routes icons are updated
const IconSVGs = {
  [Application.Admin]: Admin,
  [Application.CRM]: CRM,
  [Application.Desktop]: Q4Desktop,
  [Application.Earnings]: EarningsManagement,
  [Application.EngagementAnalytics]: EngagementsAnalytics,
  [Application.EventManagement]: EventManagement,
  [Application.Home]: HomeDefault,
  [Application.Insight]: Insight,
  [Application.MeetingScheduler]: MeetingScheduler,
  [Application.Website]: Website,
};

export const Component = (props: ApplicationLinkProps): JSX.Element => {
  const { route, icon, onClick } = props;

  const location = useLocation();
  const history = useHistory();

  const analytics = useAnalytics();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      analytics?.trackEvent?.(TrackEvents.AppSwitcherRouteClick, { route: route.path });

      if (location.pathname.includes(route.path)) {
        history.push(route.path);
      } else {
        window.open(route.path, route.target).focus();
      }

      onClick();
    },
    [location.pathname, route, onClick, history, analytics],
  );

  const applicationId = route.id as Application;
  const application = Applications[applicationId];

  return (
    <Link id={route.id} to={route.path} onClick={handleClick}>
      {icon ? (
        icon
      ) : (
        <Icon>
          <img src={IconSVGs[applicationId] || null} alt={application.name} />
        </Icon>
      )}
      <Text preset={TextPreset.Normal} size={TextSize.LG} weight={TextWeight.Semibold}>
        {application.name}
      </Text>
    </Link>
  );
};

export const ApplicationLink = memo(Component);
