import { Button, ButtonTheme, Text, TextWeight, useVisibility } from "@q4/nimbus-ui";
import { useUser } from "../../../contexts";
import { AccountSwitcherConfirmationModal } from "../../../trunk/TopNavigation/components/AccountSwitcherConfirmationModal.component";
import { getOrganizationLabelWithTicker } from "../../../utils";
import { OrganizationSwitcherContainer } from "./OrganizationSwitcher.style";

export const OrganizationSwitcher = (): JSX.Element => {
  const [isConfirming, startConfirming, stopConfirming] = useVisibility();
  const { organization } = useUser();
  const organizationLabelWithTicker = getOrganizationLabelWithTicker(organization);

  return (
    <>
      <OrganizationSwitcherContainer>
        <Button theme={ButtonTheme.Primary} onClick={startConfirming}>
          <Text weight={TextWeight.Bold}>{organizationLabelWithTicker}</Text>
        </Button>
      </OrganizationSwitcherContainer>
      <AccountSwitcherConfirmationModal
        visible={isConfirming}
        organizationName={organizationLabelWithTicker}
        onCloseRequest={stopConfirming}
      />
    </>
  );
};
