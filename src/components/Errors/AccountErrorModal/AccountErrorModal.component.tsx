import { useAuth0 } from "@auth0/auth0-react";
import { Anchor, AnchorTheme, ButtonTheme, Modal, Text } from "@q4/nimbus-ui";
import { Email } from "../../../configurations";
import { logoutAndUpdateLocalStorage } from "../../../utils";
import { accountErrorTitle } from "./AccountErrorModal.definition";

export const AccountErrorModal = (): JSX.Element => {
  const { logout } = useAuth0();

  return (
    <Modal
      visible
      title={accountErrorTitle}
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
        Please contact{" "}
        <Anchor theme={AnchorTheme.Primary} url={`mailto:${Email.Support}`}>
          {Email.Support}
        </Anchor>{" "}
        for assistance.
      </Text>
    </Modal>
  );
};
