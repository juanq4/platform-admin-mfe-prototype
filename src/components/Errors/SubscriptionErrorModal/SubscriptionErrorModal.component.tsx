import { useAuth0 } from "@auth0/auth0-react";
import { Anchor, AnchorTheme, ButtonTheme, Modal, Text } from "@q4/nimbus-ui";
import { Email } from "../../../configurations";
import { logoutAndUpdateLocalStorage } from "../../../utils";
import { subscriptionErrorTitle } from "./SubscriptionErrorModal.definition";

export const SubscriptionErrorModal = (): JSX.Element => {
  const { logout } = useAuth0();

  return (
    <Modal
      visible
      title={subscriptionErrorTitle}
      footerActions={[
        {
          label: "Log out",
          theme: ButtonTheme.Primary,
          onClick: () => logoutAndUpdateLocalStorage(logout),
        },
      ]}
      includeExit={false}
      includeCancel={false}
    >
      <Text>
        If this is in error, please contact{" "}
        <Anchor theme={AnchorTheme.Primary} url={`mailto:${Email.Support}`}>
          {Email.Support}
        </Anchor>
        .
      </Text>
      <br />
      <Text>
        If you would like to reactivate your Subscription, please contact{" "}
        <Anchor theme={AnchorTheme.Primary} url={`mailto:${Email.Sales}`}>
          {Email.Sales}
        </Anchor>
        .
      </Text>
    </Modal>
  );
};
