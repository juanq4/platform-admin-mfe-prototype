import { Text, TextPreset, TextTheme, TextSize, TextWeight } from "@q4/nimbus-ui";
import { useUser } from "../../../contexts";
import { getOrganizationLabelWithTicker } from "../../../utils";
import type { OrganizationSwitcherProps } from "./OrganizationSwitcher.definition";
import {
  OrganizationContainer,
  OrganizationLabelWithTicker,
  OrganizationSwitcherButton,
} from "./OrganizationSwitcher.style";

export const OrganizationSwitcher = ({ onClick }: OrganizationSwitcherProps): JSX.Element => {
  const { organization } = useUser();
  const organizationLabelWithTicker = getOrganizationLabelWithTicker(organization);

  return (
    <OrganizationContainer>
      <Text preset={TextPreset.Normal} theme={TextTheme.Neutral} size={TextSize.MD} weight={TextWeight.Semibold}>
        Organization
      </Text>
      <OrganizationSwitcherButton onClick={onClick}>
        <OrganizationLabelWithTicker>{organizationLabelWithTicker}</OrganizationLabelWithTicker>
      </OrganizationSwitcherButton>
    </OrganizationContainer>
  );
};
