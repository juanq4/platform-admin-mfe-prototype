import type { ApplicationTierBadgeProps } from "./ApplicationTierBadge.definition";
import { TierName } from "./ApplicationTierBadge.style";

export const ApplicationTierBadge = (props: ApplicationTierBadgeProps): JSX.Element => {
  const { name } = props;
  return <TierName>{name}</TierName>;
};
